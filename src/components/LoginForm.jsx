import { useState } from 'react';
import Socials from "./Socials";
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await loginUser(formData);
            const { token, user } = res.data;

            // Store all user data in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                // Add any other user fields you need
            }));

            toast.success('Login successful!');

            // Redirect based on role
            switch (user.role.toLowerCase()) {
                case 'mentor':
                    navigate('/mentor-dashboard');
                    break;
                case 'admin':
                    navigate('/admin-dashboard');
                    break;
                default:
                    navigate('/');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                err.response?.data?.msg ||
                'Login failed. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-[70%] max-lg:w-full">
            <h1 className="font-normal text-3xl mb-1 text-blue-950">Hey, How are you</h1>
            <p className="mb-4">Lets Log you in 🤝</p>

            {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-light">Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg border border-gray-400"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm font-light">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full p-2 rounded-lg border border-gray-400"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <button
                        type='submit'
                        disabled={isLoading}
                        className={`w-full p-2 rounded-full bg-blue-400 text-white font-normal cursor-pointer hover:bg-blue-500 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>

            <p className="text-center mt-2 text-gray-600">
                Don't have an account? <Link to="/signup" className="text-blue-400 hover:text-blue-600">Sign up</Link>
            </p>

            <Socials />
        </div>
    );
};

export default LoginForm;