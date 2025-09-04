import React, { useState } from "react";
import { FaMoneyBillWave, FaClock, FaWallet, FaHistory, FaPlusCircle, FaMoneyCheckAlt, FaInfoCircle } from "react-icons/fa";
import { CiBank } from "react-icons/ci";

const Earnings = () => {
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);

    const [accountDetails, setAccountDetails] = useState({
        bankName: "",
        accountNumber: "",
        accountName: "",
    });

    const [withdrawal, setWithdrawal] = useState({
        amount: "",
    });

    // Sample data
    const earningsData = {
        totalEarnings: 150000,
        pendingWithdrawals: 25000,
        availableBalance: 125000
    };

    const withdrawalHistory = [
        { id: 1, date: "2025-08-15", amount: 50000, status: "Completed" },
        { id: 2, date: "2025-08-10", amount: 25000, status: "Pending" },
        { id: 3, date: "2025-08-05", amount: 30000, status: "Completed" },
        { id: 4, date: "2025-07-28", amount: 45000, status: "Completed" }
    ];

    const formatCurrency = (amount) => {
        return `₦${amount.toLocaleString()}`;
    };

    return (
        <div className="p-6 bg-white min-h-screen my-2 rounded-lg">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Earnings Dashboard</h1>
                <p className="text-gray-500">Track your earnings and manage withdrawals</p>
            </div>

            {/* Earnings Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    icon={<FaMoneyBillWave className="text-green-600" />}
                    title="Total Earnings"
                    value={formatCurrency(earningsData.totalEarnings)}
                    change="+15% from last month"
                />

                <StatCard
                    icon={<FaClock className="text-yellow-600" />}
                    title="Pending Withdrawals"
                    value={formatCurrency(earningsData.pendingWithdrawals)}
                    change="+15% from last month"
                />

                <StatCard
                    icon={<FaWallet className="text-blue-500" />}
                    title="Available Balance"
                    value={formatCurrency(earningsData.availableBalance)}
                    change="Ready to withdraw"
                />

            </div>

            {/* Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => setIsAccountModalOpen(true)}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 font-medium"
                    >
                        <CiBank size={16} />
                        {accountDetails.bankName ? "Update Account" : "Add Bank Account"}
                    </button>
                    <button
                        onClick={() => setIsWithdrawalModalOpen(true)}
                        disabled={earningsData.availableBalance <= 0}
                        className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 font-medium ${earningsData.availableBalance > 0
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        <FaMoneyCheckAlt size={16} />
                        Initiate Withdrawal
                    </button>
                </div>

                {!accountDetails.bankName && (
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                        <FaInfoCircle className="text-yellow-600 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-yellow-800">Bank account required</p>
                            <p className="text-xs text-yellow-700">Please add your bank account details to initiate withdrawals.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Withdrawal History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <FaHistory className="text-gray-400" />
                            Withdrawal History
                        </h2>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            View All →
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {withdrawalHistory.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-sm text-gray-900">{item.date}</td>
                                    <td className="p-4 text-sm font-medium text-gray-900">{formatCurrency(item.amount)}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === "Completed"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">REF-{item.id.toString().padStart(6, '0')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {withdrawalHistory.length === 0 && (
                    <div className="text-center py-12">
                        <FaHistory className="text-gray-300 text-3xl mx-auto mb-3" />
                        <p className="text-gray-500">No withdrawal history found</p>
                    </div>
                )}
            </div>

            {/* Account Modal */}
            {isAccountModalOpen && (
                <div className="fixed inset-0 bg-black/20 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800">Bank Account Details</h2>
                            <p className="text-sm text-gray-500 mt-1">Add your bank account for withdrawals</p>
                        </div>

                        <form className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                                <select
                                    value={accountDetails.bankName}
                                    onChange={(e) => setAccountDetails({ ...accountDetails, bankName: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                >
                                    <option value="">Select Bank</option>
                                    <option value="GTBank">GTBank</option>
                                    <option value="First Bank">First Bank</option>
                                    <option value="Zenith Bank">Zenith Bank</option>
                                    <option value="Access Bank">Access Bank</option>
                                    <option value="UBA">United Bank for Africa (UBA)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter account number"
                                    value={accountDetails.accountNumber}
                                    onChange={(e) => setAccountDetails({ ...accountDetails, accountNumber: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    maxLength="10"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                                <input
                                    type="text"
                                    placeholder="Account holder name"
                                    value={accountDetails.accountName}
                                    onChange={(e) => setAccountDetails({ ...accountDetails, accountName: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    readOnly={accountDetails.accountNumber.length === 10}
                                />
                                {accountDetails.accountNumber.length === 10 && (
                                    <p className="text-xs text-green-600 mt-1">Account name will be verified automatically</p>
                                )}
                            </div>
                        </form>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={() => setIsAccountModalOpen(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    console.log("Saved account:", accountDetails);
                                    setIsAccountModalOpen(false);
                                }}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                disabled={!accountDetails.bankName || !accountDetails.accountNumber}
                            >
                                Save Account
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Withdrawal Modal */}
            {isWithdrawalModalOpen && (
                <div className="fixed inset-0 bg-black/20 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800">Initiate Withdrawal</h2>
                            <p className="text-sm text-gray-500 mt-1">Available balance: {formatCurrency(earningsData.availableBalance)}</p>
                        </div>

                        <form className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Withdraw (₦)</label>
                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    value={withdrawal.amount}
                                    onChange={(e) => setWithdrawal({ ...withdrawal, amount: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    max={earningsData.availableBalance}
                                    min="1000"
                                />
                                <p className="text-xs text-gray-500 mt-1">Minimum withdrawal: ₦1,000</p>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h3 className="text-sm font-medium text-blue-800 mb-2">Bank Account</h3>
                                {accountDetails.bankName ? (
                                    <div>
                                        <p className="text-sm text-blue-700">{accountDetails.bankName}</p>
                                        <p className="text-sm text-blue-700">•••• {accountDetails.accountNumber.slice(-4)}</p>
                                        <p className="text-sm text-blue-700">{accountDetails.accountName}</p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-blue-700">No bank account added</p>
                                )}
                            </div>
                        </form>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={() => setIsWithdrawalModalOpen(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    console.log("Withdrawal initiated:", withdrawal.amount);
                                    setIsWithdrawalModalOpen(false);
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                disabled={!withdrawal.amount || withdrawal.amount < 1000 || withdrawal.amount > earningsData.availableBalance}
                            >
                                Confirm Withdrawal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

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

export default Earnings;