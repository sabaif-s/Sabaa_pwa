
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from 'react';

const ScreenSize = () => {
  // Use state to store the media query results
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDesktopLarge, setIsDesktopLarge] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLargeMobile, setIsLargeMobile] = useState(false);
  const [smallHeightMobile, setSmallHeightMobile] = useState(false);
  const [smallWidthMobile,setSmallWidthMobile]=useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setIsDesktopLarge(window.innerWidth >= 1440);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth <= 1023);
      setIsMobile(window.innerWidth <= 767);
      setIsLargeMobile(window.innerHeight >= 700);
      setSmallHeightMobile(window.innerHeight <= 680);
      setSmallWidthMobile(window.innerWidth <= 400);
    };

    // Initial check
    handleResize();

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array to run only once on mount

  return { isDesktop, isDesktopLarge, isMobile, isTablet, isLargeMobile, smallHeightMobile ,smallWidthMobile};
};

export default ScreenSize;
