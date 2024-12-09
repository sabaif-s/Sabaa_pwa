import React,{useEffect,useState} from 'react';
import {openDB} from "idb";
import { use } from 'react';
const  DownloadedVideo = ({reload}) => {
    const [videoUrls,setVideoUrls]=useState("");
    const [renderComponent,setRenderComponent]=useState(false);
    const [downloadedVideos,setDownloadedVideos]=useState([]);
    const [noVideo,setNoVideo]=useState(false);
    const [currentShowVideo,setCurrentShowVideo]=useState(9999);


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
                return URL.createObjectURL(item.blob);
               });
               console.log("url videos:",urlVideos);
               setDownloadedVideos(urlVideos);
                const urlVideo= URL.createObjectURL(allData[0].blob);
                console.log(allData[0].blob);
             console.log(urlVideo);
             setVideoUrls(urlVideo);
            
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
                <div className='mt-4 w-full h-auto py-4 bg-white flex flex-col gap-y-4 justify-start items-center' >
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