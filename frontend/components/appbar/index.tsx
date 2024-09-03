"use client"
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function AppBar({ title = "Language Battle" }: { title?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full bg-white/10 backdrop-blur-md p-4 fixed top-0 left-0 z-50 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-xl md:text-2xl font-bold text-black">{title}</div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-black text-md md:text-lg hover:text-gray-500 transition">
            Home
          </a>
          <a href="/statistics" className="text-black text-md md:text-lg hover:text-gray-500 transition">
            Statistic
          </a>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <a href="/" className="block text-black text-lg hover:text-gray-500 transition">
            Home
          </a>
          <a href="/statistics" className="block text-black text-lg hover:text-gray-500 transition">
            Statistic
          </a>
        </div>
      )}
    </div>
  );
}
