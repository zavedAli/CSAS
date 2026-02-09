import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-slate-900 text-white shadow-md border-b border-slate-700">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold tracking-tight">CSAS</h1>
        <span className="text-xs text-slate-400">CPU Scheduling Simulator</span>
      </div>
      <div className="flex gap-3 text-sm">
        <a href="#" className="px-3 py-1 rounded hover:bg-slate-800 transition-colors">
          Home
        </a>
        <a href="#" className="px-3 py-1 rounded hover:bg-slate-800 transition-colors">
          About
        </a>
      </div>
    </div>
  );
};

export default Navbar;
