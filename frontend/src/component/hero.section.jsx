import React from 'react'
import { useUser } from '../context/user.context';
import { Link } from 'react-router-dom';

const HeroSection = () => {

    const {user}=useUser();
    return (
        <>
            <section className="bg-gradient-to-r from-indigo-800 to-purple-900 min-h-full  text-white py-20 relative overflow-hidden">
               
                <div className="container max-w mx-auto text-center w-full flex justify-center items-center flex-col relative z-10">
                    <p className="text-xs uppercase tracking-widest mb-4">
                        + Your Ultimate AI Tool Companion!
                    </p>
                    <h1 className="text-2xl capitalize tracking-normal max-w-xl md:text-4xl font-bold mb-8">
                        AI agent help you to automate your work to make it easier
                    </h1>
                    <p className="text-sm max-w-3xl md:text-lg tracking-normal mb-10 px-4 md:px-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                        suscipit vel nunc in finibus. Suspendisse potenti. Sed eget
                        vestibulum nunc. Nullam suscipit vel nunc in finibus. Suspendisse
                        potenti. Sed eget vestibulum nunc.
                    </p>
                    <Link to={`${user?"/":"/login"}`} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-md text-lg">
                       {user?"Dashboard":"Get Started"}
                    </Link>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-purple-900 opacity-20 blur-3xl"></div>
            </section>
        </>
    )
}

export default HeroSection