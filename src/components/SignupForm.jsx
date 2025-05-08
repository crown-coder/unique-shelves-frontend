import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from '../services/authService'
import Socials from "./Socials"
import { Link } from 'react-router-dom'
const SignupForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Mentor'
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            return alert("Passwords do not match")
        }

        try {
            const data = {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: formData.role.toLowerCase()
            }

            const res = await registerUser(data);
            localStorage.setItem('token', res.data.token)
            navigate('/mentor-dashboard/')
        } catch (err) {
            alert(err.response?.data?.msg || "Signup failed")
        }
    }


    return (
        <div className="w-[70%] max-lg:w-full">
            <h1 className="font-normal text-3xl mb-1 text-blue-950">Hey, How are you</h1>
            <p className="mb-4">Lets sign you up 🤝</p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="fullName" className="text-sm font-light">Full name</label>
                    <input
                        name="fullName"
                        type="text"
                        placeholder="Full name"
                        className="w-full p-2 rounded-l-lg border border-gray-400"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-light">Email </label>
                    <input
                        name="email"
                        type="email"
                        placeholder="email"
                        className="w-full p-2 rounded-l-lg border border-gray-400"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm font-light">Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        className="w-full p-2 rounded-l-lg border border-gray-400"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="confirmPassword" className="text-sm font-light">Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="password"
                        className="w-full p-2 rounded-l-lg border border-gray-400"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="signup-as" className="text-sm font-light">Sign Up as</label>
                    <select
                        name="signup-as"
                        className="w-full p-2 rounded-l-lg border border-gray-400"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="Mentor">Mentor</option>
                        <option value="student" disabled>Student (Coming Soon)</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <button
                        type="submit"
                        className="w-full p-2 rounded-full bg-blue-400 text-white font-normal cursor-pointer"
                    >
                        Register
                    </button>
                </div>
            </form>
            <p className="text-center mt-2 text-gray-600">Already have an account <Link to="/login" className="text-blue-400">Login</Link></p>

            <Socials />
        </div>
    )
}

export default SignupForm
