import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/index.css';
import { useState } from "react";
import axios from 'axios';


function SignUp(){
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
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

    return (
        <div className="w-screen h-screen bg-center bg-cover bg-[#0F172A] bg-[url(src/assets/Variant6.svg)] text-white flex flex-col items-center justify-center font-sans">
            <div className="absolute top-8 left-8 text-2xl">
                <Logo />
            </div>
            <div className="bg-[#1E293B] px-10 py-2 rounded-xl shadow-lg w-full max-w-md overflow-y-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Sign up</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>

                    {/* Name field */}
                    <div>
                        <label htmlFor="name" className="block text-left text-sm font-medium mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleChange}
                            className="w-full p-3 bg-[#2D3748] rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Email field */}
                    <div>
                        <label htmlFor="email" className="block text-left text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleChange}
                            className="w-full p-3 bg-[#2D3748] rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Password field */}
                    <div>
                        <label htmlFor="password" className="block text-left text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handleChange}
                            className="w-full p-3 bg-[#2D3748] rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Confirm Password field */}
                     <div>
                        <label htmlFor="confirmPassword" className="block text-left text-sm font-medium mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword} // Added missing value attribute
                            onChange={handleChange}
                            className="w-full p-3 bg-[#2D3748] rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Submit button */}
                    <button type="submit"
                        className="w-full py-3 bg-[#43B5A8] rounded-md font-semibold hover:opacity-90 transition-opacity"
                        //onClick={() => handleSubmit()}
                    >
                        Get Started
                    </button>
                </form>

                {/* Other sign up options */}
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

                {/* Login instead */}
                <p className="text-center text-sm text-gray-400 mt-3 mb-2">
                    Already have an account? 
                    <Link to="/login" className="text-teal-400 hover:underline fade-in">
                        Login here!
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
