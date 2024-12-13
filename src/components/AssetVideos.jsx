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
         const realFiltered=videoAssets.filter((video)=>{
            const downloadedLocal=localStorage.getItem('downloadedVideo');
            
            if(downloadedLocal != null){
                const parse=JSON.parse(downloadedLocal);
                
                const matchFoundInDownload=parse.find((item)=>item == video.uniqueName);
                if(matchFoundInDownload){
                    return false;
                }
                else {
                    return true;
                }
            }
            else{
                return true
            }
         })
        const filteredAssets=videoAssets.filter((video)=> video.uniqueName != localStorage.getItem(video.uniqueName));
        setVideoAsset(videoAssets);
        setFilteredAsset(realFiltered);
        setSuccessSend(true);
     console.log("filtered asset: ", realFiltered);
    },[]);
   
    
   return {videoAsset,filteredAsset,successSend}
};

export default  AssetVideos;