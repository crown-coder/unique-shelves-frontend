import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Signup, Login, MentorDashboard } from './pages/index'

import MyCourses from './components/pages/mentor/MyCourses'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/mentor-dashboard/*' element={<MentorDashboard />} />
        <Route path="/mentor/courses" element={<MyCourses />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
