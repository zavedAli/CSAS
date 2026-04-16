import React from "react";
import { GiProcessor } from "react-icons/gi";
import { FaLinkedin, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaCode, FaCubes } from "react-icons/fa";
import { SiSolidity, SiJavascript, SiReact } from "react-icons/si";
import { MdOutlineApi } from "react-icons/md";

const skills = [
  {
    category: "Frontend Development",
    icon: <SiReact className="text-blue-400 text-xl" />,
    items: ["React", "JavaScript", "Responsive Web Design", "UI/UX Design"],
  },
  {
    category: "API & Backend Integration",
    icon: <MdOutlineApi className="text-purple-400 text-xl" />,
    items: ["Axios", "RESTful API", "API Integration", "Data Flow Architecture"],
  },
  {
    category: "Web3 & Blockchain",
    icon: <FaCubes className="text-green-400 text-xl" />,
    items: ["Solidity", "Blockchain Architecture", "NFTs", "Decentralized Apps"],
  },
  {
    category: "General Development",
    icon: <FaCode className="text-yellow-400 text-xl" />,
    items: ["Web Development", "Android Development", "Computer Programming", "Problem Solving"],
  },
];

const AboutPage = ({ onNavigateHome }) => {
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 pb-16">

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#161b22] to-[#0d1117] border-b border-[#30363d] py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="flex-shrink-0 w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl text-4xl font-bold text-white">
            ZA
          </div>

          {/* Info */}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">Zaved Ali</h1>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-blue-400 font-medium mb-3">
              <FaBriefcase className="text-sm" />
              <span>Frontend Developer @ HabotConnect</span>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-red-400" />
                Guwahati, Assam, India
              </span>
              <span className="flex items-center gap-1">
                <FaGraduationCap className="text-green-400" />
                MCA — BBAU, Lucknow
              </span>
            </div>
            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
              <a
                href="https://www.linkedin.com/in/zaved-ali"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#0a66c2] hover:bg-[#0958a8] text-white text-sm rounded-lg transition-all"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <span className="flex items-center gap-2 px-4 py-2 bg-[#21262d] text-gray-300 text-sm rounded-lg border border-[#30363d]">
                330+ Connections
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-[#21262d] text-green-400 text-sm rounded-lg border border-[#30363d]">
                Open to Lucknow (On-site/Hybrid)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-10 space-y-10">

        {/* About Section */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-500 rounded-full inline-block"></span>
            About Me
          </h2>
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 text-gray-400 leading-relaxed text-sm">
            I am a passionate Frontend Developer currently at <span className="text-blue-400 font-medium">HabotConnect</span>, where I specialize in building intuitive web experiences and robust API integrations using Axios. With a <span className="text-white font-medium">Master of Computer Applications from BBAU, Lucknow</span>, I bridge the gap between complex backend logic and clean, responsive frontend design.
            <br /><br />
            Beyond traditional web development, I am deeply interested in the decentralized web, possessing skills in <span className="text-purple-400 font-medium">Solidity and Blockchain technology</span>. I thrive in collaborative environments and am always looking for innovative ways to deliver efficient, user-centric solutions.
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-purple-500 rounded-full inline-block"></span>
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div key={skill.category} className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  {skill.icon}
                  <h3 className="text-white font-medium text-sm">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item} className="px-3 py-1 bg-[#21262d] border border-[#30363d] text-gray-400 text-xs rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-green-500 rounded-full inline-block"></span>
            Experience
          </h2>
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                HC
              </div>
              <div>
                <h3 className="text-white font-semibold">Frontend Developer</h3>
                <p className="text-blue-400 text-sm">HabotConnect</p>
                <p className="text-gray-500 text-xs mt-1">Current Role</p>
                <ul className="mt-3 space-y-1 text-sm text-gray-400 list-disc list-inside">
                  <li>Contributing to frontend architecture and component development</li>
                  <li>Expert API integration using Axios for smooth data flow</li>
                  <li>Building intuitive, responsive user interfaces</li>
                  <li>Collaborating in dynamic team environments</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-yellow-500 rounded-full inline-block"></span>
            Education
          </h2>
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 text-white">
                <FaGraduationCap />
              </div>
              <div>
                <h3 className="text-white font-semibold">Master of Computer Applications (MCA)</h3>
                <p className="text-yellow-400 text-sm">Babasaheb Bhimrao Ambedkar University (BBAU)</p>
                <p className="text-gray-500 text-xs mt-1">Lucknow, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>
        </section>

        {/* About This Project Section */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-red-500 rounded-full inline-block"></span>
            About This Project
          </h2>
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-white text-xl">
                <GiProcessor />
              </div>
              <div>
                <h3 className="text-white font-semibold">CSAS — CPU Scheduling Algorithm Simulator</h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  An interactive web application built with React and JavaScript that simulates and visualizes CPU scheduling algorithms. Features include real-time Gantt charts, process state diagrams, step-by-step execution, performance metrics, algorithm comparison graphs, and CSV/PDF export.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["React", "JavaScript", "Tailwind CSS", "OS Concepts"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-[#21262d] border border-[#30363d] text-blue-400 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={onNavigateHome}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm rounded-lg transition-all shadow-lg"
          >
            ← Back to Simulator
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
