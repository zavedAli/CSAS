import React from "react";

const Navbar = () => {
  return (
    <div className="flex flex-col mb-[30px] items-center justify-center bg-gradient-to-r from-[#1473E6] to-[#764ba2] text-white">
      <div className="nav mt-4 flex cursor-auto gap-24">
        <a
          href="#"
          className="relative rounded bg-[#0c0e1613] font-thin transition-all duration-100 ease-in-out hover:scale-105 hover:font-bold"
        >
          <span className="invisible px-2 font-bold">Home</span>
          <span className="absolute inset-0 px-2">Home</span>
        </a>
        <a
          href="#"
          className="relative rounded bg-[#0c0e1613] font-thin transition-all duration-100 ease-in-out hover:scale-105 hover:font-bold"
        >
          <span className="invisible px-2 font-bold">About</span>
          <span className="absolute inset-0 px-2">About</span>
        </a>
      </div>
      <h1 className="heading mb-3 mb-7 mt-8 text-5xl font-light">CSAS</h1>
      <p className="mb-9 font-serif text-2xl">
        Cpu Scheduling Algoritm Simulation{" "}
      </p>
    </div>
  );
};

export default Navbar;
