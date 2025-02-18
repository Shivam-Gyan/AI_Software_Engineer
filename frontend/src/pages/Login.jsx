import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast'
import axios from "../config/axios.config";
import { useUser } from "../context/user.context";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {user,setUser}=useUser()


    const EmptyState = () => {
        setEmail("")
        setPassword("")
    }

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true)
        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        //  Add authentication logic here (API call)
        axios.post('user/login', {
            email, password
        }).then((res) => {
            setLoading(false)
            setUser(res.data)
            localStorage.setItem('token', JSON.stringify(res.data.token))
            toast.success(res.data.message);
            navigate('/')
            EmptyState()
        }).catch(error => {
            EmptyState()
            setLoading(false)
            if (error.response.data.errors) {
                toast.error(error.response.data.errors[0].msg)
            }
            else {
                toast.error(error.response.data.message)
            }
        })

    };

    return (
        <>
        {!user ? <div className="flex items-center justify-center min-h-[88vh] bg-gray-100">
            <div className="bg-white p-3 m-1 sm:m-0 sm:p-8 rounded-lg shadow-lg w-full max-w-md">

                <h2 className="text-2xl font-semibold text-gray-800 text-center">Login</h2>

                <form onSubmit={handleLogin} className="mt-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mt-4">
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-gray-800 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-500"
                    >
                        {loading ? <i className="fi fi-tr-loading animate-spin"></i> : "Login"}
                    </button>
                </form>

                {/* Create Account Link */}
                <p className="text-center text-gray-500 text-sm mt-4">
                    Don't have an account?
                    <Link to="/register" className="text-gray-800 font-medium hover:underline ml-1">
                        Create one
                    </Link>
                </p>
            </div>
        </div>:<Navigate to={'/'}/>}</>
    );
};

export default Login;
