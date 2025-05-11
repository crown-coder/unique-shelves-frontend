import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { IoBookSharp } from "react-icons/io5";
import { FaUserCircle, FaChevronDown } from 'react-icons/fa';

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userString = localStorage.getItem('user');

        if (token && userString) {
            try {
                const user = JSON.parse(userString);
                setIsLoggedIn(true);
                setUserData(user);
            } catch (error) {
                console.error('Error parsing user data:', error);
                handleLogout(); // Clean up invalid data
            }
        }
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);
    const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserData(null);
        navigate('/');
        setUserMenuOpen(false);
        setMenuOpen(false);
    };

    // Close menus when clicking outside (optional enhancement)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userMenuOpen && !e.target.closest('.user-menu-container')) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [userMenuOpen]);

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
                    {isLoggedIn && userData?.role === 'student' && (
                        <Link to="/my-courses" className="text-gray-700 hover:text-blue-600 font-medium">My Courses</Link>
                    )}
                    <Link to="/mentors" className="text-gray-700 hover:text-blue-600 font-medium">Mentors</Link>
                    <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
                </nav>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center space-x-3">
                    {isLoggedIn ? (
                        <div className="relative user-menu-container">
                            <button
                                onClick={toggleUserMenu}
                                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
                                aria-label="User menu"
                            >
                                <FaUserCircle className="text-2xl" />
                                <span className="text-sm">{userData?.fullName || 'Account'}</span>
                                <FaChevronDown className={`text-xs transition-transform ${userMenuOpen ? 'transform rotate-180' : ''}`} />
                            </button>
                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    {userData?.role === 'student' && (
                                        <Link
                                            to="/my-courses"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            My Courses
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-red-600"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-sm px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-2xl text-gray-700"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
                    <nav className="flex flex-col space-y-3 p-4">
                        <Link to="/" onClick={closeMenu} className="text-gray-700 hover:text-blue-600 font-medium py-2">Home</Link>
                        <Link to="/courses" onClick={closeMenu} className="text-gray-700 hover:text-blue-600 font-medium py-2">Courses</Link>
                        {isLoggedIn && userData?.role === 'student' && (
                            <Link to="/my-courses" onClick={closeMenu} className="text-gray-700 hover:text-blue-600 font-medium py-2">My Courses</Link>
                        )}
                        <Link to="/mentors" onClick={closeMenu} className="text-gray-700 hover:text-blue-600 font-medium py-2">Mentors</Link>
                        <Link to="/about" onClick={closeMenu} className="text-gray-700 hover:text-blue-600 font-medium py-2">About</Link>
                        <hr className="my-2 border-gray-200" />

                        {isLoggedIn ? (
                            <>
                                <div className="flex items-center space-x-2 px-4 py-2">
                                    <FaUserCircle className="text-gray-500" />
                                    <span className="text-gray-700">{userData?.fullName || 'My Account'}</span>
                                </div>
                                <Link
                                    to="/profile"
                                    onClick={closeMenu}
                                    className="text-sm text-gray-700 px-4 py-2 rounded-lg hover:bg-blue-50"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm text-red-600 px-4 py-2 rounded-lg text-left hover:bg-red-50"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col space-y-3 pt-2">
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="text-sm text-blue-600 border border-blue-600 px-4 py-2 rounded-lg text-center hover:bg-blue-50"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={closeMenu}
                                    className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default NavBar;