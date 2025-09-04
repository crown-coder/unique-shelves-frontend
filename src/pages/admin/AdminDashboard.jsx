import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { CiMenuFries } from "react-icons/ci";
import { Routes, Route } from 'react-router-dom';
import { Dashboard, UserManagement, Courses, Blogs, Products, Analytics, Profile } from '../../components/pages/admin/index';

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <section className="flex gap-2 min-h-screen bg-gray-100 p-2">
            <AdminSidebar
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
                    <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
                </header>

                {/* Main content */}
                <main className="max-w-7xl mx-auto">
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/user-management' element={<UserManagement />} />
                        <Route path='/all-courses' element={<Courses />} />
                        <Route path='/all-blogs' element={<Blogs />} />
                        <Route path='/all-products' element={<Products />} />
                        <Route path='/analytics-reports' element={<Analytics />} />
                        <Route path='/profile-security' element={<Profile />} />
                        {/* Add other routes here */}
                    </Routes>
                </main>
            </div>
        </section>
    )
}

export default AdminDashboard
