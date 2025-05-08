import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { CiMenuFries } from "react-icons/ci";
import { Routes, Route } from 'react-router-dom';
import { Dashboard, MyCourses, Blogs, Products, Profile, CourseDetails } from '../components/pages/mentor/index';

const MentorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="flex gap-2 min-h-screen bg-gray-100 p-2">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 overflow-auto">
        {/* Mobile header */}
        <header className="bg-white shadow-sm p-4 flex items-center rounded-xl">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 mr-4 rounded-md hover:bg-gray-100"
          >
            <CiMenuFries size={24} className="md:hidden text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/my-courses' element={<MyCourses />} />
            <Route path='/course/:id' element={<CourseDetails />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/products' element={<Products />} />
            <Route path='/profile' element={<Profile />} />
            {/* Add other routes here */}
          </Routes>
        </main>
      </div>
    </section>
  );
};

export default MentorDashboard;