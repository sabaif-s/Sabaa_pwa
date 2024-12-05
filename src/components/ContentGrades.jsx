import React from 'react';
 
const  ContentGrade = () => {
    return (
        <div className='w-full p-x-4 py-4 min-h-screen overflow-x-hidden bg-gradient-to-r from-blue-600 to-blue-400 bg-opacity-50' >
            <div className="w-full flex justify-center items-center p-6 bg-white text-gray-700 shadow-lg rounded-lg max-w-4xl mx-auto">
  <h1 className="text-3xl font-semibold text-center text-gray-800">
    CONTENT
  </h1>
</div>
             
              <div className='w-full flex flex-col items-center gap-y-4 h-auto p-4' >
                      <div  className='w-2/3 cursor-pointer  flex justify-center items-center rounded-full h-64 bg-white p-4'>
                        <img src="/grade 9.png" className='w-full h-full rounded-lg' alt="" />
                      </div>
                      <div  className='w-2/3 cursor-pointer  flex justify-center items-center rounded-full h-64 bg-white p-4'>
                        <img src="/grade 10.png" className='w-full h-full rounded-lg' alt="" />
                      </div>
                      <div  className='w-2/3 cursor-pointer  flex justify-center items-center rounded-full h-64 bg-blue-600 p-4'>
                        <img src="/Grade-11.jpg" className='w-full h-full rounded-full' alt="" />
                      </div>
                      <div  className='w-2/3 cursor-pointer  flex justify-center items-center rounded-full h-64 bg-red-500 p-4'>
                        <img src="/grade12.jpg" className='w-full h-full rounded-full' alt="" />
                      </div>
              </div>
        </div>
    );
};

export default  ContentGrade;