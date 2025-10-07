import Logo from '../components/Logo';

function Settings() {
    return (
        <> 
        <div className="flex justify-center w-screen h-screen bg-gray-900 text-white">
            {/* Logo */}
            <div className="fixed top-[1.5vh] left-[1vw]">
                <Logo />
            </div>

            {/* Settings Content */}
            <h1 className="text-4xl font-bold mb-8">Settings Page</h1>
            <p className="text-lg">More to come</p>
            {/* Add more settings options here */}
        </div>
        </>
    );
}

export default Settings;