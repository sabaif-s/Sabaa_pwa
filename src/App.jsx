import React from 'react'
import {useState} from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import HomePageELearn from './components/HomePageElearn'
import VideoTutor from './components/VideoTutor'
import ContentGrade from './components/ContentGrades'
import QuizQuestions from './components/quizes/QuizQuestions'
 function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePageELearn/> } >
        </Route>
        <Route path='/videoTutor' element={<VideoTutor/> } >
        </Route>
        <Route path='/content' element={<ContentGrade/> } >
        </Route>
        <Route path='/quiz' element={<QuizQuestions/> } >
        </Route>
      </Routes>
    
    </Router>
    
  )
}

export default App
