import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPages.tsx';
import Logo from 'components/Logo.tsx';
import Header from 'components/Header.tsx';

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

            // When a line is fully typed
            if (!isDeleting && displayedText === currentLine) {
                // If it's the last line, reset to loop
                if (currentLineIndex === lines.length - 1) {
                    setTimeout(() => {
                        setCurrentLineIndex(0);
                        setDisplayedText('');
                    }, pause * 2); // Longer pause at the end of the loop
                } else {
                    // Otherwise, move to the next line
                    setTimeout(() => {
                        setCurrentLineIndex(prev => prev + 1);
                        setDisplayedText('');
                    }, 
                    pause);
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
    const currentLineIndex = lines.findIndex(line => line.startsWith(typedText.substring(0,10)) && typedText.length > 0)

    const getLineStyle = (index: number) => {
        const lineContent = lines[index];
        if (lineContent.startsWith("Error:")) return "bg-red-500/20 text-red-300 p-3 rounded-md";
        if (lineContent.startsWith("Suggested fixes:")) return "bg-green-500/20 text-green-300 p-3 rounded-md";
        if (lineContent.startsWith("AI Analysis")) return "text-purple-300";
        if (lineContent.startsWith("Go to log")) return "bg-teal-500 text-white w-fit px-4 py-2 rounded-md mx-auto my-2";
        if (lineContent.includes("package.json")) return "bg-gray-700/50 p-2 rounded-md font-mono text-sm";
        return "text-gray-400";
    };

    return (
        <div className="bg-gray-900/50 border border-teal-500/20 rounded-xl shadow-2xl backdrop-blur-lg w-full max-w-lg">
            <div className="flex items-center p-3 border-b border-gray-700">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-grow text-center text-sm text-gray-400">new-dev-log</div>
                 <div className="flex items-center gap-2 text-xs text-teal-400">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                    </span>
                    AI Active
                </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-left text-sm space-y-4 min-h-[280px]">
                {lines.map((line, index) => (
                    index <= currentLineIndex && (
                        <div key={index} className={getLineStyle(index)}>
                            <p>
                                {index === currentLineIndex ? typedText : line}
                                {index === currentLineIndex && <span className="animate-pulse">_</span>}
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
    return (
        
            <div className="w-screen h-screen bg-cover bg-[url(src/assets/HeroGradient.png)] bg-[#0d0b1e] text-white overflow-hidden overflow-y-scroll flex flex-col font-sans">
                {/* Header */}
                <Header >
                    <nav className="hidden md:flex items-center gap-6 text-gray-300">
                      <Link to="#" className="hover:text-white transition-colors">Features</Link>
                      <Link to="#" className="hover:text-white transition-colors">About</Link>
                      <Link to="#" className="hover:text-white transition-colors">Contact</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                    <button onClick={() => window.location.href = '/login'}
                      className="px-4 py-2 rounded-md hover:bg-white/10 transition-colors">
                        Login
                    </button>
                    <button onClick={() => window.location.href = '/sign-up'}
                      className="px-4 py-2 bg-teal-500 rounded-md hover:bg-teal-600 transition-colors font-semibold">Get Started</button>
                  </div>
                </Header>

                {/* Hero Section */}
                <main className="flex-1 flex flex-col lg:flex-row items-center justify-center p-8 gap-12 text-center lg:text-left">
                    {/* Left Column */}
                    <div className="w-screen max-w-xl lg:max-w-2xl">
                        <span className="inline-block px-3 py-1 mb-4 text-sm text-teal-300 bg-teal-500/20 rounded-full border border-teal-500/30">
                            Your AI-powered developer logbook
                        </span>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                            Document.<br/>
                            Debug.<br/>
                            Conquer.
                        </h2>
                        <p className="mt-6 text-lg text-gray-400 max-w-lg">
                            Transform your debugging experience into a searchable knowledge base. Log errors, get AI insights, and build solutions that grow with you.
                        </p>
                        <div className="mt-8 flex gap-4 justify-center lg:justify-start">
                            <button 
                                onClick={() => window.location.href = '/sign-up'}
                                className="flex items-center gap-2 px-6 py-3 bg-teal-500 rounded-md hover:bg-teal-600 transition-colors font-semibold">
                                Start Debugging
                                {/* Arrow Icon */}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </button>
                            <button className="px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-md hover:bg-gray-800 transition-colors">Watch Demo</button>
                        </div>
                    </div>
                    
                    {/* Right Column */}
                    <div className="w-full max-w-lg mt-8 lg:mt-0">
                        <AnimatedTerminal />
                    </div>
                </main>
            </div>
        
    );
};

export default LandingPage;
