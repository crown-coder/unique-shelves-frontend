import { useState } from 'react'
import Socials from "./Socials"
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'

const LoginForm = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await loginUser(formData)
            const { token, user } = res.data

            // Save token and role to localStorage
            localStorage.setItem('token', token)
            localStorage.setItem('role', user.role)

            // Redirect based on role
            if (user.role === 'mentor') {
                navigate('/mentor-dashboard')
            } else if (user.role === 'admin') {
                navigate('/admin-dashboard')
            } else {
                navigate('/student-dashboard')
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed')
        }
    }


    return (
        <div className="w-[70%] max-lg:w-full">
            <h1 className="font-normal text-3xl mb-1 text-blue-950">Hey, How are you</h1>
            <p className="mb-4">Lets Log you in 🤝</p>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-light">Email </label>
                    <input
                        name="email"
                        type="email"
                        placeholder="email"
                        alue={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 rounded-l-lg border border-gray-400"
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
                        placeholder="password"
                        className="w-full p-2 rounded-l-lg border border-gray-400"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <button
                        type='submit'
                        className="w-full p-2 rounded-full bg-blue-400 text-white font-normal cursor-pointer"
                    >
                        Login
                    </button>
                </div>
            </form>
            <p className="text-center mt-2 text-gray-600">Don't have an account <Link to="/signup" className="text-blue-400">Signup</Link></p>

            <Socials />
        </div>
    )
}

export default LoginForm
