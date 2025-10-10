import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';
import { Link } from 'react-router-dom';

function Login () {

    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/'); 
    };

    return (
        <div className="w-screen h-screen bg-center bg-cover bg-[#0F172A] bg-[url(src/assets/Variant6.svg)] text-white flex flex-col items-center justify-center font-sans">
            <div className="absolute top-8 left-8 text-2xl ">
                <Logo />
            </div>

            <div className="bg-[#1E293B] p-10 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="text-left block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 bg-[#2D3748] rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-left block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 bg-[#2D3748] rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#43B5A8] rounded-md font-semibold hover:opacity-90 transition-opacity"
                        onClick={() => goToHome()}
                    >
                        Login
                    </button>
                </form>
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="mx-4 text-gray-400">or</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>
                <div className="space-y-4">
                    <button className="w-full py-3 flex items-center justify-center gap-2 bg-[#2D3748] rounded-md border border-gray-600 hover:bg-gray-700 transition-colors">
                        {/* Add Google icon */}
                        Login with Google
                    </button>
                    <button className="w-full py-3 flex items-center justify-center gap-2 bg-[#2D3748] rounded-md border border-gray-600 hover:bg-gray-700 transition-colors">
                        {/* Add GitHub icon */}
                        Login with GitHub
                    </button>
                </div>
                <p className="text-center text-sm text-gray-400 mt-8">
                    Don't have an account? 
                    <Link to="/sign-up" className="text-teal-400 hover:underline fade-in">
                        Sign up here!
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;