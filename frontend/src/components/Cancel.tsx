import { useNavigate } from "react-router-dom";

function Cancel() {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate('/');  // Go back to home page
    }

  return (
    <button onClick={handleClick}  
        type="button"
        className="px-4 py-2 bg-[#2D3748]/50 rounded-md border border-gray-600 hover:bg-gray-700 transition-colors text-sm">
        Cancel
        </button>
  );
}

export default Cancel;