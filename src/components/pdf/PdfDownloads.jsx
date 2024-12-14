import React,{useEffect,useState} from 'react';

const  PdfDownloads = () => {
    const [firstLoaded,setFirstLoaded]=useState(false);
    const [secondLoaded,setSecondLoaded]=useState(false);
    const [fadeInContent,setFadeInContent]=useState(false);

    useEffect(()=>{
           if(firstLoaded && secondLoaded){
            setTimeout(()=>{
                       setFadeInContent(true);
            },1500);
           }
    },[firstLoaded,secondLoaded]);
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
                      <div className='w-full h-full bg-black bg-opacity-50 flex flex-col justify-start items-center pt-6' >
                                <div className='w-full bg-white flex flex-wrap justify-between items-center' >
                                   <div className='basis-1/2' >
                                    first
                                   </div>
                                   <div className='basis-1/2'>
                                    second
                                   </div>
                                   <div className='basis-1/2'>
                                    third
                                   </div>
                                </div>
                      </div>
               </div>
        </div>
    );
};

export default  PdfDownloads;