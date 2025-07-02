import React, { useEffect, useState } from 'react';
import Baner from '../../public/b.png';
import Login from './Login';

export default function Navbar() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navitem = (
    <>
      <li><a href='/'>Home</a></li>
      <li><a href='/AboutUs'>About</a></li>
      <li><a href='/ContactUs'>Contact</a></li>
      <li>
        <details>
          <summary>Course</summary>
          <ul className="p-2">
            <li><a href='/MCAFlipbook'>MCA</a></li>
            <li><a href='/MBAFlipbook'>MBA</a></li>
            <li><a href='/BCAFlipbook'>BCA</a></li>
            <li><a href='/BBAFlipbook'>BBA</a></li>
          </ul>
        </details>
      </li>
    </>
  );

  return (
    <>
      <div
        className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 bg-white ${
          sticky
            ? "sticky-navbar shadow-md bg-white duration-300 transition-all ease-in-out"
            : "bg-transparent"
        }`}
      >
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-80 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {navitem}
              </ul>
            </div>
            <a className="text-2xl font-bold cursor-pointer">
              <img src={Baner} className="w-12 h-12" alt="Logo" />
            </a>
          </div>
          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex align-center">
              <ul className="menu menu-horizontal px-1">{navitem}</ul>
            </div>
            <div className="hidden md:block">
              <label className="input">
                <svg
                  className="h-[1em] opacity-"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  type="text"
                  className="grow outline-none w-48"
                  required
                  placeholder="Search"
                />
              </label>
            </div>
            <label className="swap swap-rotate">
              <input type="checkbox" className="theme-controller" value="synthwave" />
             
              <svg
                className="swap-on h-10 w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                />
              </svg>
            </label>
            <div>
              <a
                className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Login
              </a>
              <Login />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}