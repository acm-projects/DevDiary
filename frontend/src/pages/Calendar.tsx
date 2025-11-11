import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPages';
import Nav from 'components/NavBar/Nav';
import StatusTag from 'components/StatusTag';

interface Log {
    _id: string;
    title: string;
    status: string;
    creationDate: string;
    project: string;
    tags: string[];
    type: string;
    sections: {
        error: string;
        code: string;
        solution: string;
        resources: string;
        comments: string;
    };
    author: {
        initials: string;
        name: string;
    };
}

const hardcodedLogs: Log[] = [
    {
        _id: "1",
        title: "Fixed CSS Grid on Firefox",
        status: "Completed",
        creationDate: "2025-10-31T10:30:00Z", // Today
        project: "Company Website",
        tags: ["css", "firefox", "bug"],
        type: "Bug",
        sections: { error: "Grid was misaligned", code: "display: grid;", solution: "Used a prefix", resources: "", comments: "" },
        author: { initials: "JD", name: "John Doe" }
    },
    {
        _id: "2",
        title: "Database connection timeout",
        status: "In Progress",
        creationDate: "2025-10-28T14:00:00Z", // A few days ago
        project: "Backend API",
        tags: ["database", "mongo", "timeout"],
        type: "Bug",
        sections: { error: "Server can't reach DB", code: "mongoose.connect()", solution: "Check firewall rules", resources: "", comments: "" },
        author: { initials: "JD", name: "John Doe" }
    },
    {
        _id: "3",
        title: "Set up new React components",
        status: "Completed",
        creationDate: "2025-10-28T16:00:00Z", // Same day
        project: "Frontend Dashboard",
        tags: ["react", "feature"],
        type: "Feature",
        sections: { error: "", code: "export default Component", solution: "Created new files", resources: "", comments: "" },
        author: { initials: "JD", name: "John Doe" }
    },
    {
        _id: "4D",
        title: "Plan new auth flow",
        status: "On Hold",
        creationDate: "2025-10-15T09:00:00Z", // Earlier this month
        project: "Mobile App",
        tags: ["auth", "planning"],
        type: "Feature",
        sections: { error: "", code: "", solution: "", resources: "jwt.io", comments: "Need to discuss with team" },
        author: { initials: "JD", name: "John Doe" }
    }
];

// Helper to generate the days for the current month
const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
};

// Helper to get the starting day of the week (0 = Sunday, 1 = Monday, etc.)
const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
};

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date("2025-10-31T12:00:00Z")); // Set to the app's date
    const [selectedDayLogs, setSelectedDayLogs] = useState<Log[]>([]);
    const navigate = useNavigate();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    // Group logs by their creation date
    const logsByDate = useMemo(() => {
        const map = new Map<string, Log[]>();
        // Using the hardcoded logs array (for now)
        hardcodedLogs.forEach(log => {
            const date = new Date(log.creationDate).toDateString();
            if (!map.has(date)) {
                map.set(date, []);
            }
            map.get(date)?.push(log);
        });
        return map;
    }, []); 

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
        setSelectedDayLogs([]);
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
        setSelectedDayLogs([]);
    };

    const handleDayClick = (day: Date) => {
        const logsForDay = logsByDate.get(day.toDateString()) || [];
        setSelectedDayLogs(logsForDay);
    };
    
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <AnimatedPage>
            <div className="grid grid-cols-[200px_auto] bg-[#0F172A] bg-[url(src/assets/Variant6.svg)]  bg-cover h-screen w-screen text-white font-sans">
                {/* Navigation Sidebar */}
                <div className="sticky top-0 h-screen">
                    <Nav />
                </div>

                {/* Main Content */}
                <main className="relative h-screen overflow-y-auto p-8 flex gap-6">
                    {/* Calendar View */}
                    <div className="flex-1 max-w-4xl">
                    
                            <div className="mt-[30px] flex justify-center items-center gap-4">
                                <h1 className="text-3xl font-bold">{monthName} {year}</h1>
                                <button onClick={handlePrevMonth} className="px-3 py-1 bg-white/10 rounded-md hover:bg-white/20">&lt;</button>
                                <button onClick={handleNextMonth} className="px-3 py-1 bg-white/10 rounded-md hover:bg-white/20">&gt;</button>
                            </div>

                        <div className="mt-6 bg-[#1E293B]/60 border border-teal-500/20 rounded-2xl p-6 backdrop-blur-sm shadow-lg shadow-teal-500/10">
                            {/* Weekday Headers */}
                            <div className="grid grid-cols-7 gap-2 mb-2">
                                {weekDays.map(day => (
                                    <div key={day} className="text-center font-semibold text-gray-400 text-sm">{day}</div>
                                ))}
                            </div>
                            
                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-2">
                                {/* Empty cells for the start of the month */}
                                {Array.from({ length: firstDay }).map((_, index) => (
                                    <div key={`empty-${index}`} className="border border-transparent rounded-lg"></div>
                                ))}

                                {/* Day cells */}
                                {daysInMonth.map(day => {
                                    const dayString = day.toDateString();
                                    const logsForThisDay = logsByDate.get(dayString) || [];
                                    const isSelected = selectedDayLogs.length > 0 && dayString === new Date(selectedDayLogs[0].creationDate).toDateString();
                                    
                                    return (
                                        <div 
                                            key={dayString} 
                                            className={`h-24 p-2 border rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-teal-500/30 border-teal-400' : 'border-gray-700/50 bg-black/20 hover:bg-white/10'}`}
                                            onClick={() => handleDayClick(day)}
                                        >
                                            <span className="font-semibold">{day.getDate()}</span>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {logsForThisDay.map(log => (
                                                    <span 
                                                        key={log._id} 
                                                        className={`w-2 h-2 rounded-full ${
                                                            log.status === 'Completed' ? 'bg-green-500' : 
                                                            log.status === 'In Progress' ? 'bg-yellow-500' : 'bg-gray-500'
                                                        }`}
                                                        title={log.title}
                                                    ></span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    
                    {/* Log Details Sidebar */}
                    <div className="w-80 flex-shrink-0 mt-[88px]"> 
                        <div className="bg-[#1E293B]/60 border border-teal-500/20 rounded-2xl p-6 backdrop-blur-sm shadow-lg shadow-teal-500/10 h-full">
                            <h2 className="text-xl font-semibold mb-4">
                                {selectedDayLogs.length > 0 ? `Logs for ${new Date(selectedDayLogs[0].creationDate).toLocaleDateString()}` : 'Select a Day'}
                            </h2>
                            <div className="space-y-3 overflow-y-auto max-h-[calc(100%-40px)]">
                                {selectedDayLogs.length > 0 ? (
                                    selectedDayLogs.map(log => (
                                        <div 
                                            key={log._id} 
                                            className="p-3 bg-black/30 rounded-lg border border-gray-700 cursor-pointer hover:bg-teal-500/20"
                                            // Passing the full log object to ViewLog
                                            onClick={() => navigate('/view-log', { state: { logData: log } })}
                                        >
                                            <p className="font-semibold truncate">{log.title}</p>
                                            <div className="flex justify-start mt-5">
                                                <StatusTag status={log.status} />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400">Select a day to see logs.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AnimatedPage>
    );
};

export default Calendar;

