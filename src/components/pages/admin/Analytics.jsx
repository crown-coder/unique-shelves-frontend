import React from "react";
import { FaUsers, FaChalkboardTeacher, FaGraduationCap, FaBook, FaDollarSign, FaMoneyCheckAlt, FaHistory, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Analytics = () => {
    return (
        <div className="p-6 bg-white rounded-lg my-2 min-h-screen">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Analytics & Reports</h1>
                <p className="text-gray-500">Track platform performance and financial metrics</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Users</p>
                            <p className="text-2xl font-bold text-gray-800">1,234</p>
                            <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FaUsers className="text-blue-600 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Mentors</p>
                            <p className="text-2xl font-bold text-gray-800">87</p>
                            <p className="text-xs text-green-600 mt-1">+5% from last month</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <FaChalkboardTeacher className="text-green-600 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Students</p>
                            <p className="text-2xl font-bold text-gray-800">1,147</p>
                            <p className="text-xs text-green-600 mt-1">+15% from last month</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <FaGraduationCap className="text-purple-600 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Active Courses</p>
                            <p className="text-2xl font-bold text-gray-800">245</p>
                            <p className="text-xs text-green-600 mt-1">+8% from last month</p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                            <FaBook className="text-orange-600 text-xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Earnings Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Earnings Overview</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View Report →
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <FaDollarSign className="text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Revenue</p>
                                <p className="text-xl font-bold text-gray-800">$45,230</p>
                            </div>
                        </div>
                        <p className="text-xs text-green-600">+18% from last month</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FaMoneyCheckAlt className="text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Mentor Payouts</p>
                                <p className="text-xl font-bold text-gray-800">$30,100</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-600">65% of revenue</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <FaDollarSign className="text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Platform Earnings</p>
                                <p className="text-xl font-bold text-gray-800">$15,130</p>
                            </div>
                        </div>
                        <p className="text-xs text-green-600">35% of revenue</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Withdrawal Requests */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Withdrawal Requests</h2>
                        <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            3 pending
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="p-3 text-sm font-medium text-gray-900">John Doe</td>
                                    <td className="p-3 text-sm text-gray-900">$200</td>
                                    <td className="p-3 text-sm text-gray-500">Aug 20, 2025</td>
                                    <td className="p-3">
                                        <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                            Pending
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-2">
                                            <button className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors" title="Approve">
                                                <FaCheckCircle size={14} />
                                            </button>
                                            <button className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors" title="Reject">
                                                <FaTimesCircle size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="p-3 text-sm font-medium text-gray-900">Sarah Wilson</td>
                                    <td className="p-3 text-sm text-gray-900">$350</td>
                                    <td className="p-3 text-sm text-gray-500">Aug 19, 2025</td>
                                    <td className="p-3">
                                        <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                            Pending
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-2">
                                            <button className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors" title="Approve">
                                                <FaCheckCircle size={14} />
                                            </button>
                                            <button className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors" title="Reject">
                                                <FaTimesCircle size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Withdrawal History */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Withdrawal History</h2>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            View All →
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="p-3 text-sm font-medium text-gray-900">Jane Smith</td>
                                    <td className="p-3 text-sm text-gray-900">$150</td>
                                    <td className="p-3 text-sm text-gray-500">Aug 18, 2025</td>
                                    <td className="p-3">
                                        <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                            Approved
                                        </span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="p-3 text-sm font-medium text-gray-900">Michael Lee</td>
                                    <td className="p-3 text-sm text-gray-900">$100</td>
                                    <td className="p-3 text-sm text-gray-500">Aug 15, 2025</td>
                                    <td className="p-3">
                                        <span className="px-2.5 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                            Rejected
                                        </span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="p-3 text-sm font-medium text-gray-900">Alex Johnson</td>
                                    <td className="p-3 text-sm text-gray-900">$275</td>
                                    <td className="p-3 text-sm text-gray-500">Aug 12, 2025</td>
                                    <td className="p-3">
                                        <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                            Approved
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;