import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "../config/axios.config";
import { toast } from 'react-hot-toast'
import { useUser } from "../context/user.context";

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {user,setUser}=useUser()
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true)
        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        const EmptyState=()=>{
            setName("")
            setEmail("")
            setPassword("")
        }

        axios.post('user/register', {
            name, email, password
        }).then((res) => {
            
            setLoading(false)
            setUser(res.data)
            console.log(res.data)
            localStorage.setItem('token', JSON.stringify(res.data.token))
            toast.success(res.data.message);
            EmptyState();
            navigate('/');
           
        }).catch(error => {
            setLoading(false)
            EmptyState();
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
        {!user ?<div className="flex items-center justify-center min-h-[88vh] bg-gray-100">
            <div className="bg-white relative p-3 m-1 sm:m-0 sm:p-8 rounded-lg shadow-lg w-full max-w-md">

                <h2 className="text-2xl font-semibold text-gray-800 text-center">Login</h2>

                <form onSubmit={handleLogin} className="mt-4">

                    {/* name field */}
                    <div>
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mt-4">
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
                        className={`w-full cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-500`}
                    >
                        {loading ? <i className="fi fi-tr-loading animate-spin"></i> : "Sign up"}
                    </button>
                </form>

                {/* Create Account Link */}
                <p className="text-center text-gray-500 text-sm mt-4">
                    Already have an account?
                    <Link to="/login" className="text-gray-800 font-medium hover:underline ml-1">
                        Login here
                    </Link>
                </p>
            </div>
        </div>:<Navigate to={'/'}/>}
        </>
    );
};

export default Login;
