import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useUser } from '../context/user.context';

const Navbar = () => {

  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, setUser } = useUser();

  const navbarConfig = [
    {
      path: '/',
      name: 'Home'
    },
    {
      path: '/about',
      name: 'About'
    },
    {
      path: '/docs',
      name: 'Docs'
    },
    {
      path: '/contact',
      name: 'Contact Us'
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (

    <nav className={`sticky z-40  w-full py-4 flex justify-around  sm:justify-center gap-12 sm:gap-16 items-center top-0 p-4 transition-colors duration-100 ${
      isScrolled ? 'bg-white border-b  border-gray-200 ' : ' bg-gradient-to-r from-indigo-800 to-purple-900 text-white '
    }`}>

      <Link to={'/'} className={`text-3xl text-gray-800 font-semibold ${isScrolled ? 'text-indigo-600' : 'text-white'}`}>
        Logo
      </Link>

      <div className=' flex gap-12 items-center '>
        <div className='hidden sm:block '>
          <ul className='flex justify-center mx-10 items-center gap-8'>
            {
              navbarConfig.map((item, idx) => (
                <NavLink key={idx} to={`${item.path}`} className={({ isActive }) => `cursor-pointer text-[16px] font-medium min-w-fit hover:text-gray-300 ${isActive ? isScrolled?"text-indigo-600": "text-gray-300" : ""}`}>{item.name}</NavLink>
              ))
            }
          </ul>
        </div>

        <button
          onBlur={() => {
            setShowMenu(false)
          }}
          onClick={() => setShowMenu(prev => !prev)} className='block sm:hidden'
        >
          <i className={`fi fi-${showMenu ? 'br-cross text-lg' : 'rr-menu-burger text-xl'} cursor-pointer `}></i>
        </button>

        {showMenu &&
          <div className='absolute top-18 right-0 flex border border-gray-100 text-white w-full bg-gray-400 z-40 '>
            <div className='flex flex-col w-full '>
              {
                navbarConfig.map((item, idx) => (
                  <NavLink key={idx} to={`${item.path}`} className={({ isActive }) => `px-4 text-center py-3 cursor-pointer  w-full ${isActive ? "text-indigo-600" : ""}`}>{item.name}</NavLink>

                ))
              }
              <span className={`w-full ${user ? "border border-gray-300" : ""} `}></span>
              {user && <button
                // onClick={signOutUser}
                className="text-center p-4 cursor-pointer w-full pl-8 py-4  "
              >
                <h1 className=" font-bold text-xl mb-1 ">Sign Out</h1>
                <p className="text-dark-grey">@shivam</p>
              </button>}
            </div>
          </div>
        }

        {!user ?
          <Link to={'/login'} className='bg-purple-600 shadow-purple-500 shadow-sm font-medium text-white hover:bg-purple-700 py-2 px-6 rounded-md'>Login</Link> :
          <div className=' w-9 h-9 cursor-pointer rounded-full bg-gray-200 flex justify-center items-center overflow-hidden'><i className="fi fi-sr-user text-slate-500 text-3xl mt-4"></i></div>
        }
      </div>
    </nav>

  )
}





export default Navbar;