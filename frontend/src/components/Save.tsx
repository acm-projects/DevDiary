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
export default Save;