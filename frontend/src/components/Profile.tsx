// On click goes to Settings Page
import { useNavigate } from 'react-router-dom';
import ProfilePhoto from '../assets/icons/profile.png';

function Profile() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/settings'); 
    };
    return (
        <button onClick={() => goToHome()}>
            <img src={ProfilePhoto}
                alt="Profile"
                className="w-[3vw] h-auto m-5 cursor-pointer mr-10 mt-4"   
             />
        
        </button>
    );
}

export default Profile;