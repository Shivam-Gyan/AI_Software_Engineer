import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "../config/axios.config";
import { toast } from 'react-hot-toast'
import { useUser } from "../context/user.context";
import { Loader } from "../component";

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser, loading, setLoading } = useUser()
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true)
        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        const EmptyState = () => {
            setName("")
            setEmail("")
            setPassword("")
        }

        axios.post('user/register', {
            name, email, password
        }).then((res) => {

            setLoading(false)
            setUser(res.data)
            localStorage.setItem('token', res.data.token)
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
            {!user ? <div className="flex min-h-full text-white bg-gradient-to-r from-indigo-800 to-purple-900 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-6 text-center text-3xl/9 font-bold tracking-normal">
                        Create an account
                    </h2>
                </div>

                <div className={`relative bg-slate-500/60 mt-10  shadow-md rounded-md p-3 sm:p-5 sm:mx-auto sm:w-full sm:max-w-sm`}>
                    {loading ? <Loader /> : ''}
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm/6 font-medium ">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    autoComplete="name"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium ">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium ">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={loading}
                                type="submit"
                                className="flex w-full justify-center rounded-md disabled:bg-purple-300 bg-purple-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-purple-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-300">
                        Already have an account?{' '}
                        <Link to={'/login'}  className="font-semibold text-indigo-200 hover:text-indigo-300">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div> : <Navigate to={'/'} />}
        </>
    );
};

export default Login;
