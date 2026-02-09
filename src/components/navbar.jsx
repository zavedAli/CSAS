import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white/10 backdrop-blur-md text-white shadow-lg">
      <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
        CSAS
      </h1>
      <p className="text-sm font-light tracking-wide text-blue-50">
        CPU Scheduling Algorithm Simulator
      </p>
      <div className="flex gap-4">
        <a
          href="#"
          className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium transition-all duration-300 hover:bg-white/30 hover:scale-105"
        >
          Home
        </a>
        <a
          href="#"
          className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium transition-all duration-300 hover:bg-white/30 hover:scale-105"
        >
          About
        </a>
      </div>
    </div>
  );
};

export default Navbar;
