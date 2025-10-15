// On click goes to Home Page
import { useNavigate } from 'react-router-dom';

function Logo() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/home'); 
    };

    return (
        <button onClick={() => goToHome()} 
         className="text-xl tracking-wider [font-family:'DM-Mono',Helvetica] font-bold text-[1rem] cursor-pointer flex items-center">
                <h1 className="flex items-center">
                    <span className="text-[#80ffdbbf]">&lt;/&gt;</span>
                    <span className="ml-1 text-white">devDiary</span>
                </h1>
        </button>
    );
}

export default Logo;