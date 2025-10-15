<<<<<<< HEAD
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
=======
// Goes back to the previous page when clicked without saving changes
function Cancel() {
  return (
    <button onClick={() => window.history.back()}  
        type="button"
        className="bg-[#011522]/50 text-white px-4 py-2 rounded-[7px] border-1 border-[#6A7278]/45 hover:bg-[#011522] cursor-pointer transition">
>>>>>>> Updated_Home
        Cancel
        </button>
  );
}

export default Cancel;