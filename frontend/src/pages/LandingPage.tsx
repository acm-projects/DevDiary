import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from 'components/Header.tsx';
import RobotMascot from 'components/RobotMascot.tsx';

// Raining binary backgound
const RainingBinary: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

            {/* Binary rain */}
            {[...Array(100)].map((_, i) => (
                <div
                    key={`binary-${i}`}
                    className="absolute text-cyan-400/30 font-mono text-xs animate-binary-fall whitespace-pre"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `-${Math.random() * 20}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${10 + Math.random() * 5}s`
                    }}
                >
                    {Array.from({ length: 15 }, () => Math.random() > 0.5 ? '1' : '0').join('\n')}
                </div>
            ))}

            {/* Glowing particles */}
            {[...Array(50)].map((_, i) => (
                <div
                    key={`particle-${i}`}
                    className="absolute rounded-full animate-twinkle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        backgroundColor: i % 3 === 0 ? '#14b8a6' : i % 3 === 1 ? '#06b6d4' : '#a78bfa',
                        boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`,
                        opacity: Math.random() * 0.6 + 0.3,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 3}s`
                    }}
                ></div>
            ))}

            {/* Git branches */}
            {[...Array(10)].map((_, i) => (
                <div
                    key={`git-${i}`}
                    className="absolute text-teal-400/10 animate-float-slow"
                    style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                        animationDelay: `${i * 1.5}s`
                    }}
                >
                    <svg width="100" height="100" viewBox="0 0 100 100">
                        <circle cx="20" cy="20" r="5" fill="currentColor" />
                        <line x1="20" y1="25" x2="20" y2="50" stroke="currentColor" strokeWidth="2" />
                        <circle cx="20" cy="55" r="5" fill="currentColor" />
                        <line x1="25" y1="37.5" x2="50" y2="37.5" stroke="currentColor" strokeWidth="2" />
                        <circle cx="55" cy="37.5" r="5" fill="currentColor" />
                    </svg>
                </div>
            ))}
        </div>
    );
};

// Typewriter/live coding effect
const useTypewriter = (lines: string[], speed = 50, pause = 1000) => {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (lines.length === 0) return;

        const handleTyping = () => {
            const currentLine = lines[currentLineIndex];

            if (isDeleting) {
                setDisplayedText(prev => prev.substring(0, prev.length - 1));
            } else {
                setDisplayedText(currentLine.substring(0, displayedText.length + 1));
            }

            if (!isDeleting && displayedText === currentLine) {
                if (currentLineIndex === lines.length - 1) {
                    setTimeout(() => {
                        setCurrentLineIndex(0);
                        setDisplayedText('');
                    }, pause * 2);
                } else {
                    setTimeout(() => {
                        setCurrentLineIndex(prev => prev + 1);
                        setDisplayedText('');
                    }, pause);
                }
            }
        };

        const typingTimeout = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);
        return () => clearTimeout(typingTimeout);
    }, [displayedText, isDeleting, currentLineIndex, lines, speed, pause]);

    return displayedText;
};

