import React,{useEffect,useState} from 'react';
import AssetPdf from './AssetPdf';
const  PdfDownloads = () => {
    const [firstLoaded,setFirstLoaded]=useState(false);
    const [secondLoaded,setSecondLoaded]=useState(false);
    const [fadeInContent,setFadeInContent]=useState(false);
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
    const handleClickedDownload=(e)=>{
       console.log("clicked button:",e.currentTarget.getAttribute("id"));
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
                                            className='p-2 bg-gradient-to-t from-blue-600 to-blue-300' >
                                               <span className='text-white text-2xl'>Download</span>
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