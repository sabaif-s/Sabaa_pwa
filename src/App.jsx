import React from 'react'
import {useState} from 'react'
 function App() {
  const [count, setCount] = useState(0)

  return (
  
     <div className='w-full h-screen bg-gradient-to-t from-cyan-700 to-sky-300 flex justify-center items-center' >
               <div className='w-3/4 h-3/4 relative bg-red-100' >
                        <div className='w-full rounded-full h-28 bottom-0 bg-[#C1E8FF] absolute z-50' >
                        </div>
                        <div className='w-full rounded-full h-28 bottom-0 bg-[#7DA] absolute z-50' >
                        </div>
               </div>
     </div>
    
  )
}

export default App
