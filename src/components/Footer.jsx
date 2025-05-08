import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">UniqueShelves</h3>
                        <p className="text-gray-400">
                            Empowering learners and educators worldwide with quality education since 2015.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaFacebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaLinkedin size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaYoutube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Courses</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Instructors</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">FAQs</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Community</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Feedback</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0 text-gray-400" />
                                <span className="text-gray-400">123 Alhajin Yara Plaza, Gombe.</span>
                            </li>
                            <li className="flex items-center">
                                <FaPhone className="mr-3 text-gray-400" />
                                <span className="text-gray-400">+234 7025654751</span>
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="mr-3 text-gray-400" />
                                <span className="text-gray-400">support@UniqueShelves.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="mb-12 border-t border-gray-800 pt-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <h4 className="text-xl font-semibold text-white mb-4">Subscribe to Our Newsletter</h4>
                        <p className="text-gray-400 mb-6">
                            Get the latest course updates, learning tips, and exclusive offers straight to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-grow px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            />
                            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8">
                    <div className="text-gray-500 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} UniqueShelves. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition">Terms of Service</a>
                        <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition">Cookie Policy</a>
                        <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;