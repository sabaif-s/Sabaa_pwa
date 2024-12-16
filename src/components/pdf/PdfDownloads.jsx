import React,{useEffect,useState} from 'react';
import AssetPdf from './AssetPdf';
import { openDB } from 'idb';
import PDFViewer from './PdfReader';
import { use } from 'react';
const  PdfDownloads = () => {
    const [firstLoaded,setFirstLoaded]=useState(false);
    const [secondLoaded,setSecondLoaded]=useState(false);
    const [fadeInContent,setFadeInContent]=useState(false);
    const [downloadPdf,setDownloadPdf]=useState(0);
    const [percentArrayObject,setPercentArrayObject]=useState([]);
    const [continueDownload,setContinueDownload]=useState(0);
    const [finishedPdf,setFinishedPdf]=useState([]);
    const [readyRender,setReadyRender]=useState(false);
    const [showPdfViewer,setShowPdfViewer]=useState(false);
    const [fileBlob,setFileBlob]=useState(null);
    const {assetPdf}=AssetPdf();
    const pdfArray=Array.from({length:12},(_,i)=> i);

    useEffect(()=>{
           if(firstLoaded && secondLoaded){
            setTimeout(()=>{
                       setFadeInContent(true);
            },1500);
           }
    },[firstLoaded,secondLoaded]);
    useEffect(()=>{
        console.log("asset pdf:",assetPdf);
        if(assetPdf.length > 0){
            console.log('asset pdf');

        }
    },[assetPdf]);
    useEffect(()=>{
     const getDownloads=localStorage.getItem('downloadingPdf');
     if(getDownloads == null){
      setReadyRender(true);
     }
     else{
      const parse=JSON.parse(getDownloads);
      const filterFinished=parse.filter((item)=> item.finished);
      const findFinishedUnique=filterFinished.map((item)=>{
        return item.uniqueID;
      });
      setFinishedPdf(findFinishedUnique);
      setReadyRender(true);
     }
    },[]);
    useEffect(()=>{
console.log(finishedPdf);
    },[finishedPdf])
    useEffect(()=>{
        async function initDB() {
            return openDB("pdfChunk", 1, {
              upgrade(db) {
                if (!db.objectStoreNames.contains("pdf-chunk")) {
                 const store=db.createObjectStore("pdf-chunk",{ keyPath: 'id'});
                  store.createIndex('attributeIndex', 'identifier');
                }
              },
            });
          }
          async function initDBFull() {
            return openDB("fullPdf", 1, {
              upgrade(db) {
                if (!db.objectStoreNames.contains("pdf-full")) {
                  db.createObjectStore("pdf-full",{ keyPath: 'id'});
                }
              },
            });
          }
          const saveToFullDataBase = async (uniqueID) => {
            try {
              console.log("unique:", uniqueID);
          
              // Initialize databases
              const [dbChunk, dbFull] = await Promise.all([initDB(), initDBFull()]);
          
              // Start a read-only transaction on the 'pdf-chunk' object store
              const tx = dbChunk.transaction('pdf-chunk', 'readonly');
              const store = tx.objectStore('pdf-chunk');
              const index = store.index('attributeIndex');
          
              // Fetch all records matching the uniqueID
              const records = await index.getAll(uniqueID);
              await tx.done; // Ensure the transaction is completed
          
              if (!records || records.length === 0) {
                console.warn(`No records found for uniqueID: ${uniqueID}`);
                return;
              }
          
              // Combine all chunks into a single ArrayBuffer
              const arrayBuffers = records.map((item) => item.chunk);
              const combinedBuffer = arrayBuffers.length === 1
                ? arrayBuffers[0]
                : arrayBuffers.reduce((acc, buffer) => new Uint8Array([...acc, ...buffer]));
          
              console.log("Combined Buffer:", combinedBuffer);
          
              // Create a Blob from the combined buffer
              const pdfBlob = new Blob([combinedBuffer], { type: "application/pdf" });
          
              console.log("Generated PDF Blob:", pdfBlob);
          
              // Save the Blob into the 'pdf-full' object store
              const fullTx = dbFull.transaction('pdf-full', 'readwrite');
              const fullStore = fullTx.objectStore('pdf-full');
              await fullStore.put({ id: uniqueID, pdfBlob });
              await fullTx.done;
          
              console.log("Saved to pdf-full database successfully.");
          
              // Delete the chunks from 'pdf-chunk' after successful save
              const deleteTx = dbChunk.transaction('pdf-chunk', 'readwrite');
              const chunkStore = deleteTx.objectStore('pdf-chunk');
              for (const record of records) {
                await chunkStore.delete(record.id); // Assuming 'id' is the primary key
              }
              await deleteTx.done;
          
              console.log(`Deleted chunks for uniqueID: ${uniqueID} from pdf-chunk.`);
          
              return {pdfBlob,uniqueID}; // Return the blob for further use if needed
            } catch (error) {
              console.error("Error in saveToFullDataBase:", error);
            }
          };
          
          
        const findTotalSize=async (item)=>{
            const response=await fetch(item.src, {method:"HEAD"});
            const contentLength=response.headers.get("Content-Length");
            if(!contentLength){
                throw new Error('Content-Length header is missing');
            }
            const totalSize = parseInt(contentLength, 10);
            return totalSize;
        }
        const updateLocalStorage=async (uniqueID,data)=>{
           const parsedLocal=JSON.parse(localStorage.getItem("downloadingPdf"));
           const updatedData=parsedLocal.map((item)=>{
            if(item.uniqueID == uniqueID ){
                   return {
                    uniqueID:uniqueID,
                    src:data.src,
                    totalSize:data.totalSize,
                    chunkStart:data.newChunkStart,
                    percentage:data.percentage,
                    topic:data.topic,
                    finished:data.finished
                   }
            }
            else{
                return item
            }
           })
           localStorage.setItem("downloadingPdf",JSON.stringify(updatedData));
           const foundInPrev=percentArrayObject.find((item)=>item.uniqueID == uniqueID);
           if(foundInPrev){
            const changeOnlyThis=percentArrayObject.filter((item)=> item.uniqueID != uniqueID);
            setPercentArrayObject([...changeOnlyThis,{uniqueID:uniqueID,percent:data.percentage}]);
           }
           else {
            setPercentArrayObject((prev)=> [...prev,{uniqueID:uniqueID,percent:data.percentage}]);
           }
           return updatedData;
        }
        const downloadedItems = async (item)=>{
            const chunkSize=1024 * 1024;
            let totalSize=0;
            let chunkStart=0;
            let finished=false;
            if(item.totalSize == 0){
                console.log("find total size:");
                const totalSizeFound=await findTotalSize(item);
                console.log("total size:",totalSizeFound);
                totalSize=totalSizeFound;
                
            }
            else{
             totalSize=item.totalSize;
             chunkStart=item.chunkStart
            }
             if(chunkStart < totalSize){
                console.log("item chunk start is less than total");
                const response = await fetch(item.src, {
                    headers: { Range: `bytes=${chunkStart}-${chunkStart + chunkSize - 1}` },
                  });
                  if (!response.ok) {
                    console.error('Failed to fetch video chunk');
                    return;
                  }
      
                  const chunk = await response.arrayBuffer();
                  const src=item.src
                  const topic=item.topic
                  const newChunkStart=chunkStart + chunkSize;
                  const idNEW=chunkStart+item.uniqueID
                  let percentages = Math.round((newChunkStart / totalSize) * 100);
                  let percentage=percentages > 100 ? 100:percentages;
                  const savedChunk=new Uint8Array(chunk);
                  const db=await initDB();
                 const saved= await db.put("pdf-chunk",{chunk:savedChunk,id:idNEW,chunkStart:chunkStart,identifier:item.uniqueID});
                //   console.log(`Stored chunk: ${savedChunk}`);
                console.log(saved);
                const updateLocal=await updateLocalStorage(item.uniqueID,{percentage,newChunkStart,totalSize,src,topic,finished});
                console.log(updateLocal);
                return {finished:false}
                  
                  
             }
             else{
              finished=true;
              const src=item.src
              const topic=item.topic
              const newChunkStart=chunkStart + chunkSize;
               
              let percentages = Math.round((newChunkStart / totalSize) * 100);
              let percentage=percentages > 100 ? 100:percentages;
              const updateLocal=await updateLocalStorage(item.uniqueID,{percentage,newChunkStart,totalSize,src,topic,finished});
              console.log("updated local finished:",updateLocal);
              const saveToFull=await saveToFullDataBase(item.uniqueID);
              console.log(saveToFull);
              setFinishedPdf((prev)=> [...prev,saveToFull.uniqueID]);
              return {
                finished:true,
                uniqueID:item.uniqueID
              }
                console.log(`${item.uniqueID} finished`);
             }
        }
        const downloadPdfFunction = async (pdfArray)=>{
              const downloadedChunk=await Promise.all(
                pdfArray.map(async (item)=>{
                    const downloadedItem= await downloadedItems(item);
                     console.log(downloadedItem);
                     return downloadedItem;
                })
              )
              return downloadedChunk;
        }
        const downloadingPdf= async ()=>{
            try{
             const previousDownload=localStorage.getItem("downloadingPdf");
             if(previousDownload != null){
                const parsed=JSON.parse(previousDownload);
                const unfinished=parsed.filter((item)=> !item.finished);
                const downloadPdf=await downloadPdfFunction(unfinished);
                console.log("download pdf:",downloadPdf);
                const finishedUnique=downloadPdf.filter((item)=> item.finished);
                console.log("finished unique:",finishedUnique);
                if(unfinished.length == 0){
                  // setContinueDownload((prev)=> prev + 1);
                  
                }
                else {
                  
                  setContinueDownload((prev)=> prev + 1);
                }
                console.log(finishedUnique);
                

             }
             else{
                console.log("no downloading Pdf");
             }
            }
            catch(err){
                
            }
        }
          if(downloadPdf > 0){
            console.log("download starts")
            downloadingPdf();
          }
    },[downloadPdf,continueDownload]);
    const handleClickedDownload=(e)=>{
       console.log("clicked button:",e.currentTarget.getAttribute("id"));
       const index=e.currentTarget.getAttribute("id");
       console.log(typeof(index));
       const currentDownloadedPdf=assetPdf[index].uniqueID;
       const prevLocalDownload=localStorage.getItem("downloadingPdf");
       console.log(prevLocalDownload);
       let savedData=[];
       const objectNew={
        uniqueID:assetPdf[index].uniqueID,
        src:assetPdf[index].src,
        percent:0,
        topic:assetPdf[index].topic,
        chunkStart:0,
        totalSize:0,
        finished:false
    }
       if(prevLocalDownload != null){
           const parse=JSON.parse(prevLocalDownload);
           const foundPrev=parse.find((item)=> item.uniqueID == assetPdf[index].uniqueID);
           console.log("found prev:",foundPrev);
           if(foundPrev){
            localStorage.setItem("downloadingPdf",JSON.stringify(parse));
           }
           else{
            savedData=[objectNew,...parse];
            localStorage.setItem("downloadingPdf",JSON.stringify(savedData));
            setDownloadPdf((prev)=>prev + 1);
           }
       }
       else{
      
        savedData=[objectNew]
        localStorage.setItem("downloadingPdf",JSON.stringify(savedData));
        setDownloadPdf((prev)=>prev + 1);
       }
       
    }
    const percentFor=(uniqueID)=>{
      const found=percentArrayObject.find((item)=> item.uniqueID == uniqueID);
      if(found){
        return found.percent;
      }
      else{
        return 0;
      }
    }
    const getPdfBlob= async (uniqueID)=>{
      try {
        // Initialize and open the IndexedDB database
        const db = await openDB("fullPdf", 1, {
          upgrade(db) {
            // Create object store if it doesn't exist
            if (!db.objectStoreNames.contains("pdf-full")) {
              db.createObjectStore("pdf-full", { keyPath: "id" });
            }
          },
        });
    
        // Fetch the record with the given uniqueID
        const transaction = db.transaction("pdf-full", "readonly");
        const store = transaction.objectStore("pdf-full");
        const record = await store.get(uniqueID);
    
        // Return the blob if found, otherwise return null
        if (record && record.pdfBlob) {
          return record.pdfBlob;
        } else {
          console.warn(`Record with ID ${uniqueID} not found.`);
          return null;
        }
      } catch (err) {
        console.error("Error fetching PDF blob:", err);
        throw err;
      }
    }
    const handleOpenPdf=async (e)=>{
      console.log("handle open pdf");
      const index=e.currentTarget.getAttribute("id");
      const uniqueID=assetPdf[index].uniqueID;
      const fileBlob=await getPdfBlob(uniqueID);
      setFileBlob(fileBlob);
      setShowPdfViewer(true);
      console.log(fileBlob);
    }
    const handleBack=()=>{
      setShowPdfViewer(false);
    }
    return (
        <div className='w-full h-screen overflow-hidden' >
          {/* <div className='w-20 h-20 absolute z-50 right-2 top-2' >
               <img src="alarm.png" className='rounded-full w-full h-full animate-notificationPulse ' alt="" />
               <span className='absolute w-8 h-8 right-10 z-10 text-2xl bg-green-300 p-2 text-white animate-fadeIn rounded-full top-4 flex justify-center items-center' >1</span>
          </div>
          <div className='absolute z-50 inset-0 flex justify-center items-center' >
             <img src="alarmNotify.jpg" className='w-full h-64' alt="" />
          </div> */}
               <img
               onLoad={()=>{
                setFirstLoaded(true);
               }}
               src="pdfDownload.jpg" className={` ${firstLoaded ? "":"opacity-0"} w-full h-full absolute z-10`} alt="" />
               <img 
                 onLoad={()=>{
                    setSecondLoaded(true);
                   }}
               src="pdfDownloads.jpg" className={` ${secondLoaded && firstLoaded ? "animate-fadeIn":"opacity-0"} w-full h-full absolute z-20`} alt="" />
                   {
                    readyRender && (
                      <div className={` ${showPdfViewer ? "hidden":""} ${fadeInContent ? "animate-fadeIn":"opacity-0"} w-full h-full p-4 relative z-30`} >
                      <div className='w-full h-full overflow-y-auto bg-black bg-opacity-50 flex flex-col justify-start items-center pt-6' >
                                <div className='w-full bg-gradient-to-r from-gray-300 to-gray-500 flex flex-wrap justify-between items-center' >
                                    {
                                       assetPdf.length >0 && assetPdf.map((item,index)=>(
                                            <div
                                            id={index}
                                            className='basis-1/2 p-4 flex flex-col gap-y-2 justify-center items-center' >
                                            <div className='w-20 h-20' >
                                               <img src={index % 2 == 0 ? "pdfIconsTwo.png":"pdfIconOne.png"} className='w-full h-full' alt="" />
                                            </div>
                                            <div className='w-full flex justify-center items-center' >
                                                 <span className='text-blue-600 text-2xl font-bold' >{item.topic}</span>
                                            </div>
                                            <button
                                            id={index}
                                            onClick={ finishedPdf.includes(item.uniqueID) ? handleOpenPdf:handleClickedDownload}
                                            className='p-2 bg-gradient-to-t from-blue-600 to-blue-300 relative' >
                                               <span className={` ${finishedPdf.includes(item.uniqueID) ? "animate-fadeIn":""} text-white text-2xl relative z-20`}> {finishedPdf.includes(item.uniqueID) ? "Open":"Download"}</span>
                                               <span style={{width:percentFor(item.uniqueID) +"%"}} className='absolute top-0 left-0 h-full bg-opacity-75 bg-green-400' ></span>
                                            </button>
                                          </div>
                                        ))
                                    }
                                   
                                   
                                   
                                </div>
                      </div>
               </div>
                
                    )
                   }
                   {
                    showPdfViewer && (
                      <PDFViewer pdfBlob={fileBlob} handlingBack={handleBack} />
                    )
                   }
            
        </div>
    );
};

export default  PdfDownloads;