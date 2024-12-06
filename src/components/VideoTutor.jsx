import React,{useEffect,useState} from 'react';
import { openDB } from 'idb';
import firstVideo from '../assets/videos/firstVideo.mp4';
import secondVideo from '../assets/videos/secondVideo.mp4';
const  VideoTutor = () => {
    const [activeButton,setActiveButton]=useState(0);
    const [backColorGrade,setBackColorGrade]=useState("bg-gradient-to-r from-green-500 to-green-300");
    const [backColorYVideos,setBackColorYVideos]=useState("bg-gradient-to-r from-blue-500 to-blue-300");
    const [clickedList,setClickedList]=useState(0);
    const [fetchedErrorVideoShow,setFetchedErrorVideoShow]=useState(false);
    const [fetchedErrorVideoShow2,setFetchedErrorVideoShow2]=useState(false);
    const [downloadPercentage, setDownloadPercentage] = useState(0);
    const [handleDownloadFirstVideo,setHandleDownloadFirstVideo]=useState(false);
    const [pauseFirst,setPauseFirst]=useState(false);
    const [downloadInProgressFirst,setDownloadInProgressFirst]=useState(false);
    const [startDownloadFirstVideo,setStartDownloadFirstVideo]=useState(false);
    const [fullyDownloadedFirst,setFullyDownloadedFirst]=useState(false);
    // useEffect(() => {
    //   let interval;
    //   if (downloadPercentage < 100) {
    //     interval = setInterval(() => {
    //       setDownloadPercentage((prev) => {
    //         if (prev < 100) return prev + 1;
    //         clearInterval(interval);
    //         return 100;
    //       });
    //     }, 100); // Simulate download progress every 100ms
    //   }
    //   return () => clearInterval(interval);
    // }, [downloadPercentage]);
    
     
    
    useEffect(() => {
      async function downloadVideo(videoUrl) {
        // Open or create an IndexedDB instance
        const initDBChunk=async ()=>{
          const db = await openDB('video-db', 1, {
            upgrade(db) {
              // Create an object store for storing video chunks
              if (!db.objectStoreNames.contains('videoChunks')) {
                db.createObjectStore('videoChunks', { keyPath: 'chunkStart' });
              }
            },
          });
          return db;
        }
        const db=await initDBChunk();
      
        const initDB = async () => {
          const db = await openDB('VideoDatabaseFull', 1, {
              upgrade(db) {
                  if (!db.objectStoreNames.contains('videos')) {
                      db.createObjectStore('videos', { keyPath: 'id', autoIncrement: true });
                  }
              },
          });
          return db;
      };
        const chunkSize = 1024 * 1024; // 1MB per chunk
        let downloadedSize = 0;
        let totalSize = 0;
    
        // First, get the total video size using a HEAD request
        const headResponse = await fetch(videoUrl, { method: 'HEAD' });
        if (!headResponse.ok) {
          console.error('Failed to fetch video header');
          return;
        }
        totalSize = parseInt(headResponse.headers.get('Content-Length'), 10);
    
        // Prepare for download
        const videoBlobParts = [];
    
        // Function to update progress and store chunks in IndexedDB
        const updateProgress = async (chunk, chunkStart) => {
          downloadedSize += chunk.length;
          const percentage = Math.round((downloadedSize / totalSize) * 100);
          setDownloadPercentage(percentage);
          console.log(`Downloading: ${percentage}%`);
    
          // Store the chunk in IndexedDB
          await db.put('videoChunks', { chunkStart, chunk, identifier:"firstVideo" });
    
          // Update the Blob parts
          videoBlobParts.push(chunk);
        };
    
        // Function to fetch chunks
        const fetchChunks = async () => {
          let chunkStart = 0;
          while (chunkStart < totalSize) {
            const response = await fetch(videoUrl, {
              headers: {
                'Range': `bytes=${chunkStart}-${chunkStart + chunkSize - 1}`,
              }
            });
    
            if (!response.ok) {
              console.error('Failed to fetch video chunk');
              break;
            }
    
            const chunk = await response.arrayBuffer();
            updateProgress(new Uint8Array(chunk), chunkStart);
            chunkStart += chunkSize;
          }
    
          // Once all chunks are downloaded, create a Blob
          const finalBlob = new Blob(videoBlobParts, { type: 'video/mp4' });
          const videoURL = URL.createObjectURL(finalBlob);
           // time to save full db
           const saveVideoBlob = async (videoBlob) => {
            const db = await initDB();
        
            // Save the video blob to the database
            const id = await db.put('videos', {
                blob: videoBlob, // Store the Blob
                createdAt: new Date(), // Optional metadata
            });
            console.log(`Video saved with ID: ${id}`);
          //   const clearAllRecords = async () => {
          //     const db = await initDBChunk();
          
          //     // Clear all records from the object store
          //     await db.clear('videoChunks');
          //     console.log('All records in the collection have been deleted');
          // };
          const deleteByAttribute = async (attributeName, attributeValue) => {
            const db = await initDBChunk();
        
            // Open a transaction with readwrite access
            const tx = db.transaction('videoChunks', 'readwrite');
            const store = tx.objectStore('videoChunks');
        
            // Use a cursor to iterate through all records
            let cursor = await store.openCursor();
        
            while (cursor) {
                const record = cursor.value;
        
                // Check if the record's attribute matches the desired value
                if (record[attributeName] === attributeValue) {
                    // Delete the record using the key
                    await store.delete(cursor.key);
                    console.log(`Record with key ${cursor.key} deleted`);
                }
        
                // Move to the next record
                cursor = await cursor.continue();
            }
        
            // Wait for the transaction to complete
            await tx.done;
            setFullyDownloadedFirst(true);

            console.log(`Records with ${attributeName} = ${attributeValue} deleted`);
        };
            if(id){
              // clearAllRecords();
              deleteByAttribute("identifier","firstVideo");
            }
            
          
          // Example usage
          
            
        };
        
        
        saveVideoBlob(finalBlob);
        



          console.log('Download complete. Video URL:', videoURL);
    
          return videoURL;
        };
    
        return fetchChunks();
      }
    
      if (startDownloadFirstVideo) {
        downloadVideo(firstVideo);
      }
    }, [startDownloadFirstVideo]);
    
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
    const handleError=()=>{
      console.log("error in fetching video");
      setFetchedErrorVideoShow(true);
    }
    const handleError2=()=>{
      console.log("error in fetching video");
      setFetchedErrorVideoShow2(true);
    }
    const handleDownloadFirst= async ()=>{
       setHandleDownloadFirstVideo(true);
       setPauseFirst(true);
       setStartDownloadFirstVideo(true);
       setClickedList(1);
    }
    return (
        <div className='w-full min-h-screen flex flex-col justify-start items-center bg-gradient-to-t from-gray-300 to-gray-400 pt-4' >
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
                       <div className='mt-4 w-full h-auto py-4 bg-white flex flex-col gap-y-4 justify-start items-center' >
                       <div
                      
                       className="w-full h-12 flex justify-between items-center p-2 bg-gradient-to-r from-green-500 to-green-300 hover:shadow-lg transition-shadow duration-300">
  
  <div 
   onClick={()=>{
    if(clickedList == 1 && !downloadInProgressFirst){
        setClickedList(0);
      
    }
    else{
        setClickedList(1);
    }
    
   }}
  className="w-1/2 h-full flex justify-center items-center overflow-x-hidden">
    <span className="text-2xl text-white font-semibold w-full text-center overflow-x-hidden hover:text-gray-200 transition-colors duration-300">
      name
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
        src="/download.png"
        className={` ${handleDownloadFirstVideo ? "hidden":""} ${fullyDownloadedFirst ? "hidden":""} h-full w-auto hover:scale-110 transition-transform duration-300`}
        alt=""
      />
       <img
      onClick={()=>{
         setPauseFirst(false);
         setHandleDownloadFirstVideo(false);
      }}
        src="/pause.png"
        className={` ${pauseFirst ? "":"hidden"} ${fullyDownloadedFirst ? "hidden":""} h-full w-auto hover:scale-110 transition-transform duration-300`}
        alt=""
      />
       <img
      onClick={()=>{
          console.log("finished clicked");
      }}
        src="/right.avif"
        className={` ${fullyDownloadedFirst ? "":"hidden"} h-full w-auto hover:scale-110 transition-transform duration-300`}
        alt=""
      />
    </div>
  </div>
</div>
{
    clickedList == 1 && (
      <>
        <div className={` ${handleDownloadFirstVideo ? "hidden":""} w-full p-4 bg-white h-44`} >
             <video controls muted autoPlay onError={handleError} src={firstVideo} className={` ${fetchedErrorVideoShow ? "hidden":""} w-full h-full`} ></video>
             <div className={` ${fetchedErrorVideoShow ? "":"hidden"} w-full h-full bg-gray-300 text-red-300 flex justify-center items-center`}>
                          <span className='text-blue-300 font-semibold' >YOU NEED TO CONNECT YOUR DEVICE TO INTERNET</span>
             </div>
        </div>
         <div className={` ${handleDownloadFirstVideo ? "":"hidden"} flex flex-col items-center justify-center space-y-4 p-6`}>
      <h2 className="text-xl font-semibold">Downloading in Progress</h2>

      {/* Progress bar */}
      <div className="relative w-full max-w-xs">
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-blue-500 rounded-full"
            style={{ width: `${downloadPercentage}%` }}
          ></div>
        </div>

        {/* Percentage Text */}
        <span
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-xl font-medium text-blue-500"
          style={{ left: `${downloadPercentage}%` }}
        >
          {downloadPercentage}%
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

<div
 onClick={()=>{
    if(clickedList == 2){
              setClickedList(0);
    }
    else {
        setClickedList(2);
    }
    
   }}
className="w-full h-12 flex justify-between items-center p-2 bg-gradient-to-r from-green-500 to-green-300 hover:shadow-lg transition-shadow duration-300">
  
  <div className="w-1/2 h-full flex justify-center items-center overflow-x-hidden">
    <span className="text-2xl text-white font-semibold w-full text-center overflow-x-hidden hover:text-gray-200 transition-colors duration-300">
      name
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
        src="/download.png"
        className="h-full w-auto hover:scale-110 transition-transform duration-300"
        alt=""
      />
    </div>
  </div>
</div>
{
    clickedList == 2 && (
        <div className='w-full p-4 bg-white h-44' >
            <video controls muted autoPlay onError={handleError2} src={secondVideo} className={` ${fetchedErrorVideoShow2 ? "hidden":""} w-full h-full`} ></video>
             <div className={` ${fetchedErrorVideoShow2 ? "":"hidden"} w-full h-full bg-gray-300 text-red-300 flex justify-center items-center`}>
                          <span className='text-blue-300 font-semibold' >YOU NEED TO CONNECT YOUR DEVICE TO INTERNET</span>
             </div>
        </div>

    )
}
                       </div>
        </div>
    );
};

export default  VideoTutor;