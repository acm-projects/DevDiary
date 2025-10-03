import ProfilePhoto from '../assets/icons/profile.png';

function Profile() {
    return (
        <div>
            <img src={ProfilePhoto}
                alt="Profile"
                className="w-[3vw] h-auto m-5 cursor-pointer mr-10 mt-4"   
             />
        
        </div>
    );
}

export default Profile;