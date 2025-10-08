import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SaveIcon from "../assets/icons/save.png"; 

function Save() {
    const navigate = useNavigate(); 

    const handleSave = () => {
        alert('Changes saved!');
    };

    const goToHome = () => {
        navigate('/'); 
    };

    return (
        <button onClick={() => handleSave()} 
        className="bg-[#201B4D] hover:bg-[#45a049] py-2 px-4 rounded-[7px] border-1 border-[#6A7278]/45 cursor-pointer transition">
            <img 
                src={SaveIcon} 
                alt="arrow" 
                className="w-[1.5vw] cursor-pointer float-right mt-0.5 ml-1"
             />

            Save
        </button>
    );
    }   
export default Save;