import React from 'react';
import { useNavigate } from 'react-router-dom';
const BackButton = () => {
    const Navigate=useNavigate();
    return (
        <div className='w-full p-4 flex justify-center items-center' >
        <button 
         className='px-16 h-12 bg-gradient-to-r hover:bg-gradient-to-l from-blue-500 via-blue-500 to-pink-300 rounded-full'
        onClick={()=>{
          Navigate(-1);
        }} >
           <span className='tracking-widest text-white' >
              BACK
           </span>
        </button>
</div>
    );
};

export default BackButton;