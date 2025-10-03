// On click goes to Home Page
import { useNavigate } from 'react-router-dom';

function Logo() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/'); 
    };

    return (
        <button onClick={() => goToHome()} 
         className="[font-family:'DM-Mono',Helvetica] text-[1rem] cursor-pointer flex items-center">
                    <span className="text-[#80ffdbbf]">&lt;/&gt;</span>
                    <span className="ml-1 text-white">devDiary</span>
        </button>
    );
}

export default Logo;
