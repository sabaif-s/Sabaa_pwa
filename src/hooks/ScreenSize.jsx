import React from 'react';
import { useMedia } from 'react-use';

const ScreenSize = () => {
  
  const largeMobile=useMedia('(min-height:670px)');

   return {largeMobile}
};

export default ScreenSize;
