import React,{useEffect,useState} from 'react';

const  DownloadedVideo = () => {
    return (
        <div className='mt-4 w-full h-auto py-4 bg-white flex flex-col gap-y-4 justify-start items-center' >
        <div
       
        className="w-full h-12 flex justify-between items-center p-2 bg-gradient-to-r from-green-500 to-green-300 hover:shadow-lg transition-shadow duration-300">

<div 
// onClick={()=>{
// if(clickedList == 1 && !downloadInProgressFirst){
// setClickedList(0);

// }
// else{
// setClickedList(1);
// }

// }}
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
// onClick={handleDownloadFirst}
src="/download.png"
className={` ${handleDownloadFirstVideo ? "hidden":""} ${fullyDownloadedFirst ? "hidden":""} h-full w-auto hover:scale-110 transition-transform duration-300`}
alt=""
/>
<img
// onClick={()=>{
// setPauseFirst(false);
// setHandleDownloadFirstVideo(false);
// }}
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
    );
};

export default  DownloadedVideo;