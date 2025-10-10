import ArrowIcon from "../assets/icons/sideArrow.png";
import { useState } from "react";

function AiSideNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [aiIsOpen, setAiIsOpen] = useState(false);

  return (

    <div className={`h-full bg-[#41b3a926] border rounded border-solid border-[#ffffff33]/50 p-4 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
        <button onClick={() => setIsOpen(!isOpen)} className="mb-4">
            <img 
                src={ArrowIcon} 
                alt="arrow" 
                // Rotate icon if sidebar is open
                className={`w-6 h-auto cursor-pointer transform transition-transform duration-300 rotate-180 ${isOpen ? 'rotate-360' : ''}`} 
            />
        </button>

        <button onClick={() => setAiIsOpen(!aiIsOpen)} className="border rounded border-solid border-[#ffffff33]/50 mb-4">
            <img 
                src={ArrowIcon} 
                alt="arrow" 
                // Rotate icon if sidebar is open
                className={`p-2 w-10 h-auto cursor-pointer hover:bg-[#ffffff33]/50 transform transition-transform duration-300 rotate-360 ${aiIsOpen ? 'opacity-80' : ''}`} 
            />
        </button>

        {/* SideBar UI and content when opened*/}
        {isOpen && (
            <div>
                setAiIsOpen(aiIsOpen == false ? true : false);
                <p className="text-white text-[14px] mb-2">AI Insights</p>
                <ul className="list-disc list-inside text-white text-[12px]">
                    <li className="mb-1 cursor-pointer hover:text-[#45a049]">AI dude</li>
                </ul>
            </div>
        )} 
    </div>
  )
}

export default AiSideNavBar;