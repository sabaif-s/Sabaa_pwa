import React,{useEffect,useState} from 'react';
import {openDB} from "idb";
import { use } from 'react';
const  DownloadedVideo = ({reload}) => {
    const [videoUrls,setVideoUrls]=useState("");
    const [renderComponent,setRenderComponent]=useState(false);
    const [downloadedVideos,setDownloadedVideos]=useState([]);
    const [uniqueName,setUniqueName]=useState([]);
    const [noVideo,setNoVideo]=useState(false);
    const [currentShowVideo,setCurrentShowVideo]=useState(9999);
    const [durations,setDurations]=useState([]);


    useEffect(()=>{
        const initDB = async () => {
            // Open the database
            const db = await openDB('VideoDatabaseFull', 1, {
              upgrade(db) {
                if (!db.objectStoreNames.contains('videos')) {
                  db.createObjectStore('videos', { keyPath: 'id' });
                }
              },
            });
          
            return db;
          };
          function getVideoDuration(blob) {
            return new Promise((resolve, reject) => {
              // Create a video element
              const video = document.createElement("video");
          
              // Handle metadata loaded event
              video.onloadedmetadata = () => {
                // Resolve the duration in seconds
                resolve(video.duration);
              };
          
              // Handle error case
              video.onerror = (e) => {
                reject("Error loading video metadata");
              };
          
              // Load the blob as video source
              video.src = URL.createObjectURL(blob);
            });
          }
          const fetchData = async () => {
            const db = await initDB();
          
            // Open a transaction to access the 'videoChunks' store
            const tx = db.transaction('videos', 'readonly');
            const store = tx.objectStore('videos');
          
            // Fetch all data (if you want specific data, you can use get() or openCursor)
            const allData = await store.getAll();
            if(allData.length == 0){
                setNoVideo(true);
            }
            else{
               const urlVideos=allData.map((item)=>{
                return URL.createObjectURL(item.blobFILE);
               });
               const uniqueName=allData.map((item)=> {
                return item.uniqueName;
               })
               console.log("url videos:",urlVideos);
               setUniqueName(uniqueName);
               setDownloadedVideos(urlVideos);
                const urlVideo= URL.createObjectURL(allData[0].blobFILE);
                console.log(allData[0].blobFILE);
             console.log(urlVideo);
             setVideoUrls(urlVideo);
             const allVideos = Promise.all(
              allData.map((item) =>
                getVideoDuration(item.blobFILE)
                  .then((duration) => {
                    const minutes = Math.floor(duration / 60);
                    const seconds = Math.floor(duration % 60);
                    console.log(`Video Duration: ${duration} seconds`);
                    return `${minutes}:${seconds}`; // Return formatted duration
                  })
                  .catch((error) => {
                    console.error("Error: ", error);
                    return "Error getting duration"; // Handle errors gracefully
                  })
              )
            );
            
            // Use the resolved data
            allVideos
              .then((durations) => {
                setDurations(durations);
                console.log("All video durations:", durations); // Array of durations
              })
              .catch((err) => {
                console.error("Error processing videos:", err);
              });
             
             
              
            
            }
            
    
             
            // Log the fetched data
            console.log('Fetched Data:', allData);
          
            // Optionally, return data for further use
            return allData;
          };
          
          // Example usage
          if(reload){
            fetchData();
          }
          
    },[reload]);
  useEffect(()=>{
        if(downloadedVideos.length > 0){
          setRenderComponent(true);
        }
  },[downloadedVideos]);
  
 const handleError2=()=>{
  console.log("error in loading video");
 }
    return (
        <>
        {
            renderComponent && (
                <div className='mt-4 w-full lg:w-2/3 h-auto py-4 bg-white flex flex-col gap-y-4 justify-start items-center' >
                  { 
                      
                  downloadedVideos.map((video,index)=>(
                    <React.Fragment key={index}>
                         <div
                          
                         className="w-full h-12 flex justify-between items-center p-2 bg-gradient-to-r from-green-500 to-green-300 hover:shadow-lg transition-shadow duration-300">
                 
                 <div 
                 onClick={()=>{
                 if(currentShowVideo == index){
                 setCurrentShowVideo(9999);
                 
                 }
                 else{
                 setCurrentShowVideo(index);
                 }
                 
                 }}
                 className="w-1/2 h-full flex justify-center items-center overflow-x-hidden">
                 <span className="text-2xl text-white font-semibold w-full text-center overflow-x-hidden hover:text-gray-200 transition-colors duration-300">
                  {uniqueName[index]}
                 </span>
                 </div>
                 
                 
                 <div className="w-1/2 h-full flex justify-center items-center">
                 
                 <div className="w-1/2 h-full flex justify-center items-center">
                 <span className="text-2xl text-blue-500 font-semibold hover:text-blue-400 transition-colors duration-300">
                 {durations && durations[index] && durations[index].split(":")[0]}
                 <span className="text-red-400 font-bold">:</span>
                 <span className="text-yellow-600">{durations && durations[index] && durations[index].split(":")[1]}</span>
                 </span>
                 </div>
                 
                 
                 <div className="w-1/2 h-full flex justify-center items-center">
                 
                 
                 
                 </div>
                 </div>
                 </div>
                 <div className={`w-full ${currentShowVideo != index ? "hidden":""}  p-4 bg-white h-44`} >
        <video controls muted autoPlay onError={handleError2} src={video} className={` w-full h-full`} ></video>
         
        </div>
                 </React.Fragment>
                  ))
                   
                  }
 
        {
        0 == 2 && (
        <div className='w-full p-4 bg-white h-44' >
        <video controls muted autoPlay onError={handleError2} src={videoUrls} className={` ${fetchedErrorVideoShow2 ? "hidden":""} w-full h-full`} ></video>
         
        </div>
        
        )
        }
                </div>
            )
        }
      
        </>
    );
};

export default  DownloadedVideo;