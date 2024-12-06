import React from 'react';
import firstVideo from '../assets/videos/firstVideo.mp4';
import secondVideo from '../assets/videos/secondVideo.mp4';
const  AssetVideos = () => {
     const videoAsset=[
        {
            uniqueName:"firstVideo",
            src:firstVideo
        },
        {
            uniqueName:"secondVideo",
            src:secondVideo
        },
     ]
   return {videoAsset}
};

export default  AssetVideos;