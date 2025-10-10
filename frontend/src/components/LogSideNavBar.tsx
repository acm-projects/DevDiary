import ArrowIcon from "../assets/icons/sideArrow.png";
import FileIcon from "../assets/icons/fileIcon.svg";
import { useState } from "react";

interface LogSideNavbarProps {
    projectName?: string; // Optional project name to display at the top
    logName?: string;     // Optional log name to highlight a specific log
}

function LogSideNavbar({projectName, logName}: LogSideNavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

  return (

    <div className={`h-full bg-[#41b3a926] border rounded border-solid border-[#ffffff33]/50 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
        {/* Container for aligning */}
        <div className= {`flex items-center mb-4 h-8 border-b border-[#ffffff33]/50 ${isOpen ? 'p-8' : 'p-6'}`}> 
        
        {/* Show title of sidebar only when sidebar is opened*/}
        {isOpen && (
            <p className="font-semibold text-white"> {projectName} Logs</p>
        )}

        <div className="flex-grow" />

        <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-1 rounded-full hover:bg-white/10 transition-colors" >

            <img 
                src={ArrowIcon} 
                alt="arrow" 
                // Rotate icon if sidebar is open
                className={`w-6 h-6 cursor-pointer transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'w-0'}`} 
            />
        </button>
        </div>

        {/* The content of the sidebar */}
        {isOpen && (
            <>
            <div className="flex justify-center gap-2 mb-4 h-8">
                {/* Button to create a new log */}
                <button className= "w-30 bg-[#011522]/50 text-white px-4 py-2 rounded-[15px] border-1 border-[#6A7278]/45 hover:bg-[#011522] cursor-pointer transition" onClick={() => {/* Create a new log*/}}>    
                    <p className="text-[12px]"> New Log</p>
                </button>

                {/* Button to export logs */}
                <button className= "w-30 bg-[#011522]/50 text-white px-4 py-2 rounded-[15px] border-1 border-[#6A7278]/45 hover:bg-[#011522] cursor-pointer transition" onClick={() => {/* Create a new log*/}}>    
                    <p className="text-[12px]"> Export </p>
                </button>

            </div>
    
            </>
        )}
        {/* List of logs and their icons container */}

        <div className= {`flex flex-col flex-grow justify-center mb-4 h-8 ${isOpen ? 'justify-start' : 'justify-center'} ${!isOpen ? 'ml-4' : ''}`} >
            <button className={`flex items-center gap-2 p-2 rounded-lg ${isOpen ? 'hover:bg-[#011522]/50' : ''}`} >
                <img
                    src={FileIcon}
                    alt="File Icon"
                    // Rotating icon animation when opening sidebar
                    className={`w-6 h-6 cursor-pointer transform transition-transform duration-300 ${isOpen ? 'rotate-360' : ''}`}
                />

                {/* List of logs, currently only one log is shown */}
                {isOpen && (
                <ul className="list-none list-inside text-white text-[14px]">
                    <li className="cursor-pointer hover:text-[#45a049]">{logName}</li>
                </ul>
                )}
            </button>
        </div>

    </div>
  );
}

export default LogSideNavbar;