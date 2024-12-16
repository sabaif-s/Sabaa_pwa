import React,{useEffect,useState} from 'react';
import { openDB } from 'idb';
 
import DownloadedVideo from './Downloaded';
import AssetVideos from './AssetVideos';
import { use } from 'react';
import AllVideosDownLoaded from './AllVideosDownLoaded';
const  VideoTutor = () => {
    const [activeButton,setActiveButton]=useState(0);
    const {videoAsset,filteredAsset,successSend}=AssetVideos();
    const [backColorGrade,setBackColorGrade]=useState("bg-gradient-to-r from-green-500 to-green-300");
    const [backColorYVideos,setBackColorYVideos]=useState("bg-gradient-to-r from-blue-500 to-blue-300");
    const [clickedList,setClickedList]=useState(9999);
    const [fetchedErrorVideoShow,setFetchedErrorVideoShow]=useState(false);
    const [fetchedErrorVideoShow2,setFetchedErrorVideoShow2]=useState(false);
    const [downloadPercentage, setDownloadPercentage] = useState(0);
    const [handleDownloadFirstVideo,setHandleDownloadFirstVideo]=useState(99999);
    const [pauseFirst,setPauseFirst]=useState(99999);
    const [downloadInProgressFirst,setDownloadInProgressFirst]=useState(false);
    const [startDownloadFirstVideo,setStartDownloadFirstVideo]=useState(false);
    const [fullyDownloadedFirst,setFullyDownloadedFirst]=useState("new");
    const [renderThisComponent,setRenderThisComponent]=useState(false);
    const [downLoadLink,setDownLoadLink]=useState("");
    const [downloadingVideo,setDownLoadingVideo]=useState("");
    const [downloadedList,setDownLoadedList]=useState([]);
    const [showRight,setShowRight]=useState(false);
    const [showDownload,setShowDownload]=useState(true);
    const [hidePause,setHidePause]=useState(true);
    const [hideDownload,setHideDownload]=useState(false);
    const [hideRight,setHideRight]=useState(true);
    const [showPause,setShowPause]=useState(false);
    const [currentVideo,setCurrentVideo]=useState(9999);
    const [clickedButton,setClickedButton]=useState("");
    const [downloadedLinks,setDownloadedLinks]=useState([]);
    const [showCurrentVideo,setShowCurrentVideo]=useState(9999);
    const [showAllVideosDownLoaded,setShowAllVideosDownLoaded]=useState(false);
    const [pausedVideos,setPausedVideos]=useState([]);
    const [pausingVideo,setPausingVideo]=useState(99999);
    const [resumeDownLoad,setResumeDownLoad]=useState(0);
    const [pausedCurrent,setPausedCurrent]=useState("");
    const [downloadingVideoData,setDownLoadingVideoData]=[{}];
    const [currentDownloadingVideoLists,setCurrentDownloadingVideoLists]=useState([]);
    const [downloadPercentageList,setDownloadPercentageList]=useState([]);
    const [currentUrlDownloadingLists,setCurrentUrlDownloadingLists]=useState([]);
    const [currentDownLoadingUniqueNames,setCurrentDownloadingUniqueName]=useState([]);
    const [resumeVideos,setResumeVideos]=useState([]);
    const [hideDownloadS,setHideDownloads]=useState([]);
    const [showPauses,setShowPauses]=useState([]);
    const [showRightsArray,setShowRightsArray]=useState([]);
    const [saveFullVideo,setSaveFullVideo]=useState(0);

   
     
    // useEffect(()=>{
    //   if(videoAsset.length > 0){
    //     console.log("asset videos:",videoAsset);
    //     setRenderThisComponent(true);
    //   }
    //   else {
    //     console.log("video Asset 0 no video");
    //   }
    // },[videoAsset]);
    useEffect(()=>{
          console.log("download percentage list :",downloadPercentageList);
    },[downloadPercentageList]);
   useEffect(()=>{
          if(saveFullVideo > 0){
            const toSaveVideos=localStorage.getItem('finishedVideo');
            if(toSaveVideos != null){
             const saveVideos=JSON.parse(toSaveVideos);
             console.log("time to save:", saveVideos);
             savingVideoToFull(saveVideos);
            }
            else{
              console.log('no finished video to save to full');
            }
          }
   },[saveFullVideo]);

   const savingVideoToFull= async (saveVideos)=>{
    try {
      async function initDBChunk() {
        return await openDB('video-db', 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains('videoChunks')) {
              db.createObjectStore('videoChunks', { keyPath: 'id', autoIncrement: true });
            }
          },
        });
      }
      async function initDB() {
        return await openDB('VideoDatabaseFull', 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains('videos')) {
              db.createObjectStore('videos', { keyPath: 'id'});
            }
          },
        });
      }
      const readChunksVideo = async (videos) => {
        try {
          const sendData = await Promise.all(
            videos.map(async (item) => {
              const dbChunk = await initDBChunk();
              const transaction = dbChunk.transaction('videoChunks', 'readonly');
              const store = transaction.store;
      
              const results = [];
              let cursor = await store.openCursor(); // Access the raw cursor
      
              while (cursor) {
                const record = cursor.value;
      
                // Check the attribute and add matching records
                if (record['identifier'] === item) {
                  results.push(record.chunk);
                }
      
                cursor = await cursor.continue(); // Move to the next record
              }
      
              // Ensure transaction is completed before moving to next
              await transaction.done;
      
              return {
                results: results,
                uniqueName: item,
              };
            })
          );
          return sendData;
        } catch (error) {
          console.error("Error reading video chunks:", error);
          throw error;  // Rethrow error if needed
        }
      };
      const saveToFullVideos=async (data)=>{
        try {
          const savedToFull = await Promise.all(
            data.map(async (item) => {
              const dbFull = await initDB();
              const transaction = dbFull.transaction('videos', 'readwrite');
              const store = transaction.store;
              const flattenedResults = item.results.flat();

              const newBlob=new Blob (flattenedResults, {type:"video/mp4"});
              const urlBlob=URL.createObjectURL(newBlob);
              const saveRecord={
                id:item.uniqueName,
                url:urlBlob,
                uniqueName:item.uniqueName,
                blobFILE:newBlob
              }
               
             
               await store.put(saveRecord);
               await transaction.done;
              return {
                 saved:item.uniqueName
                 
              };
            })
          );
          return savedToFull;
        } catch (error) {
          console.error("Error saving video to full:", error);
          throw error;  // Rethrow error if needed
        }
      }
      const deleteFromChunks = async (deleteVideos) => {
        try {
          const deletedVideo = await Promise.all(
            deleteVideos.map(async (item) => {
              const dbChunk = await initDBChunk();
              const transaction = dbChunk.transaction('videoChunks', 'readwrite');
              const store = transaction.store;
      
               
              let cursor = await store.openCursor(); // Access the raw cursor
      
              while (cursor) {
                const record = cursor.value;
      
                // Check the attribute and add matching records
                if (record['identifier'] === item.saved) {
                   await cursor.delete();
                }
      
                cursor = await cursor.continue(); // Move to the next record
              }
      
              // Ensure transaction is completed before moving to next
              await transaction.done;
      
              return {
                 deletedVideo:item.saved
              };
            })
          );
          return deletedVideo;
        } catch (error) {
          console.error("Error in deleting video chunks:", error);
          throw error;  // Rethrow error if needed
        }
      };
      
      const updateLocalFinished=async (updateData)=>{
        try{
           const previousFinishedLocal=localStorage.getItem('finishedVideo');
           if(previousFinishedLocal != null){
           const parsePrev=JSON.parse(previousFinishedLocal);
           const filteredFinished=parsePrev.filter((item)=> {
               const findInUpdate=updateData.find((itemTwo)=> itemTwo.deletedVideo != item);
                if(findInUpdate){
                  return true
                }
                else{
                  return false
                }
           })
           const previousDownLoaded=localStorage.getItem('downloadedVideo');
           if(previousDownLoaded != null){
            const parsed=JSON.parse(previousDownLoaded);
            const cumulative=[...parsed,updateData[0].deletedVideo];
            localStorage.setItem('downloadedVideo',JSON.stringify(cumulative));

           }
           else{
            localStorage.setItem('downloadedVideo',JSON.stringify([updateData[0].deletedVideo]))
           }
           localStorage.setItem('finishedVideo',JSON.stringify(filteredFinished));
         
           return filteredFinished;
           }
           else {
            console.log("no finished value to update");
            return "no finished value to update"
           }
        }
        catch (err){
          console.log("error in update local storage")
        }
      }
       const readChunks = await readChunksVideo(saveVideos);
       console.log("read chunks:",readChunks);
       const saveToFull=await saveToFullVideos(readChunks);
       console.log("save To Full",saveToFull);
       const deleteChunks=await deleteFromChunks(saveToFull);
       console.log("deleted video:",deleteChunks);
       const updateLocalStorageForFinishedVideo=await updateLocalFinished(deleteChunks);
       console.log("updated local for finished",updateLocalStorageForFinishedVideo);
    //     console.log("url blob: ",urlBlob);
    //   console.log('Matching records:', results);
      // const saveRecord={
      //   url:urlBlob,
      //   uniqueName:saveVideos[0],
      //   blobFILE:newBlob
      // }
     
      // return results;
       
    //  const deleteTransaction = dbChunk.transaction('videoChunks', 'readwrite');
    // const deleteStore = deleteTransaction.store;
    // let deleteCursor = await deleteStore.openCursor();

    // while (deleteCursor) {
    //   const record = deleteCursor.value;

    //   if (record["identifier"] === saveVideos[0]) {
    //     console.log(`Deleting record with ID ${record.id} matching identifier=${saveVideos[0]}`);
    //     await deleteCursor.delete(); // Delete the current record
    //   }

    //   deleteCursor = await deleteCursor.continue();
    // }

    // await deleteTransaction.done;
    // console.log("Chunks deleted successfully.");

    }
    catch (err){
          console.log(err);
    }
   }
    useEffect(()=>{
       
         if(successSend){
          if(filteredAsset.length > 0){
            console.log("UnDownloaded video:",filteredAsset);
            setRenderThisComponent(true);
           }
           else{
            console.log("all videos downloaded");
            setShowAllVideosDownLoaded(true);
           }
         }
    },[filteredAsset,successSend]);
    useEffect(()=>{
         if(pausingVideo != 99999){
          if(filteredAsset.length > 0){
            console.log("pausing video");
            const pausedVideo=filteredAsset[pausingVideo].uniqueName;
            const pausedURLS=filteredAsset[pausingVideo].src;
            setPausedCurrent(pausedVideo);
             const filteredUrls=currentUrlDownloadingLists.filter((item)=> item != pausedURLS);
             const filteredCurrentDownloadingUniqueName=currentDownLoadingUniqueNames.filter((item)=> item != pausedVideo);
            setPausedVideos((prev)=> [...prev,pausedVideo]);
            setCurrentUrlDownloadingLists(filteredUrls);
            setCurrentDownloadingUniqueName(filteredCurrentDownloadingUniqueName);
            setResumeVideos((prev)=> [...prev,pausedVideo]);
          }
                   
         }
    },[pausingVideo]);

    useEffect(()=>{
             if(resumeVideos.length > 0){
              console.log("resume videos if download clicked again:",resumeVideos);
             }
    },[resumeVideos]);
    useEffect(()=>{
      console.log('paused videos',pausedVideos);
     if(pausedVideos.length > 0){
       
     
        
        localStorage.setItem("pausedVideo",JSON.stringify(pausedVideos))
      
     }
 
    },[pausedVideos]);
    
    
    //       // Save Blob to the database
   

    useEffect(() => {
      const startDownLoading = async (downloadUrl, uniqueName, currentVideoIndex) => {
        async function initDBChunk() {
          return await openDB('video-db', 1, {
            upgrade(db) {
              if (!db.objectStoreNames.contains('videoChunks')) {
                db.createObjectStore('videoChunks', { keyPath: 'id', autoIncrement: true });
              }
            },
          });
        }
    
        let chunkStart = 0; // Default value
        let downloadedSize = 0; // Default value
        let finished = false;
    
        let chunkSize = 1024 * 1024;
        const dbChunks = await initDBChunk();
    
        const getHeadResponseList = async () => {
          const headResponseList = await Promise.all(
            currentUrlDownloadingLists.map(async (item, index) => {
              const response = await fetch(item, { method: 'HEAD' });
              const totalSizes = parseInt(response.headers.get('Content-Length'), 10);
    
              // Get the start point from localStorage
              let startPoint = localStorage.getItem('startDownloading');
              console.log('start point', startPoint);
              if (startPoint != null) {
                startPoint = JSON.parse(startPoint);
              }
              let chunkStart = 0;
              let uniqueVideoName = currentDownLoadingUniqueNames[index];
              let downloadUrls = currentUrlDownloadingLists[index];
              let downloadedSize = 0;
    
              if (startPoint != null) {
                const startPointItem = startPoint.find((items) => items.downloadUrl === item);
                if (startPointItem) {
                  console.log(startPointItem);
                  chunkStart = startPointItem.chunkStart;
                  uniqueVideoName = startPointItem.uniqueName;
                  downloadUrls = startPointItem.downloadUrl;
                  downloadedSize = startPointItem.downloadedSize;
                }
              }
    
              return { totalSizes, chunkStart, uniqueVideoName, downloadUrls, downloadedSize };
            })
          );
          return headResponseList; // Return if needed elsewhere
        };
    
        const saveChunkVideos = async (data) => {
          const savedData = await Promise.all(
            data.map(async (item) => {
              if (item.chunkStart < item.totalSizes) {
                console.log('item start chunk:', item.chunkStart);
                console.log('item total sizes :', item.totalSizes);
                const response = await fetch(item.downloadUrls, {
                  headers: { Range: `bytes=${item.chunkStart}-${item.chunkStart + chunkSize - 1}` },
                });
                if (!response.ok) {
                  console.error('Failed to fetch video chunk');
                  return;
                }
    
                const chunk = await response.arrayBuffer();
                chunkStart = item.chunkStart;
                let names = item.uniqueVideoName;
                let downloadedSize = item.downloadedSize;
                let totalSize = item.totalSizes;
                let uniqueNameSaved = item.uniqueVideoName;
                let downloadedUrls = item.downloadUrls;
                downloadedSize += chunk.byteLength;
                const percentage = Math.round((downloadedSize / totalSize) * 100);
                     console.log("percentage :",percentage);
                // Store the chunk and update Blob parts
                const videoBlobParts = [];
                await dbChunks.put('videoChunks', { chunkStart, chunk, identifier: names, date: new Date() });
                videoBlobParts.push(new Uint8Array(chunk));
                chunkStart = item.chunkStart + chunkSize;
                return { videoBlobParts, downloadedSize, chunkStart, uniqueNameSaved, downloadedUrls, finished, percentage };
              } else {
                return { finished: true , downloadedUrls:item.downloadUrls, uniqueNameSaved:item.uniqueVideoName };
              }
            })
          );
    
          return savedData;
        };
    
        const updateLocalstorage = async (savedData) => {
          const localData = JSON.parse(localStorage.getItem('startDownloading'));
            console.log("local start downloading prev: ",localData);
            console.log(savedData);
            
             
             
          const updatedData = await Promise.all(
            savedData.map((item) => {
              return {
                
                chunkStart: item.chunkStart,
                uniqueName: item.uniqueNameSaved,
                downloadedSize: item.downloadedSize,
                downloadUrl: item.downloadedUrls,
                percentage: item.percentage,
              };
              
             
             
            })
          );
          if(localData != null){
                    const pausedFilter=localData.filter((item)=>{
                      const findPaused=updatedData.find((itemTwo)=> itemTwo.uniqueName == item.uniqueName);
                      if(findPaused){
                        return false;
                      }
                      else {
                        return true;
                      }
                    })
             return [...pausedFilter,...updatedData]
          }
          else {
            return [ {
                 

                 
              chunkStart: savedData[0].chunkStart,
              uniqueName: savedData[0].uniqueNameSaved,
              downloadedSize: savedData[0].downloadedSize,
              downloadUrl: savedData[0].downloadedUrls,
              percentage: savedData[0].percentage,
            }
          ]
          }
              
          
        };
    
        // Execute the function flow
        try {
          const headData = await getHeadResponseList();
          console.log(headData);
          const savedData = await saveChunkVideos(headData);
            console.log("saved data:",savedData);
            const finishedFind=savedData.find((item)=> item.finished == true);
            console.log("finished find:",finishedFind);
          if (finishedFind) {
            console.log('finished');
            console.log("finished urls:",finishedFind.downloadedUrls);
            
            const savedUrl=finishedFind.downloadedUrls;
            const finishedUniqueName=finishedFind.uniqueNameSaved;
            const newUrls=currentUrlDownloadingLists.filter((item)=> item != savedUrl);
            setShowRightsArray((prev)=> [...prev,savedUrl]);
            setDownloadedLinks((prev)=> [...prev,savedUrl])
            console.log("new urls:",newUrls);
            const newUniqueFinished=currentDownLoadingUniqueNames.filter((item)=> item != finishedUniqueName);
            setCurrentDownloadingUniqueName(newUniqueFinished);
            setCurrentUrlDownloadingLists(newUrls);
            const previousFinished=localStorage.getItem('finishedVideo');
            let savedFinishedVideos=[];
            if(previousFinished != null){
              const prevVideoFinished=JSON.parse(previousFinished);
              console.log(prevVideoFinished);
              if(prevVideoFinished.includes(finishedUniqueName)){
                console.log("already finished");
                savedFinishedVideos=[finishedUniqueName];
              }
              else {
                prevVideoFinished.push(finishedUniqueName);
              console.log(prevVideoFinished);
              savedFinishedVideos=prevVideoFinished;
              }
              
            }
            else{
              savedFinishedVideos=[finishedUniqueName]
            }
            console.log("saved video finished:", savedFinishedVideos);
            localStorage.setItem("finishedVideo",JSON.stringify(savedFinishedVideos));
            return { finished: true , finishedFind }; // Propagate result
          } else {
            const updatedLocal = await updateLocalstorage(savedData);
            console.log('updated local:', updatedLocal);
            const percentObjectArray=savedData.map((item)=> {
              return {
                uniqueName:item.uniqueNameSaved,
                percent:item.percentage
              }
            });
            console.log("percent object array:",percentObjectArray);
            
            if(downloadPercentageList.length > 0){
             const pausedFiltered=downloadPercentageList.filter((item)=> {
               const findNotPaused=percentObjectArray.find((itemTwo)=> itemTwo.uniqueName == item.uniqueName);
               if(findNotPaused){
                return false;
               }
               else{
                return true;
               }
               
             })
             console.log("paused percentage",pausedFiltered);
             setDownloadPercentageList([...pausedFiltered,...percentObjectArray]);
            }
            else {
              setDownloadPercentageList(percentObjectArray);
            }
            
            localStorage.setItem('startDownloading', JSON.stringify(updatedLocal));
    
            // Optionally, you can update state here
            // setResumeDownLoad((prev) => prev + 1);
    
            return { finished: false ,savedData:savedData}; // Propagate result
          }
        } catch (err) {
          console.log('error in promise chain:', err);
          throw err; // Ensure proper error handling
        }
      };
    
      if (downLoadLink && currentUrlDownloadingLists.length > 0) {
        startDownLoading(downLoadLink, downloadingVideo, currentVideo).then((data) => {
          console.log('data finished:', data.finished);
          if (!data.finished) {
            // console.log("data pause check:",data.savedData);
            // const paused = checkPause(data.savedData);
            // console.log('paused :', paused);
    
            if (false) {
              console.log('paused');
            } else {
              console.log('resume downloading');
              setResumeDownLoad((prev) => prev + 1);
            }
          } else {
            console.log('finished');
            setResumeDownLoad((prev)=> prev + 1);
            setSaveFullVideo((prev)=> prev + 1);
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    }, [downLoadLink, resumeDownLoad]);
    
    
    const checkPause=(uniqueName)=>{
      console.log(JSON.parse(localStorage.getItem('pausedVideo')));
         if(localStorage.getItem("pausedVideo") && JSON.parse(localStorage.getItem('pausedVideo')).includes(uniqueName)){
          console.log(localStorage.getItem("pausedVideo"));
          return true;
         }
         else{
          return false;
         }
    }

   useEffect(()=>{
      if(handleDownloadFirstVideo){
        setDownloadInProgressFirst(true);
      }
   },[handleDownloadFirstVideo])
    useEffect(()=>{
      const inactive="bg-gradient-to-r from-blue-500 to-blue-300";
      const active="bg-gradient-to-r from-green-500 to-green-300";
      if(activeButton == 0){
        setBackColorGrade(active);
        setBackColorYVideos(inactive);
      }
      else {
        setBackColorGrade(inactive);
        setBackColorYVideos(active);
      }
    },[activeButton]);
    useEffect(()=>{
           if(downloadedList.length > 0){
            setTimeout(()=>{
              console.log("downloaded list :",downloadedList);
              console.log(downloadedList.includes('0'));
              console.log(downloadedList.includes('1'));
             },10000);
           }
          
    },[downloadedList]);
    useEffect(()=>{
      console.log("downloaded links ",downloadedLinks);
    },[downloadedLinks]);

    useEffect(()=>{
       if(currentDownloadingVideoLists){
        console.log( "currentDownloadingVideoLists: ",currentDownloadingVideoLists);
       }
    },[currentDownloadingVideoLists]);

    useEffect(()=>{
           console.log("current Url Downloading Lists:",currentUrlDownloadingLists);
           
    },[currentUrlDownloadingLists]);

    useEffect(()=>{
            console.log("hide downloads:",hideDownloadS);
    },[hideDownloadS]);
    
   
    const handleError=()=>{
      console.log("error in fetching video");
      setFetchedErrorVideoShow(true);
    }
    const handleError2=()=>{
      console.log("error in fetching video");
      setFetchedErrorVideoShow2(true);
    }
    const handleDownloadFirst=  (event)=>{
      console.log(event.target.getAttribute('id'));
      const index=event.target.getAttribute('id');
      // setResumeDownLoad((prev)=> prev + 1);

      // setDownloadPercentage(0);
      const urlClicked=filteredAsset[index].src;
      const uniqueNameClicked=filteredAsset[index].uniqueName;
      console.log("url clicked:",urlClicked);
      setCurrentUrlDownloadingLists((prev)=>{
        if(prev.includes(urlClicked)){
          console.log("already in download");
          return [...prev]
        }
        else {
          return [...prev,urlClicked]
        }
      });
      setCurrentVideo(index);
      setHideDownloads((prev)=> [...prev,parseInt(index)]);
      setShowPauses((prev)=> [...prev,parseInt(index)]);
      setCurrentDownloadingVideoLists((prev) => [...prev,index]);
      setCurrentDownloadingUniqueName((prev) => {
        if(prev.includes(uniqueNameClicked)){
          console.log("already in download");
          return [...prev]
        }
        else {
          return [...prev,uniqueNameClicked]
        }
      });
      checkResume(parseInt(index));
      setResumeDownLoad((prev)=> prev + 1);
      setPausingVideo(99999);
      setClickedButton("download");
       setHandleDownloadFirstVideo(index);
       setDownLoadedList([...downloadedList,index]);
       setPauseFirst(index);
       setDownLoadingVideo(filteredAsset[index].uniqueName);
       setDownLoadLink(filteredAsset[index].src);
       setStartDownloadFirstVideo(true);
       setClickedList(index);
    }
    const checkResume=(index)=>{
      
        const getPausedVideos=localStorage.getItem('pausedVideo');
        console.log(getPausedVideos);
        if(getPausedVideos != null){
           const filteredLocal=JSON.parse(getPausedVideos).filter((item)=> item != filteredAsset[index].uniqueName);
           console.log(getPausedVideos);
           console.log("filtered local ", filteredLocal);
           localStorage.setItem('pausedVideo',JSON.stringify(filteredLocal));
        }
        else{
          console.log("null local storage");
        }
      
       
    }
    const handlePause=(event)=>{
      const index=event.target.getAttribute("id");
      console.log("paused index:",index);
          setPauseFirst(index);
          setPausingVideo(index);
          const filteredHideDownloads=hideDownloadS.filter((item)=> item != index);
          setHideDownloads(filteredHideDownloads);
          const filteredShowPauses=showPauses.filter((item)=> item != index);
          setShowPauses(filteredShowPauses);
        
    }
    const viewVideosClicked=()=>{
       setActiveButton(1);
    }
    const percentFunction= (index)=>{
      const findPercent=downloadPercentageList.find((item)=> item.uniqueName == filteredAsset[index].uniqueName);
      if(findPercent){
        console.log("find percent :",findPercent);
        return findPercent.percent;
      }
      else{
        return 0;
      }
    }
 
  
    return (
        <>
            {
              true && (
                <div className='w-full animate-fadeIn min-h-screen flex flex-col justify-start items-center bg-gradient-to-t from-gray-300 to-gray-400 pt-4' >
                <div className='w-full p-4 flex justify-center items-center bg-white text-gray-400 mb-6' >
                 <h1 className='text-3xl font-semibold' >
                     Videos
                 </h1>
                </div>
                <div className='w-full relative bg-blue-300 flex justify-between items-center' >
                 <div className='absolute z-10 inset-0 flex justify-center items-center' >
                          <div className='w-2 h-full bg-red-400' >

                          </div>
                 </div>
                 <div 
                 onClick={()=>{
                     setActiveButton(0);
                 }}
                 className={`w-1/2 ${backColorGrade} flex relative z-20 justify-center items-center h-full  p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 group`}>
<div className="text-white h-full text-2xl font-semibold group-hover:scale-105 transition-transform duration-300 ease-in-out">
Grade
</div>
</div>
                 <div
                 onClick={()=>{
                     setActiveButton(1);
                      
                 }}
                 className={` ${backColorYVideos} w-1/2 flex relative z-20 justify-center items-center h-full  p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 group`}>
<div className="text-white h-full text-2xl font-semibold group-hover:scale-105 transition-transform duration-300 ease-in-out">
Your Videos
</div>
</div>
                </div>
                {
                 activeButton == 0 && !showAllVideosDownLoaded && (
                   <div className='mt-4 w-full h-auto py-4 bg-white flex flex-col gap-y-4 justify-start items-center' >
                     {
                        filteredAsset.map((asset,index)=>(
                          <React.Fragment key={asset.uniqueName}>
                                   <div
                                    
                  
                  className="w-full h-12 flex justify-between items-center p-2 bg-gradient-to-r from-green-500 to-green-300 hover:shadow-lg transition-shadow duration-300">

<div 
onClick={()=>{
if(clickedList == index){
   setClickedList(9999);
 
}
else{
   setClickedList(index);
   setShowCurrentVideo(index);
   
}

}}
className="w-1/2 h-full flex justify-center items-center overflow-x-hidden">
<span className="text-2xl text-white font-semibold w-full text-center overflow-x-hidden hover:text-gray-200 transition-colors duration-300">
 {asset.uniqueName}
</span>
</div>


<div className="w-1/2 h-full flex justify-center items-center">

<div className="w-1/2 h-full flex justify-center items-center">
 <span className="text-2xl text-blue-500 font-semibold hover:text-blue-400 transition-colors duration-300">
   12
   <span className="text-red-400 font-bold">:</span>
   <span className="text-yellow-600">24</span>
 </span>
</div>


<div className="w-1/2 h-full flex justify-center items-center">
 <img
 onClick={handleDownloadFirst}
 id={index}
   src="/download.png"
   className={` ${hideDownloadS.includes(index) ? "hidden":""} ${downloadedLinks.includes(asset.src) ? "hidden":""} h-full w-auto hover:scale-110 transition-transform duration-300`}
   alt=""
 />
  <img
 onClick={
  handlePause
}
  id={index}
   src="/pause.png"
   className={` ${showPauses.includes(index) ? "":"hidden"} ${downloadedLinks.includes(asset.src) ? "hidden":""} h-full w-auto hover:scale-110 transition-transform duration-300`}
   alt=""
 />
  <img
 onClick={()=>{
     console.log("finished clicked");
 }}
   src="/right.avif"
   className={` ${downloadedLinks.includes(asset.src) ? "":"hidden"} h-full w-auto hover:scale-110 transition-transform duration-300`}
   alt=""
 />
</div>
</div>
</div> 
{
(clickedList == index || currentDownloadingVideoLists.includes(String(index))) && (
  <>
    <div
     
    className={` ${handleDownloadFirstVideo == index || showCurrentVideo == index || currentDownloadingVideoLists.includes(String(index)) ? "":"hidden"} w-full p-4 bg-white h-44`} >
         <video controls muted autoPlay onError={handleError} src={asset.src} className={` ${fetchedErrorVideoShow ? "hidden":""} w-full h-full`} ></video>
         <div className={` ${fetchedErrorVideoShow ? "":"hidden"} w-full h-full bg-gray-300 text-red-300 flex justify-center items-center`}>
                      <span className='text-blue-300 font-semibold' >YOU NEED TO CONNECT YOUR DEVICE TO INTERNET</span>
         </div>
    </div>
     <div className={` ${handleDownloadFirstVideo == index || currentDownloadingVideoLists.includes(String(index)) ? "":"hidden"} flex flex-col items-center justify-center space-y-4 p-6`}>
  <h2 className="text-xl font-semibold">Downloading in Progress</h2>

  {/* Progress bar */}
  <div className="relative w-full max-w-xs">
    <div className="w-full h-2 bg-gray-200 rounded-full">
      <div
        className="h-2 bg-blue-500 rounded-full"
        style={{ width: `${percentFunction(index)}%` }}
      ></div>
    </div>

    {/* Percentage Text */}
    <span
      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-xl font-medium text-blue-500"
      style={{ left: `${percentFunction(index)}%` }}
    >
      {percentFunction(index)}%
    </span>
  </div>

  {/* Optional message */}
  {downloadPercentage === 100 && (
    <p className="text-green-500">Download Complete!</p>
  )}
</div>

    </>

)
}
<>

</>
                          </React.Fragment>
                           
                        ))
                     }
             
 

 
 
                   </div>
                 )
                }
                {
                  activeButton == 0 && showAllVideosDownLoaded && (
                    <AllVideosDownLoaded onViewVideos={viewVideosClicked} />
                  )
                }
                {
                 activeButton == 1 && (
                   <DownloadedVideo reload={true}
                    />
                 )
                }
  
 </div>
              )
            }
       
        </>
    );
};

export default  VideoTutor;