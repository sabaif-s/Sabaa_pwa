import React from 'react';

const ContentGrade = () => {
  return (
    <div className="w-full px-4 py-4 min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-400 via-yellow-400 to-indigo-700">
      {/* Header */}
      <div className="w-full flex justify-center items-center p-6 bg-white text-gray-700 shadow-lg rounded-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          CONTENT
        </h1>
      </div>

      {/* Content */}
      <div className="w-full flex flex-col items-center gap-y-6 h-auto p-6 animate-fadeIn">
        {/* Grade 9 */}
        <div className="w-2/3 cursor-pointer flex justify-center items-center rounded-full h-64 bg-white p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <img
            src="/grade 9.png"
            className="w-full h-full rounded-lg transform transition duration-300 hover:scale-110"
            alt="Grade 9"
          />
        </div>
        {/* Grade 10 */}
        <div className="w-2/3 cursor-pointer flex justify-center items-center rounded-full h-64 bg-white p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <img
            src="/grade 10.png"
            className="w-full h-full rounded-lg transform transition duration-300 hover:scale-110"
            alt="Grade 10"
          />
        </div>
        {/* Grade 11 */}
        <div className="w-2/3 cursor-pointer flex justify-center items-center rounded-full h-64 bg-blue-600 p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <img
            src="/Grade-11.jpg"
            className="w-full h-full rounded-full transform transition duration-300 hover:scale-110"
            alt="Grade 11"
          />
        </div>
        {/* Grade 12 */}
        <div className="w-2/3 cursor-pointer flex justify-center items-center rounded-full h-64 bg-red-500 p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <img
            src="/grade12.jpg"
            className="w-full h-full rounded-full transform transition duration-300 hover:scale-110"
            alt="Grade 12"
          />
        </div>
      </div>
    </div>
  );
};

export default ContentGrade;
