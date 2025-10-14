import React from 'react';
import SaveIcon from "../assets/icons/save.png";

interface SaveProps {
    onClick: () => void; // handles onClick 
}

const Save: React.FC<SaveProps> = ({ onClick }) => {
    return (
        <button 
            onClick={onClick} 
            className=" px-4 py-2 rounded-md transition-colors text-sm font-semibold flex items-center bg-[#1d6852] hover:bg-[#4575a0] border border-[#6A7278]/45 cursor-pointer"
        >
            <img 
                src={SaveIcon} 
                alt="Save" 
                className="w-5 h-5"
            />
            <span>Save</span>
        </button>
    );
}   

export default Save;