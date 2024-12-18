import React,{useEffect,useState} from 'react';

const  AssetLanding = () => {
    const [asset,setAsset]=useState([]);
    const assets=[
        {
            uniqueID:"quiz",
            text:"Test your knowledge and track your progress with hundreds of practice questions and mock exams designed to mirror real exam formats."
        },
        {
            uniqueID:"offline",
            text:"Study anytime, anywhere with our offline capabilities—perfect for when you’re on the go and need to keep learning."
        },
        {
            uniqueID:"notes",
            text:"Access detailed study notes for each subject, covering key concepts and providing concise summaries to help you remember crucial information."
        },
        {
            uniqueID:"video",
            text:"Watch clear, concise instructional videos to break down complex topics, featuring expert teachers who know what it takes to pass the exam."
        }
      ]
    useEffect(()=>{
             setAsset(assets);
    },[]);


    return {asset}
   


};

export default  AssetLanding;