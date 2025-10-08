import ArrowIcon from "../assets/icons/sideArrow.png"; // adjust path if needed
import { useState } from "react";

function LogSideNavbar() {
    const [isOpen, setIsOpen] = useState(false); 

  return (
    <>  
        {!isOpen && (
            <div className="absolute left-[3.2vw] top-[12vh] w-[4vw] h-[85vh] bg-[#41b3a926] rounded-[7px] border border-solid border-[#ffffff33]">
                <button onClick={() => {setIsOpen(!isOpen)}}
                className="transform rotate-180">   
                    <img 
                        src={ArrowIcon} 
                        alt="arrow" 
                        className="w-[1.5vw] h-auto m-5 cursor-pointer" 
                />
                </button>
            </div>
            )}

            {isOpen && (
                <div className="absolute left-[3.2vw] top-[12vh] w-[15vw] h-[85vh] bg-[#41b3a926] rounded-[7px] border border-solid border-[#ffffff33] p-3">
                    <p className="text-white text-[14px] mb-2">Log Options</p>
                    <ul className="list-disc list-inside text-white text-[12px]">
                        <li className="mb-1 cursor-pointer hover:text-[#45a049]">Edit Log</li>
                        <li className="mb-1 cursor-pointer hover:text-[#45a049]">Delete Log</li>
                        <li className="mb-1 cursor-pointer hover:text-[#45a049]">Duplicate Log</li>
                        <li className="mb-1 cursor-pointer hover:text-[#45a049]">Export Log</li>
                    </ul>
                </div>
            )}

    </>
  );

}

export default LogSideNavbar;