// Terminal Component
const AnimatedTerminal: React.FC = () => {
    const lines = [
        "Error: node.JS env setup failure, no file found",
        "AI Analysis",
        "Similar error log found in project3/npm-errors.",
        "script or file specified in package.json cannot be found.",
        "Go to log",
        "Suggested fixes:",
    ];

    const typedText = useTypewriter(lines, 40, 800);
    const currentLineIndex = lines.findIndex(line => line.startsWith(typedText.substring(0, 10)) && typedText.length > 0);

    const getLineStyle = (index: number) => {
        const lineContent = lines[index];
        if (lineContent.startsWith("Error:")) return "bg-red-500/20 text-red-300 p-3 rounded-md border border-red-500/30";
        if (lineContent.startsWith("Suggested fixes:")) return "bg-green-500/20 text-green-300 p-3 rounded-md border border-green-500/30";
        if (lineContent.startsWith("AI Analysis")) return "text-purple-300 font-semibold";
        if (lineContent.startsWith("Go to log")) return "bg-teal-500 text-white w-fit px-4 py-2 rounded-md mx-auto my-2 hover:bg-teal-600 transition-all cursor-pointer";
        if (lineContent.includes("package.json")) return "bg-gray-700/50 p-2 rounded-md font-mono text-sm border border-gray-600/30";
        return "text-gray-400";
    };

    return (
        <div className="bg-gray-900/60 border border-teal-500/30 rounded-xl shadow-2xl backdrop-blur-xl w-full max-w-lg hover:border-teal-500/50 transition-all duration-300 group">
            <div className="relative flex items-center p-3 border-b border-gray-700">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
                </div>
                <div className="flex-grow text-center text-sm text-gray-400 font-mono">new-dev-log</div>
                <div className="flex items-center gap-2 text-xs text-teal-400">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                    </span>
                    AI Active
                </div>
            </div>

            <div className="relative p-6 font-mono text-left text-sm space-y-4 min-h-[280px]">
                {lines.map((line, index) => (
                    index <= currentLineIndex && (
                        <div key={index} className={getLineStyle(index)}>
                            <p>
                                {index === currentLineIndex ? typedText : line}
                                {index === currentLineIndex && <span className="animate-pulse ml-1">▊</span>}
                            </p>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

// Main Landing Page
const LandingPage: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="relative w-screen min-h-screen bg-cover bg-[url(src/assets/HeroGradient.png)] bg-[#0d0b1e] text-white overflow-x-hidden font-sans">
            {/* Raining Binary Background */}
            <RainingBinary />

            <div className="relative z-10">
                {/* Header */}
                <Header>
                    <nav className="hidden md:flex items-center gap-6 text-gray-300">
                        <Link to="#" className="hover:text-white transition-colors relative group">
                            Features
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link to="#" className="hover:text-white transition-colors relative group">
                            About
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link to="#" className="hover:text-white transition-colors relative group">
                            Contact
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => window.location.href = '/login'}
                            className="px-4 py-2 rounded-md hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/20"
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => window.location.href = '/sign-up'}
                            className="relative px-6 py-2 bg-teal-500 rounded-md hover:bg-teal-600 transition-all duration-300 font-semibold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105"
                        >
                            Get Started
                        </button>
                    </div>
                </Header>

                {/* Hero Section */}
                <main className="flex-1 flex flex-col lg:flex-row items-center justify-center px-8 py-20 gap-16 text-center lg:text-left min-h-screen">
                    <div className={`w-full max-w-xl lg:max-w-2xl space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                        <span className="inline-block px-4 py-2 text-sm text-teal-300 bg-teal-500/20 rounded-full border border-teal-500/30 backdrop-blur-sm hover:bg-teal-500/30 transition-all duration-300">
                            Your AI-powered developer logbook
                        </span>
                        
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
                            <span className="inline-block hover:scale-105 transition-transform duration-300">Code it.</span>
                            <br />
                            <span className="green-text-gradient inline-block hover:scale-105 transition-transform duration-300">Log it.</span>
                            <br />
                            <span className="blue-text-gradient inline-block hover:scale-105 transition-transform duration-300">Search it.</span>
                        </h1>
                        
                        <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                            Transform your documentation into a searchable knowledge base. Log documents, get AI insights, and build solutions that grow with you.
                        </p>
                        
                        <div className="flex gap-4 justify-center lg:justify-start items-center flex-wrap">
                            <button
                                onClick={() => window.location.href = '/sign-up'}
                                className="flex items-center gap-3 px-8 py-4 bg-teal-500 rounded-xl hover:bg-teal-600 transition-all duration-300 font-semibold shadow-2xl shadow-teal-500/40 hover:shadow-teal-500/60 hover:scale-105"
                            >
                                Start Debugging
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </button>
                            
                            <button className="group flex items-center gap-3 px-8 py-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                                Watch Demo
                            </button>
                        </div>
                    </div>

                    <div className={`w-full -mt-30 max-w-lg flex flex-col items-center lg:items-start relative ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
                        
                        {/* Robot Mascot */}
                        <div className="relative z-20 -mb-7 -ml-25 hover:scale-110 transition-transform duration-300">
                            <RobotMascot />
                        </div>
                        
                        {/* Terminal */}
                        <div className="relative z-10 w-full">
                            <AnimatedTerminal />
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="px-8 py-12 mt-50 border-t border-gray-800">
                    <div className="max-w-7xl mx-auto text-center text-gray-400">
                        <p>&copy; 2025 devDiary. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default LandingPage;