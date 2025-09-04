import { useEffect, useState } from "react";
import { PiUsersThree } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";
import { RiBloggerLine } from "react-icons/ri";
import { CiShoppingCart } from "react-icons/ci";
import { MdAttachMoney } from "react-icons/md";

const Dashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        courses: 0,
        blogs: 0,
        products: 0,
        revenue: 0,
    });

    useEffect(() => {
        // TODO: Replace this with actual API call to fetch stats
        setStats({
            users: 245,
            courses: 58,
            blogs: 34,
            products: 12,
            revenue: 15420,
        });
    }, []);

    return (
        <div className="h-screen overflow-y-scroll bg-white p-4 md:p-8 my-2 rounded-lg">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-normal text-gray-800 mb-6">Admin Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 mb-8">
                    <StatCard
                        icon={<PiUsersThree className="text-blue-500" />}
                        title="Total Users"
                        value={stats.users}
                        change="+2 this month"
                    />
                    <StatCard
                        icon={<IoBookOutline className="text-blue-500" />}
                        title="Courses"
                        value={stats.courses}
                        change="+2 this month"
                    />
                    <StatCard
                        icon={<RiBloggerLine className="text-blue-500" />}
                        title="Blogs"
                        value={stats.blogs}
                        change="+2 this month"
                    />
                    <StatCard
                        icon={<CiShoppingCart className="text-blue-500" />}
                        title="Products"
                        value={stats.products}
                        change="+2 this month"
                    />
                    <StatCard
                        icon={<MdAttachMoney className="text-blue-500" />}
                        title="Revenue"
                        value={stats.revenue}
                        change="+2 this month"
                    />
                </div>
                {/* Recent Activities */}
                <h1 className="text-xl md:text-3xl font-normal text-gray-800">Recent Activities</h1>
                <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent User Signups Card */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-semibold text-gray-800">Recent User Signups</h2>
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-full">
                                3 new users
                            </span>
                        </div>

                        <div className="space-y-4">
                            {[
                                { name: "John Doe", time: "2h ago" },
                                { name: "Jane Smith", time: "5h ago" },
                                { name: "Mike Johnson", time: "1d ago" }
                            ].map((user, index) => (
                                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-xs font-medium text-blue-600">
                                                {user.name.charAt(0)}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{user.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{user.time}</span>
                                </div>
                            ))}
                        </div>

                        <button className="mt-5 w-full text-center text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
                            View all users →
                        </button>
                    </div>

                    {/* Recent Transactions Card */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1.5 rounded-full">
                                $205 total
                            </span>
                        </div>

                        <div className="space-y-4">
                            {[
                                { description: "Course Purchase", amount: "+$120", type: "income" },
                                { description: "Product Sale", amount: "+$45", type: "income" },
                                { description: "Withdrawal", amount: "-$60", type: "expense" }
                            ].map((transaction, index) => (
                                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                                            }`}>
                                            <span className={`text-xs font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"
                                                }`}>
                                                {transaction.type === "income" ? "↑" : "↓"}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{transaction.description}</span>
                                    </div>
                                    <span className={`text-sm font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"
                                        }`}>
                                        {transaction.amount}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <button className="mt-5 w-full text-center text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
                            View all transactions →
                        </button>
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


export default Dashboard;
