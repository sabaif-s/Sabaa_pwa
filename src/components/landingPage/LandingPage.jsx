import React,{useEffect,useState} from 'react';
import AssetLanding from './AssetLanding';
const  LandingPage = () => {
    const [clickedButton,setClickedButton]=useState("");
    const [animateOut,setAnimateOut]=useState(false);
    const [animateIn,setAnimateIn]=useState(false);
    const [hideTop,setHideTop]=useState(false);
    const [text,setText]=useState("");
    const {asset}=AssetLanding();
    const [imageLoaded,setImageLoaded]=useState(false);
    const [animateInDescription,setAnimateInDescription]=useState(false);
    const [animateInButton,setAnimateInButton]=useState(false);
    const [animateInImage,setAnimateInImage]=useState(false);

   useEffect(()=>{
       if(clickedButton != ""){
        console.log(asset);
         setAnimateOut(true);
        
         
      
        
       }
   },[clickedButton]);

   useEffect(()=>{
        if(imageLoaded){
            setTimeout(()=>{
                setAnimateInImage(true);
                setTimeout(()=>{
                    setAnimateInDescription(true);
                    setTimeout(()=>{
                        setAnimateInButton(true);
                    },1500);
                    
                },1500);
            },1500);
           
             
        }
   },[imageLoaded]);
   

   useEffect(()=>{
 if(animateOut && asset.length > 0){

    setTimeout(()=>{
         
            const texts=asset.find((item)=> item.uniqueID == clickedButton);
            if(texts){
               setText(texts.text);
               
            }
            else{
               console.log("no text");
            }
        setAnimateOut(false);
        setAnimateIn(true);
        setHideTop(true);
    },900);
    
 }
   },[animateOut]);
   useEffect(()=>{
    if(animateIn){
       setTimeout(()=>{
           setAnimateIn(false);
       },1000);
       
    }
      },[animateIn]);

    return (
        <div className={` ${imageLoaded ? "animate-fadeIn":"opacity-0"} w-full min-h-screen bg-gradient-to-b from-blue-400 to-gray-300 relative`} >
                    <img onLoad={()=>{
                        setImageLoaded(true);
                    }} src="/public/rb_68784_11zon.jpg" className={` ${animateInImage ? "animate-slideLeft":"opacity-0"} w-full  absolute bottom-10`} alt="" />
                    <div className={`w-1/2 absolute left-0 h-full flex flex-col justify-center items-end pr-10 ${animateInButton ? "animate-fadeIn":"opacity-0"} `} >
                    <button className="px-6 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 via-teal-500 to-indigo-500 
    transform transition duration-300 ease-in-out 
    hover:scale-105 hover:from-blue-400 hover:via-teal-400 hover:to-indigo-400 
    active:scale-95">
        <span className='tracking-wide' >JOIN US</span>
      
    </button>
                            
                    </div>
                    <div className={` ${animateInDescription ? "animate-fadeIn":"opacity-0"} w-full overflow-x-hidden h-1/2 absolute z-20 py-10 px-4 flex flex-col justify-start items-center gap-y-4`}>
    {/* Text Section */}
    <div className="w-full min-h-1/2 absolute bottom-40 bg-gradient-to-r from-blue-600 via-gray-500 to-indigo-600 px-4 py-2 rounded-lg shadow-lg text-center">
    <p className={` ${clickedButton == "" ? "animate-fadeIn":""} ${hideTop ? "hidden":""} text-white text-lg font-semibold`}>
        Prepare for success with <span className="text-green-300 text-3xl font-bold">70if E-Learn</span>, the ultimate e-learning platform designed to help students excel in university entrance exams.
    </p>
    <p className={` ${animateOut ? "animate-fadeOut":""} ${animateIn ? "animate-fadeIn":""} ${clickedButton == "" ? "hidden":""} text-white text-lg font-semibold`}>
         {text}
    </p>
</div>
    
    {/* Button Group */}
    <div className="w-full flex justify-center items-center gap-2 p-2 absolute bottom-10 ">
    <div className="flex flex-row w-full justify-between items-center flex-wrap">
  {/* Button 1 */}
  <button
    onClick={() => {
      setAnimateOut(clickedButton);
      setClickedButton("quiz");
    }}
    className="px-4 py-2 basis-1/2 bg-teal-500 text-white font-medium rounded-lg shadow-sm transform transition-all duration-200 ease-in-out hover:bg-teal-400 hover:scale-105 active:scale-95 active:bg-teal-600 active:text-gray-100">
    QUIZ
  </button>
  {/* Button 2 */}
  <button
    onClick={() => {
      setAnimateOut(clickedButton);
      setClickedButton("video");
    }}
    className={` ${clickedButton == "video" ? "active:scale-95 active:bg-teal-600 active:text-gray-100":""} px-4 py-2 basis-1/2 bg-teal-500 text-white font-medium rounded-lg shadow-sm transform transition-all duration-400 ease-in-out hover:bg-teal-400 hover:scale-105 `}>
    Video Tutor
  </button>
  {/* Button 3 */}
  <button
    onClick={() => {
      setAnimateOut(clickedButton);
      setClickedButton("notes");
    }}
    className="px-4 py-2 basis-1/2 bg-teal-500 text-white font-medium rounded-lg shadow-sm transform transition-all duration-200 ease-in-out hover:bg-teal-400 hover:scale-105 active:scale-95 active:bg-teal-800 active:text-gray-100">
    Notes
  </button>
  {/* Button 4 */}
  <button
    onClick={() => {
      setAnimateOut(clickedButton);
      setClickedButton("offline");
    }}
    className="px-4 py-2 basis-1/2 bg-teal-500 text-white font-medium rounded-lg shadow-sm transform transition-all duration-200 ease-in-out hover:bg-teal-400 hover:scale-105 active:scale-95 active:bg-teal-600 active:text-gray-100">
    Offline
  </button>
</div>

</div>

</div>

            </div>
    );
};

export default  LandingPage;