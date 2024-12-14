import React from 'react';

const  QuizQuestions = () => {
    const arr = Array.from({ length: 32 }, (_, i) => "SABAIF");
    const choices=['a','b','c','d'];
    const optionsChoose=["1 CAPITAL","2 CAPITAL","3 CAPITAL","4 CAPITAL"]
    const optionsArray=Array.from({length:4}, (_,i) => {
        return {
            choice:choices[i],
            option:optionsChoose[i]
        }
       
    } )
console.log(arr);

    return (
        <div className='w-full h-screen flex justify-center items-center px-12 bg-opacity-100 bg-gradient-to-bl from-pink-500 via-purple-500 to-yellow-500'
         >
            <div className='w-full h-full overflow-hidden absolute flex items-start justify-start flex-wrap top-0 z-0 left-0' >
                {
                    arr.map((item)=> (
                        <div className='basis-1/4 h-20    -rotate-45'>
                        <span className='text-white opacity-60' >{item}</span>
                     </div>
                    ))
                }
                     
                      
            </div>
             <div className='w-full relative z-20 overflow-x-hidden flex flex-col' >
                <div className='w-full bg-black p-2 text-white rounded-t-twelve flex justify-center items-center'>
                    <span className='w-full text-center word-break tracking-wider font-semibold text-xl' >
                        How Many Officials Capitals Does South Africa Have
                    </span>
                </div>
                <div className='w-full bg-white p-6 rounded-b-extraLarge flex justify-center items-center flex-col gap-y-4' >
                      {
                        optionsArray.map((item)=>(
                            <div className='w-full flex rounded-full items-center justify-start gap-x-4 px-2 py-4 border-2 border-gray-400' >
                         <div className='w-10 h-10 flex justify-center items-center  rounded-full border-gray-400 border-2 flex justify-center' >
                           <span className='text-yellow-600 text-3xl font-bold' > {item.choice}  </span>
                         </div>
                         <div className='flex justify-center items-center' >
                         <span
    class="cursor-pointer word-break w-full text-center text-gray-700 text-lg font-semibold  px-4 border border-gray-300 rounded-md hover:bg-blue-500 hover:text-white transition"
  >
     {item.option}
  </span>
                         </div>
                    </div>
                        ))
                      }
                   
             </div>
             <div className='w-full p-4  flex justify-center items-center' >
             <button className='w-1/2 bg-blue-300 h-10 flex justify-start pl-4 items-center shadow-lg shadow-black hover:shadow-xl hover:shadow-gray-800 active:shadow-md active:shadow-gray-900 transition'>
  <span className='text-white text-2xl'>NEXT</span>
</button>
                 <div className='w-16 h-10 bg-blue-700' >
                   <img src="next.png" className='w-full h-full animate-slideNext' alt="" />
                 </div>
             </div>
             </div>
             
        </div>
    );
};

export default  QuizQuestions;