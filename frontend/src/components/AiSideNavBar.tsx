import ArrowIcon from "../assets/icons/sideArrow.png";
import { useState } from "react";

<<<<<<< HEAD
function AiSideBar(){
  const [isOpen, setIsOpen] = useState(false);

  const InsightItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <li className="bg-[#1E293B] p-2 rounded-md border border-gray-700 text-sm text-gray-300">
        {children}
      </li>
    );

    return (
    <div className={`h-full bg-[#0c384973]  bg-[url(src/assets/Variant7.png)] border-solid rounded-xl border border-gray-700 p-4 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
=======
function AiSideNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [aiIsOpen, setAiIsOpen] = useState(false);

  return (

    <div className={`h-full bg-[#41b3a926] border rounded border-solid border-[#ffffff33]/50 p-4 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
>>>>>>> Updated_Home
        <button onClick={() => setIsOpen(!isOpen)} className="mb-4">
            <img 
                src={ArrowIcon} 
                alt="arrow" 
                // Rotate icon if sidebar is open
<<<<<<< HEAD
                className={`w-6 h-auto cursor-pointer transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
=======
                className={`w-6 h-auto cursor-pointer transform transition-transform duration-300 rotate-180 ${isOpen ? 'rotate-360' : ''}`} 
            />
        </button>

        <button onClick={() => setAiIsOpen(!aiIsOpen)} className="border rounded border-solid border-[#ffffff33]/50 mb-4">
            <img 
                src={ArrowIcon} 
                alt="arrow" 
                // Rotate icon if sidebar is open
                className={`p-2 w-10 h-auto cursor-pointer hover:bg-[#ffffff33]/50 transform transition-transform duration-300 rotate-360 ${aiIsOpen ? 'opacity-80' : ''}`} 
>>>>>>> Updated_Home
            />
        </button>

        {/* SideBar UI and content when opened*/}
        {isOpen && (
            <div>
<<<<<<< HEAD
                {/* AI Insights */}
                <div className="mb-10">
                    <h3 className="font-semibold text-gray-200 mb-3">AI Insights</h3>
                    <ul className="space-y-2">
                        <InsightItem>List of insights</InsightItem>
                        <InsightItem>List of insights</InsightItem>
                        <InsightItem>List of insights</InsightItem>
                    </ul>
                </div>

                {/* Similar Logs*/}
                <div>
                    <h3 className="font-semibold text-gray-200 mb-3">Similar Logs</h3>
                    <ul className="space-y-2">
                        <InsightItem>Links to similar logs</InsightItem>
                        <InsightItem>Links to similar logs</InsightItem>
                        <InsightItem>Links to similar logs</InsightItem>
                    </ul>
                </div>
            </div>
        )} 
    </div>

    );
};

export default AiSideBar;
=======
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
>>>>>>> Updated_Home
