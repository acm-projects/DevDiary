<<<<<<< HEAD
import React from 'react';
import SaveIcon from "../assets/icons/save.png";

interface SaveProps {
    onClick: () => void; // handles onClick 
}

const Save: React.FC<SaveProps> = ({ onClick }) => {
    return (
        <button 
            onClick={onClick} 
            className=" px-4 py-2 rounded-md transition-colors text-sm flex items-center bg-[#1d6852] hover:bg-[#4575a0] border border-[#6A7278]/45 cursor-pointer"
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

=======
import SaveIcon from "../assets/icons/save.png"; 

function Save() {

    const handleSave = () => {
        alert('Changes saved!');
    };

    return (
        <button onClick={() => handleSave()} 
        className="bg-[#1d6852] hover:bg-[#4575a0] py-2 px-4 rounded-[7px] border-1 border-[#6A7278]/45 cursor-pointer transition">
            <img 
                src={SaveIcon} 
                alt="arrow" 
                className="w-[20px] cursor-pointer float-right mt-0.5 ml-1"
             />

            Save
        </button>
    );
    }   
>>>>>>> Updated_Home
export default Save;