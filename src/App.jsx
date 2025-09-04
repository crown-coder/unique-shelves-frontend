import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Signup, Login, MentorDashboard, Courses, Products, Blogs, BlogDetails, CourseDetails, Mentors, MyCoursesStudent, MyCoursesDetails, PaymentSuccess } from './pages/index'
import AdminDashboard from './pages/admin/AdminDashboard';

import MyCourses from './components/pages/mentor/MyCourses'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/products' element={<Products />} />
        <Route path='/courses/:id' element={<CourseDetails />} />
        <Route path='/my-courses' element={<MyCoursesStudent />} />
        <Route path='/my-courses/:id' element={<MyCoursesDetails />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blogs/:id' element={<BlogDetails />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/mentors' element={<Mentors />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/mentor-dashboard/*' element={<MentorDashboard />} />
        <Route path='/mentor-dashboard/*' element={<MentorDashboard />} />
        <Route path='/admin-dashboard/*' element={<AdminDashboard />} />
        <Route path="/mentor/courses" element={<MyCourses />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
