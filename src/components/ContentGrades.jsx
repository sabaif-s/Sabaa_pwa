import React from 'react';
import { Link } from 'react-router-dom';
import ScreenSize from '../hooks/ScreenSize';
import BackButton from './BackButton';

const ContentGrade = () => {
  const { isDesktop,isDesktopLarge,isTablet } = ScreenSize();
  return (
    <div className="w-full px-4 py-4 min-h-screen overflow-hidden bg-gradient-to-br from-blue-400 via-yellow-400 to-indigo-700">
      {/* Header */}
      <div className={` ${isDesktop ? "mb-24":""} w-full md:px-40 flex justify-center items-center p-6 bg-white text-gray-700 shadow-lg rounded-lg max-w-4xl mx-auto`}>
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          CONTENT
        </h1>
      </div>
      <div className='fixed top-12 right-8  z-50' >
                              <BackButton/>
          </div>

      {/* Content */}
      <Link to="/select">
        <div className={` ${isTablet ? "px-32 gap-2":""} ${isDesktop && !isDesktopLarge ? "px-40":""} ${isDesktopLarge ? "px-80":"p-6"} ${isDesktop ? "grid grid-cols-2 gap-6 justify-center" : "flex flex-col"} w-full items-center h-auto animate-fadeIn`}>
          {/* Grade 9 */}
          <div className="w-full cursor-pointer flex justify-center items-center rounded-full h-64 bg-white p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-4 border-gradient-to-r from-green-400 to-blue-500">
            <img
              src="/grade 9.png"
              className="w-full h-full rounded-lg transform transition duration-300 hover:scale-110 shadow-lg"
              alt="Grade 9"
            />
          </div>
          {/* Grade 10 */}
          <div className="w-full cursor-pointer flex justify-center items-center rounded-full h-64 bg-white p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-4 border-gradient-to-r from-purple-400 to-pink-500">
            <img
              src="/grade 10.png"
              className="w-full h-full rounded-lg transform transition duration-300 hover:scale-110 shadow-lg"
              alt="Grade 10"
            />
          </div>
          {/* Grade 11 */}
          <div className="w-full cursor-pointer flex justify-center items-center rounded-full h-64 bg-blue-600 p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-4 border-gradient-to-r from-yellow-400 to-red-500">
            <img
              src="/Grade-11.jpg"
              className="w-full h-full rounded-full transform transition duration-300 hover:scale-110 shadow-lg"
              alt="Grade 11"
            />
          </div>
          {/* Grade 12 */}
          <div className="w-full cursor-pointer flex justify-center items-center rounded-full h-64 bg-red-500 p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-4 border-gradient-to-r from-teal-400 to-indigo-500">
            <img
              src="/grade12.jpg"
              className="w-full h-full rounded-full transform transition duration-300 hover:scale-110 shadow-lg"
              alt="Grade 12"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ContentGrade;