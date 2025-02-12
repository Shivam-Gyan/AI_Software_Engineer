import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center">

                    {/* Logo & Description */}
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-semibold text-white">YourLogo</h2>
                        <p className="text-gray-400 text-sm mt-2">
                            Enhancing your experience with top-notch services.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex gap-6 text-gray-400">
                        <Link to="/about" className="hover:text-white">About</Link>
                        <Link to="/services" className="hover:text-white">Services</Link>
                        <Link to="/contact" className="hover:text-white">Contact</Link>
                        <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                            <i className="fi fi-brands-facebook"></i>
                        </a>
                        <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                            <i className="fi fi-brands-twitter"></i>
                        </a>
                        <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                            <i className="fi fi-brands-instagram"></i>
                        </a>
                        <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
                            <i className="fi fi-brands-linkedin"></i>
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} YourCompany. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
