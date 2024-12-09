import React,{useEffect,useState} from 'react';
import firstVideo from '../assets/videos/firstVideo.mp4';
import secondVideo from '../assets/videos/secondVideo.mp4';
const  AssetVideos = () => {
    const [videoAsset,setVideoAsset]=useState([]);
    const [filteredAsset,setFilteredAsset]=useState([]);
    const [successSend,setSuccessSend]=useState(false);
    useEffect(()=>{
        const videoAssets=[
            {
                uniqueName:"firstVideo",
                src:firstVideo
            },
            {
                uniqueName:"secondVideo",
                src:secondVideo
            },
         ]
        const filteredAssets=videoAssets.filter((video)=> video.uniqueName != localStorage.getItem(video.uniqueName));
        setVideoAsset(videoAssets);
        setFilteredAsset(filteredAssets);
        setSuccessSend(true);
     console.log("filtered asset: ", filteredAssets);
    },[]);
   
    
   return {videoAsset,filteredAsset,successSend}
};

export default  AssetVideos;