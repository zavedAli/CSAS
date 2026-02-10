import React from "react";
import { GiProcessor } from "react-icons/gi";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-[#0d1117] text-white shadow-lg border-b border-[#30363d] backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md">
          <GiProcessor className="text-xl" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">CSAS</h1>
          <span className="text-xs text-gray-400">CPU Scheduling Algorithm Simulator</span>
        </div>
      </div>
      <div className="flex gap-2 text-sm">
        <a href="#" className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#21262d] transition-all duration-200">
          Home
        </a>
        <a href="#" className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#21262d] transition-all duration-200">
          About
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
