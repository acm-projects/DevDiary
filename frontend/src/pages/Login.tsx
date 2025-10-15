import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Login () {

    const navigate = useNavigate();

    
      const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const { email, password } = formData;
    
      // handle input changes
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    
      // handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();

    
        try {
          const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: name,
              email: email,   
              password: password,
            }),
          });
    
          const data = await res.json();
    
          if (!res.ok) {
            alert(data.msg || "Registration failed");
            return;
          }
    
          localStorage.setItem("token", data.token);
    
          navigate("/");
        } catch (err) {
          console.error("Error:", err);
          alert("Server error");
        }
        };

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
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="text-left block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleChange}
                            className="w-full p-3 bg-[#2D3748] rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-left block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handleChange}
                            className="w-full p-3 bg-[#2D3748] rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#43B5A8] rounded-md font-semibold hover:opacity-90 transition-opacity"
                        //onClick={() => goToHome()}
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