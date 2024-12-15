import React,{useEffect,useState} from 'react';
import AssetPdf from './AssetPdf';
import { openDB } from 'idb';
const  PdfDownloads = () => {
    const [firstLoaded,setFirstLoaded]=useState(false);
    const [secondLoaded,setSecondLoaded]=useState(false);
    const [fadeInContent,setFadeInContent]=useState(false);
    const [downloadPdf,setDownloadPdf]=useState(0);
    const [percentArrayObject,setPercentArrayObject]=useState([]);
    const [continueDownload,setContinueDownload]=useState(0);
    const [finishedPdf,setFinishedPdf]=useState([]);
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
        async function initDB() {
            return openDB("pdfChunk", 1, {
              upgrade(db) {
                if (!db.objectStoreNames.contains("pdf-chunk")) {
                  db.createObjectStore("pdf-chunk",{ keyPath: 'id'});
                }
              },
            });
          }
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
                 const saved= await db.put("pdf-chunk",{chunk:savedChunk,id:idNEW,chunkStart:chunkStart});
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
    return (
        <div className='w-full h-screen overflow-hidden' >
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

               <div className={` ${fadeInContent ? "animate-fadeIn":"opacity-0"} w-full h-full p-4 relative z-30`} >
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
                                            onClick={handleClickedDownload}
                                            className='p-2 bg-gradient-to-t from-blue-600 to-blue-300 relative' >
                                               <span className='text-white text-2xl relative z-20'>Download</span>
                                               <span style={{width:percentFor(item.uniqueID) +"%"}} className='absolute top-0 left-0 h-full bg-opacity-75 bg-green-400' ></span>
                                            </button>
                                          </div>
                                        ))
                                    }
                                   
                                   
                                   
                                </div>
                      </div>
               </div>
        </div>
    );
};

export default  PdfDownloads;