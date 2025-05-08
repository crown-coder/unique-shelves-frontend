import React from 'react';
import { FaChalkboardTeacher, FaUserGraduate, FaArrowRight } from 'react-icons/fa';

const CallToActionSection = () => {
    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Future?</h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Whether you want to learn new skills or share your expertise, we have the perfect platform for you.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Student CTA */}
                    <div className="bg-white rounded-xl p-8 shadow-sm transition duration-300 transform hover:-translate-y-2">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-blue-100 text-blue-600 rounded-full text-2xl">
                            <FaUserGraduate />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Start Learning Today</h3>
                        <p className="text-gray-600 mb-6 text-center">
                            Access 1000+ courses taught by industry experts and advance your career.
                        </p>
                        <ul className="space-y-2 mb-8 text-gray-700">
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Learn at your own pace
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Earn verifiable certificates
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Join a community of 500,000+ learners
                            </li>
                        </ul>
                        <button className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center transition duration-300">
                            Join as Student <FaArrowRight className="ml-2" />
                        </button>
                    </div>

                    {/* Mentor CTA */}
                    <div className="bg-white rounded-xl p-8 shadow-sm transition duration-300 transform hover:-translate-y-2">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-blue-100 text-blue-600 rounded-full text-2xl">
                            <FaChalkboardTeacher />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Share Your Knowledge</h3>
                        <p className="text-gray-600 mb-6 text-center">
                            Teach what you love and earn while making an impact.
                        </p>
                        <ul className="space-y-2 mb-8 text-gray-700">
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Reach thousands of eager students
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Flexible teaching schedule
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Earn competitive revenue share
                            </li>
                        </ul>
                        <button className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center transition duration-300">
                            Create a Course <FaArrowRight className="ml-2" />
                        </button>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center items-center mt-12 gap-6">
                    <span>Trusted by 500,000+ learners worldwide</span>
                    <span className="hidden sm:block">•</span>
                    <span>4.9/5 average instructor rating</span>
                    <span className="hidden sm:block">•</span>
                    <span>100+ Fortune 500 companies</span>
                </div>
            </div>
        </section>
    );
};

export default CallToActionSection;