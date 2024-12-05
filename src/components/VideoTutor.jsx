import React,{useEffect,useState} from 'react';

const  VideoTutor = () => {
    const [activeButton,setActiveButton]=useState(0);
    const [backColorGrade,setBackColorGrade]=useState("bg-gradient-to-r from-green-500 to-green-300");
    const [backColorYVideos,setBackColorYVideos]=useState("bg-gradient-to-r from-blue-500 to-blue-300");

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
                       <div className="w-full h-12 flex justify-between items-center p-2 bg-gradient-to-r from-green-500 to-green-300 hover:shadow-lg transition-shadow duration-300">
  
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
<div className="w-full h-12 flex justify-between items-center p-2 bg-gradient-to-r from-green-500 to-green-300 hover:shadow-lg transition-shadow duration-300">
  
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
                       </div>
        </div>
    );
};

export default  VideoTutor;