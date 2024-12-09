import React from 'react';

const  AllVideosDownLoaded = ({onViewVideos}) => {
    return (
        <div style={{height:'calc(100vh - 240px)'}} className="flex flex-col items-center justify-center">
        <div className="p-6 rounded-lg shadow-md bg-gradient-to-b from-blue-300 to-blue-800 flex flex-col items-center justify-center">
           
          <p className="mt-4 text-white">
            All your videos have been successfully downloaded.
          </p>
          <button
            onClick={onViewVideos}
            className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            View Downloaded Videos
          </button>
        </div>
      </div>
    );
};

export default  AllVideosDownLoaded;