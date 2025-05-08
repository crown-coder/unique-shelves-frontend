import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { IoBookSharp } from "react-icons/io5";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                {/* Logo */}
                <Link to="/" className="text-2xl text-blue-950 flex items-center gap-2">
                    <IoBookSharp />
                    <span className='font-light'>Unique<span className='font-semibold'>Shelves</span></span>
                </Link>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex space-x-6">
                    <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
                    <Link to="/courses" className="text-gray-700 hover:text-blue-600 font-medium">Courses</Link>
                    <Link to="/mentors" className="text-gray-700 hover:text-blue-600 font-medium">Mentors</Link>
                    <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
                </nav>

                {/* Desktop Buttons */}
                <div className="hidden md:flex space-x-3">
                    <Link
                        to="/login"
                        className="text-sm px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Menu Icon */}
                <button onClick={toggleMenu} className="md:hidden text-2xl text-gray-700">
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
                    <nav className="flex flex-col space-y-3 p-4">
                        <Link to="/" onClick={closeMenu} className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
                        <Link to="/courses" onClick={closeMenu} className="text-gray-700 hover:text-blue-600 font-medium">Courses</Link>
                        <Link to="/mentors" onClick={closeMenu} className="text-gray-700 hover:text-blue-600 font-medium">Mentors</Link>
                        <Link to="/about" onClick={closeMenu} className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
                        <hr className="my-2" />
                        <Link to="/login" onClick={closeMenu} className="text-sm text-blue-600 border border-blue-600 px-4 py-2 rounded-lg text-center hover:bg-blue-50">
                            Login
                        </Link>
                        <Link to="/register" onClick={closeMenu} className="text-sm bg-blue-400 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-500">
                            Sign Up
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default NavBar;
