import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScreenSize from "../hooks/ScreenSize";

const HomePageELearn = () => {
  const { largeMobile } = ScreenSize();
  const [height, setHeight] = useState(0);
  const [slideDown, setSlideDown] = useState(0);
  const [animateInDivStart, setAnimateInDivStart] = useState(false);
  const [animateDiv, setAnimateDiv] = useState(false);
  const [stopAnimate,setStopAnimate]=useState(false);

  useEffect(() => {
    setHeight(largeMobile ? "620px" : "500px");
  }, [largeMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDown((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (slideDown === 4) {
      setAnimateInDivStart(true);
    }
  }, [slideDown]);
  useEffect(()=>{
         setTimeout(()=>{
                   setStopAnimate(true);
         },20000);
  },[animateInDivStart]);

  useEffect(() => {
    let interval;
    if (animateInDivStart) {
      const timeout = setTimeout(() => {
        interval = setInterval(() => {
          setAnimateDiv((prev) => prev + 1);
        }, 2000);
      }, 500);

      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
    return () => clearInterval(interval);
  }, [animateInDivStart]);

  return (
    <div className="w-full h-screen lg:px-60 bg-gradient-to-b from-blue-900 via-sky-600 to-sky-300 flex justify-center items-center">
      <div
        className="w-11/12 lg:w-3/4 bg-white rounded-xl shadow-lg overflow-hidden relative"
        style={{ height }}
      >
        {/* Lesson Section */}
        <div
          className={`transition-all transform ${
            slideDown < 1 ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
          } absolute w-full flex justify-center py-4 bottom-0 z-50`}
        >
          <div
            className={`w-2/3 h-24 lg:h-40 flex justify-center items-center bg-gradient-to-r from-blue-300 to-blue-500 text-white text-xl font-bold rounded-lg shadow-md ${
              animateDiv > 1 && !stopAnimate ? "animate-pulse" : ""
            }`}
          >
            Interactive Lessons
          </div>
        </div>

        {/* Video Tutorials */}
        <Link to="/videoTutor">
          <div
            className={`transition-all transform ${
              slideDown < 2 ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
            } absolute w-full flex justify-center py-4 bottom-20 lg:bottom-28 z-40`}
          >
            <div
              className={`w-2/3 h-24 lg:h-40 flex justify-center items-center bg-gradient-to-r from-indigo-400 to-indigo-600 text-white text-xl font-bold rounded-lg shadow-md ${
                animateDiv > 2 && !stopAnimate ? "animate-pulse" : ""
              }`}
            >
              Video Tutorials
            </div>
          </div>
        </Link>

        {/* Quizzes Section */}
        <Link to="/quiz">
       
        <div
          className={`transition-all transform ${
            slideDown < 3 ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
          } absolute w-full flex justify-center py-4 bottom-40 lg:bottom-56 z-30`}
        >
          <div
            className={`w-2/3 h-24 lg:h-40 flex justify-center items-center bg-gradient-to-r from-purple-400 to-purple-600 text-white text-xl font-bold rounded-lg shadow-md ${
              animateDiv > 3 && !stopAnimate ? "animate-pulse" : ""
            }`}
          >
            Quizzes
          </div>
        </div>
        </Link>

        {/* Downloadable PDFs */}
        <Link to="/pdf" >
       
        <div
         
          className={`transition-all transform ${
            slideDown < 4 ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
          } absolute w-full flex justify-center py-4 bottom-64 lg:bottom-96 z-20`}
        >
          <div
            className={`w-2/3 h-24 lg:h-40 flex justify-center items-center bg-gradient-to-r from-green-400 to-green-600 text-white text-xl font-bold rounded-lg shadow-md ${
              animateDiv > 4 && !stopAnimate ? "animate-pulse" : ""
            }`}
          >
            Downloadable PDFs
          </div>
        </div>
        </Link>

        {/* Footer Decoration */}
        <div
          className={`transition-all transform ${
            slideDown < 5 ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
          } absolute w-full h-24 lg:h-40 bottom-72 lg:bottom-80 bg-gray-400 rounded-full z-10`}
        ></div>

        <div
          className={`transition-all transform ${
            slideDown < 6 ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
          } absolute w-full h-24 lg:h-40 bottom-80 lg:bottom-96 bg-green-300 rounded-full z-0`}
        ></div>
      </div>
    </div>
  );
};

export default HomePageELearn;
