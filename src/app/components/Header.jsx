// Header Component
"use client";
import { useState } from 'react';
import { FiMenu, FiX, FiMapPin, FiThermometer } from 'react-icons/fi'; // Add weather icons
import Weather from './Weather'; // Import Weather component

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [locationData, setLocationData] = useState(null); // Store weather and location data

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-10 shadow-md z-[100]">
      <nav className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-black">      <Weather setLocationData={setLocationData} />
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-6">
          <li><a href="#hero" className="text-lg text-gray-700 hover:text-indigo-600 font-bold">Home</a></li>
          <li><a href="#skills" className="text-lg text-gray-700 hover:text-indigo-600 font-bold">Skills</a></li>
          <li><a href="#about" className="text-lg text-gray-700 hover:text-indigo-600 font-bold">About</a></li>
          <li><a href="#projects" className="text-lg text-gray-700 hover:text-indigo-600 font-bold">Projects</a></li>
          <li><a href="#calendar" className="text-lg text-gray-700 hover:text-indigo-600 font-bold">Calendar</a></li>
          <li><a href="#contact" className="text-lg text-gray-700 hover:text-indigo-600 font-bold">Contact</a></li>
        </ul>

       
      </nav>

      {/* Sidebar for Mobile */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} z-20`}
      >
        <div className="p-4 flex justify-end">
          <button onClick={toggleMenu} className="text-2xl">
            <FiX />
          </button>
        </div>
        <ul className="flex flex-col items-center space-y-6 mt-8">
          <li><a href="#hero" className="text-lg text-gray-700 hover:text-indigo-600 font-bold">Home</a></li>
          <li><a href="#about" className="text-lg text-gray-700 hover:text-indigo-600 font-bold">About</a></li>
          <li><a href="#projects" className="text-lg text-gray-700 hover:text-indigo-600 font-bold">Projects</a></li>
          <li><a href="#calendar" className="text-lg text-gray-700 hover:text-indigo-600 font-bold">Calendar</a></li>
          <li><a href="#contact" className="text-lg text-gray-700 hover:text-indigo-600 font-bold">Contact</a></li>
        </ul>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Weather Component */}
    </header>
  );
};

export default Header;
