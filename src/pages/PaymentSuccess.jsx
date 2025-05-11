import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <CheckCircle className="text-blue-400 w-16 h-16 mb-4" />
            <h1 className="text-3xl font-bold text-blue-400 mb-2">Payment Successful!</h1>
            <p className="text-gray-700 text-center mb-6">
                Thank you for your purchase. Your payment was received successfully.
            </p>
            <Link
                to="/my-courses"
                className="px-6 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition"
            >
                Go to My Courses
            </Link>
        </div>
    );
};

export default PaymentSuccess;
