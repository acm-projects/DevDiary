// On click goes to Settings Page
import { useNavigate } from 'react-router-dom';
import ProfilePhoto from '../assets/icons/profile.png';

function Profile() {
    const navigate = useNavigate();

    const goToSettings = () => {
        navigate('/settings'); 
    };
    
    return (
        <button onClick={() => goToSettings()}>
            <img src={ProfilePhoto}
                alt="Profile"
                className="flex w-[30px] lg:w-[40px] cursor-pointer hover:opacity-80 transition-opacity duration-300"   
             />
        
        </button>
    );
}

export default Profile;