import React, { useState, useMemo, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Nav from 'components/NavBar/Nav';
import StatusTag from 'components/StatusTag';

interface Log {
    _id: string;
    title: string;
    status: string;
    createdAt: string; 
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

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date()); 
    const [selectedDayLogs, setSelectedDayLogs] = useState<Log[]>([]);
    const navigate = useNavigate();

    const [allLogs, setAllLogs] = useState<Log[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('http://localhost:5000/api/logs'); // Fetches all logs
                if (!res.ok) {
                    throw new Error('Failed to fetch logs');
                }
                const data: Log[] = await res.json();
                setAllLogs(data);
            } catch (err) {
                console.error("Error fetching logs:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLogs();
    }, []); // Runs once when the page loads

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    // Group logs by their creation date
    const logsByDate = useMemo(() => {
        const map = new Map<string, Log[]>();
        allLogs.forEach(log => {
            const date = new Date(log.createdAt).toDateString();
            if (!map.has(date)) {
                map.set(date, []);
            }
            map.get(date)?.push(log);
        });
        return map;
    }, [allLogs]); 

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
            <div className="grid grid-cols-[200px_auto] bg-[#0F172A] bg-[url(src/assets/Variant6.svg)] bg-cover h-screen w-screen text-white font-sans">
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
                                    const isSelected = selectedDayLogs.length > 0 && dayString === new Date(selectedDayLogs[0].createdAt).toDateString();
                                    
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
                                {selectedDayLogs.length > 0 ? `Logs for ${new Date(selectedDayLogs[0].createdAt).toLocaleDateString()}` : 'Select a Day'}
                            </h2>
                            <div className="space-y-3 overflow-y-auto max-h-[calc(100%-40px)]">
                                {isLoading ? (
                                    <p className="text-gray-400">Loading logs...</p>
                                ) : selectedDayLogs.length > 0 ? (
                                    selectedDayLogs.map(log => (
                                        <div 
                                            key={log._id} 
                                            className="p-3 bg-black/30 rounded-lg border border-gray-700 cursor-pointer hover:bg-teal-500/20"
                                            // Navigate using query params instead of state
                                            onClick={() => navigate(`/view-log?id=${log._id}`)}
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
    );
};

export default Calendar;