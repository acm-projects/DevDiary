// Floating Background Component
const FloatingBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Circuit pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="circuit-small" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M 0 50 L 25 50 L 25 25 L 50 25" stroke="#14b8a6" strokeWidth="0.5" fill="none" />
                        <path d="M 50 25 L 75 25 L 75 75 L 100 75" stroke="#06b6d4" strokeWidth="0.5" fill="none" />
                        <circle cx="25" cy="50" r="2" fill="#14b8a6" />
                        <circle cx="50" cy="25" r="2" fill="#06b6d4" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#circuit-small)" />
            </svg>

            {/* Floating code symbols */}
            {['<', '>', '{', '}', '/', '*'].map((symbol, i) => (
                <div
                    key={`symbol-${i}`}
                    className="absolute text-teal-400/10 font-mono text-xl animate-float-code"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${20 + Math.random() * 10}s`
                    }}
                >
                    {symbol}
                </div>
            ))}

            {/* Tech particles */}
            {[...Array(30)].map((_, i) => (
                <div
                    key={`particle-${i}`}
                    className="absolute rounded-full animate-twinkle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                        backgroundColor: i % 3 === 0 ? '#14b8a6' : i % 3 === 1 ? '#06b6d4' : '#a78bfa',
                        opacity: Math.random() * 0.5 + 0.2,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 3}s`
                    }}
                ></div>
            ))}
        </div>
    );
};

export default FloatingBackground;