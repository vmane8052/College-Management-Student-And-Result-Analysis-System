import React from "react";
import { FaHome, FaUser, FaCog } from "react-icons/fa";

const samplenavabar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed left-0 top-0 flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        My App
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-4">
            <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <FaHome className="mr-3" /> Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <FaUser className="mr-3" /> Profile
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <FaCog className="mr-3" /> Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default samplenavabar;