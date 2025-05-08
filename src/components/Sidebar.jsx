import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { MdDashboard } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";
import { FaBloggerB } from "react-icons/fa";
import { RiAdvertisementFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();

    // Check if current route matches the link
    const isActive = (path) => location.pathname === path;

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/login';
    };

    return (
        <div className={`fixed rounded-2xl top-0 left-0 h-[calc(h-dvh-2rem)] max-lg:h-full bg-blue-950 text-white w-64 p-6 z-50 transform transition-all duration-300 ease-in-out shadow-xl ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}>
            <div className="flex justify-between items-center mb-8 md:hidden">
                <h2 className='font-light text-white text-xl'>Unique<span className='font-bold'>Shelves</span></h2>
                <button
                    onClick={toggleSidebar}
                    className="p-1 rounded-full hover:bg-indigo-700 transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            <div className='mb-5 text-center max-lg:hidden'>
                <h2 className='font-light text-white text-xl'>Unique<span className='font-bold'>Shelves</span></h2>
            </div>

            <nav className="flex flex-col gap-1 mt-10">
                <h2 className='px-4 text-gray-400 mb-2'>Menu</h2>
                {[
                    { path: "/mentor-dashboard/", name: "Dashboard", icon: MdDashboard },
                    { path: "/mentor-dashboard/my-courses", name: "My Courses", icon: IoBookSharp },
                    { path: "/mentor-dashboard/blogs", name: "Blog", icon: FaBloggerB },
                    { path: "/mentor-dashboard/products", name: "Advertise Products", icon: RiAdvertisementFill },
                    { path: "/mentor-dashboard/profile", name: "Profile", icon: FaUser },
                ].map((item) => (
                    <Link
                        to={item.path}
                        key={item.path}
                        className={`px-4 py-1 rounded-lg transition-all flex items-center gap-2 font-extralight
              ${isActive(item.path)
                                ? 'border-l-2 border-blue-400 bg-white/15 text-white font-medium shadow-md'
                                : 'hover:border-l-2 hover:border-blue-400 hover:bg-white/15 text-gray-300'}
            `}
                    >
                        {<item.icon />}
                        {item.name}
                    </Link>
                ))}
                <div className='px-4 mt-5'>
                    <button
                        onClick={logout}
                        className='flex gap-1 items-center text-red-400 cursor-pointer'
                    >
                        <IoMdLogOut />
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;