import React,{useEffect, useState} from 'react';
import ScreenSize from '../hooks/ScreenSize';
const  HomePageELearn = () => {
    const {largeMobile}=ScreenSize();
    const [height,setHeight]=useState(0);
    const [slideDown,setSlideDown]=useState(0);
    const [animateInDivStart,setAnimateInDivStart]=useState(false);
    const [animateDiv,setAnimateDiv]=useState(false);
    useEffect(()=>{
        if(largeMobile){
                     setHeight("620px");
        }
        else{
                   setHeight("360px");
        }
                  console.log(largeMobile);
    },[largeMobile]);
    useEffect(()=>{
        const interval=setInterval(()=>{
                           setSlideDown((prev)=> prev+ 1);
                           
        },1000);

        return ()=>{
            clearInterval(interval);
        }
    },[]);
    useEffect(()=>{
       if(slideDown == 6){
        setAnimateInDivStart(true);
       }
    },[slideDown]);
    useEffect(() => {
        let interval; // Declare interval at the top
      
        if (animateInDivStart) {
            console.log(animateInDivStart);
            const timeout = setTimeout(() => {
                interval = setInterval(() => {
                    setAnimateDiv((prev) => prev + 1);
                }, 2000);
            }, 1500);
    
            // Cleanup function
            return () => {
                clearTimeout(timeout); // Clear timeout if the effect is cleaned up early
                clearInterval(interval); // Clear the interval if it exists
            };
        }
    
        // Cleanup in case `animateInDivStart` is false
        return () => {
            clearInterval(interval);
        };
    }, [animateInDivStart]);
    
    return (
        <div className='w-full h-screen bg-gradient-to-t from-cyan-700 to-sky-300 flex justify-center items-center' >
        <div className='w-3/4 relative  bg-red-100' style={{height:height}} >
                 <div className={`w-full flex justify-center py-4 rounded-full ${slideDown < 1 ? "opacity-0":""} ${slideDown == 1 ? "animate-slideDownFast":""}  ${largeMobile ? "h-40 ":"h-24"}  bottom-0 bg-[#C1E8FF] absolute z-50`} >
                    <div className={`w-2/3 ${animateDiv > 1 ? "animate-bgChange":""} rounded-lg ${animateDiv == 1 && animateDiv < 3 ? "animate-flip3d":""}  flex justify-center items-center h-full bg-white text-gray-400`}
                     >
                           <span className={`${animateDiv > 1 ? "text-white":""}  ${animateDiv == 1 ? "animate-flip3dB":""} text-xl font-bold`} >Interactive Lessons</span>
                    </div>
                 </div>
                 <div className={`w-full flex py-4 justify-center items-start rounded-full ${slideDown < 2 ? "opacity-0":""}  ${slideDown == 2 ? "animate-slideDownFast":""}   ${largeMobile ? "h-40 bottom-20":"h-24 bottom-12"}  bg-[#7DA0CA] absolute z-40`} >
                 <div className={`w-2/3 ${animateDiv > 2 ? "animate-bgChange3":""} rounded-lg ${animateDiv == 2 && animateDiv < 4 ? "animate-flip3d":""}  flex justify-center items-start h-full bg-white text-gray-400`}
                     >
                           <span className={`${animateDiv > 2 ? "text-white":""}  ${animateDiv == 2 ? "animate-flip3dB":""} text-xl font-bold`} >Video Tutorials</span>
                    </div>
                 </div>
                 <div className={`w-full flex py-4 justify-center items-start rounded-full  ${slideDown < 3 ? "opacity-0":""} ${slideDown == 3 ? "animate-slideDownFast":""}   ${largeMobile ? "h-40 bottom-40":"h-24 bottom-24"}  bg-[#5483B3] absolute z-30`} >
                 <div className={`w-2/3 ${animateDiv > 3 ? "animate-bgChange2":""} rounded-lg ${animateDiv == 3 && animateDiv < 5 ? "animate-flip3d":""}  flex justify-center items-start h-full bg-white text-gray-400`}
                     >
                           <span className={`${animateDiv > 3 ? "text-white":""}  ${animateDiv == 3 ? "animate-flip3dB":""} text-xl font-bold`} >Quizzes</span>
                    </div>
                 </div>
                 <div className={`w-full py-4 rounded-full flex justify-center items-start  ${slideDown < 4 ? "opacity-0":""} ${slideDown == 4 ? "animate-slideDownFast":""}   ${largeMobile ? "h-40 bottom-60":"h-24 bottom-36"}   bg-sky-200 absolute z-20`} >
                 <div className={`w-2/3  hover:bg-opacity-75 transition-all ${animateDiv > 4 ? "animate-bgChange bg-opacity-25":""} rounded-lg ${animateDiv == 4 && animateDiv < 6 ? "animate-flip3d":""}  flex justify-center items-start h-full bg-white text-gray-400`}
                     >
                           <span className={`${animateDiv > 4 ? "text-white":""}  ${animateDiv == 4 ? "animate-flip3dB":""} text-xl font-bold`} >Downloadable PDFs</span>
                    </div>
                 </div>
                 <div className={`w-full py-4 rounded-full flex justify-center items-start  ${slideDown < 5 ? "opacity-0":""} ${slideDown == 5 ? "animate-slideDownFast":""}   ${largeMobile ? "h-40 bottom-80":"h-24 bottom-48"}  bg-gray-400 absolute z-10`} >
                 </div>
                 <div className={`w-full rounded-full  ${slideDown < 6 ? "opacity-0":""} ${slideDown == 6 ? "animate-slideDownFast":""}   ${largeMobile ? "h-40 bottom-96":"h-24 bottom-60"}  bg-green-300 absolute z-0`} >
                 </div>
        </div>
</div>
    );
};

export default  HomePageELearn;