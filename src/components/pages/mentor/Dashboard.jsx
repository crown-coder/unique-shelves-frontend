import React from 'react';
import { FiBook, FiUsers, FiDollarSign, FiTrendingUp, FiPieChart } from 'react-icons/fi';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const Dashboard = () => {
    // Sample data - replace with actual data from your API
    const stats = {
        totalCourses: 12,
        totalStudents: 345,
        totalBlogs: 24,
        totalRevenue: 12500,
        totalWithdrawn: 8500,
        availableBalance: 4000,
    };

    // Chart data
    const earningsData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Earnings',
                data: [1200, 1900, 1500, 2100, 2300, 2500],
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
            },
        ],
    };

    const courseDistributionData = {
        labels: ['Web Dev', 'Programming', 'Design', 'Business'],
        datasets: [
            {
                data: [5, 3, 2, 2],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                ],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="h-screen overflow-y-scroll bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-normal text-gray-800 mb-6">Dashboard Overview</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        icon={<FiBook className="text-blue-500" />}
                        title="Total Courses"
                        value={stats.totalCourses}
                        change="+2 this month"
                    />
                    <StatCard
                        icon={<FiUsers className="text-green-500" />}
                        title="Total Students"
                        value={stats.totalStudents}
                        change="+45 this month"
                    />
                    <StatCard
                        icon={<FiPieChart className="text-purple-500" />}
                        title="Total Blogs"
                        value={stats.totalBlogs}
                        change="+3 this month"
                    />
                    <StatCard
                        icon={<FiDollarSign className="text-yellow-500" />}
                        title="Available Balance"
                        value={`$${stats.availableBalance.toLocaleString()}`}
                        change="Last withdrawal 7 days ago"
                    />
                </div>

                {/* Revenue Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Earnings Overview</h2>
                            <select className="text-sm border border-gray-200 rounded-md px-2 py-1">
                                <option>Last 6 Months</option>
                                <option>This Year</option>
                                <option>All Time</option>
                            </select>
                        </div>
                        <div className="h-64">
                            <Bar
                                data={earningsData}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: { y: { beginAtZero: true } }
                                }}
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue Summary</h2>
                        <div className="space-y-4">
                            <RevenueItem
                                title="Total Revenue"
                                value={`$${stats.totalRevenue.toLocaleString()}`}
                                icon={<FiDollarSign className="text-blue-500" />}
                            />
                            <RevenueItem
                                title="Total Withdrawn"
                                value={`$${stats.totalWithdrawn.toLocaleString()}`}
                                icon={<FiTrendingUp className="text-green-500" />}
                            />
                            <RevenueItem
                                title="Available Balance"
                                value={`$${stats.availableBalance.toLocaleString()}`}
                                icon={<FiDollarSign className="text-purple-500" />}
                            />
                            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                                Withdraw Funds
                            </button>
                        </div>
                    </div>
                </div>

                {/* Course Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Course Distribution</h2>
                        <div className="h-64">
                            <Pie
                                data={courseDistributionData}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: { legend: { position: 'right' } }
                                }}
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
                        <div className="space-y-4">
                            <ActivityItem
                                title="New course published"
                                description="Advanced React Patterns"
                                time="2 hours ago"
                            />
                            <ActivityItem
                                title="New student enrolled"
                                description="John Doe in JavaScript Fundamentals"
                                time="5 hours ago"
                            />
                            <ActivityItem
                                title="Withdrawal processed"
                                description="$1,200 transferred to your account"
                                time="1 day ago"
                            />
                            <ActivityItem
                                title="New blog post published"
                                description="State Management in 2023"
                                time="2 days ago"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable Stat Card Component
const StatCard = ({ icon, title, value, change }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
            <div className="p-3 rounded-lg bg-gray-50">{icon}</div>
            <div className="text-right">
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-semibold">{value}</p>
            </div>
        </div>
        <p className="text-xs mt-2 text-gray-500">{change}</p>
    </div>
);

// Reusable Revenue Item Component
const RevenueItem = ({ icon, title, value }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center">
            <div className="p-2 rounded-md bg-white mr-3 shadow-sm">{icon}</div>
            <span className="text-sm font-medium">{title}</span>
        </div>
        <span className="font-semibold">{value}</span>
    </div>
);

// Reusable Activity Item Component
const ActivityItem = ({ title, description, time }) => (
    <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-medium text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{time}</span>
        </div>
    </div>
);

export default Dashboard;