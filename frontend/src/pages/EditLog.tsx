import { useLocation, useNavigate } from 'react-router-dom';
import Cancel from '../components/Cancel';
import Save from '../components/Save';
import Profile from '../components/Profile';
import Header from '../components/Header';
import AiSideNavBar from '../components/AiSideNavBar';
import React from 'react';
import { useState, useEffect } from 'react'; 
import TypeTag from 'components/TypeTag';
import StatusTag from 'components/StatusTag';
import AnimatedPage from 'components/AnimatedPages';

interface LogData {
    _id?: string; 
    title: string;
    project: string;
    tags: string; 
    status: string;
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
    creationDate: string;
}

const sectionStyles: { [key: string]: { border: string; text: string; borderB: string; } } = {
    'Error': { border: 'border-[#ff0000]', text: 'text-red-500', borderB: 'border-red-500' },
    'Code Snippets': { border: 'border-blue-500', text: 'text-blue-500', borderB: 'border-blue-500' },
    'Solution': { border: 'border-green-500', text: 'text-green-500', borderB: 'border-green-500' },
    'Resources': { border: 'border-purple-500', text: 'text-purple-500', borderB: 'border-purple-500' },
    'Comments': { border: 'border-gray-500', text: 'text-gray-500', borderB: 'border-gray-500' },
    'AI Insights': { border: 'border-teal-400', text: 'text-teal-400', borderB: 'border-teal-400' },
};
const defaultStyle = sectionStyles['Comments'];


const Section: React.FC<{
    section: string;
    content: string;
    onContentChange: (newContent: string) => void;
}> = ({ section, content, onContentChange }) => {
    const style = sectionStyles[section] || defaultStyle;

    return (
        <div className="w-full h-full flex flex-col">
            <div className={`flex-grow bg-black/50 rounded-[10px] border ${style.border}`}>
                <textarea
                    value={content}
                    onChange={(e) => onContentChange(e.target.value)}
                    className="w-full h-full p-4 bg-transparent text-white text-[16px] leading-6 resize-none outline-none"
                    placeholder={`Details for ${section}...`}
                />
            </div>
        </div>
    );
};

function EditLog() {
    const location = useLocation();
    const state = location.state as { logData: LogData };
    const [activeSection, setActiveSection] = useState('error'); 
    const navigate = useNavigate(); 

    // Default log data structure in case no data is passed (for a new log)
    const defaultLogData: LogData = {
        title: 'Untitled Log',
        project: 'Untitled Project',
        tags: '', // Start with an empty string
        status: 'In Progress',
        type: 'Feature',
        sections: { error: '', code: '', solution: '', resources: '', comments: '' },
        author: { initials: 'JD', name: 'John Doe' }, 
        creationDate: new Date().toISOString(),
    };

    const [logData, setLogData] = useState<LogData | null>(null);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    
    useEffect(() => {
        const passedData = state?.logData;

        if (passedData) {
            if (passedData._id) {
                console.log("Editing existing log, fetching data...", passedData._id);
                fetch(`/api/logs/${passedData._id}`)
                    .then(res => {
                        if (res.ok) return res.json();
                        throw new Error('Failed to fetch log');
                    })
                    .then(data => {
                        // Convert tags array back to string for the input
                        setLogData({ ...data, tags: data.tags.join(', ') });
                    })
                    .catch(err => {
                        console.error("Error fetching log:", err);
                        // Fallback to the passed data if fetch fails
                        setLogData({ ...passedData, tags: Array.isArray(passedData.tags) ? passedData.tags.join(', ') : passedData.tags });
                    });
            } else {

                console.log("Creating new log, merging passed data with defaults...");
                const tagsAsString = Array.isArray(passedData.tags) ? passedData.tags.join(', ') : passedData.tags;
                
                // This merge ensures fields from QuickLog (like sections) are kept,
                // and fields from LogMetaData are added to the defaults.
                setLogData({
                    ...defaultLogData, 
                    ...passedData,     
                    tags: tagsAsString 
                });
            }
        } else {
            console.log("Creating new blank log...");
            setLogData(defaultLogData);
        }
    }, [state?.logData]); // Re-run if the passed-in state changes
    

    if (!logData) {
        return (
            <div className="w-screen h-screen bg-[#0d0b1e] text-white flex items-center justify-center">
                <p className="text-xl">Loading Editor...</p>
            </div>
        );
    }

    const creationDate = new Date(logData.creationDate); 

    const navLinks = [
        { id: 'error', label: 'Error' },
        { id: 'code', label: 'Code Snippets' },
        { id: 'solution', label: 'Solution' },
        { id: 'resources', label: 'Resources' },
        { id: 'comments', label: 'Comments' },
        { id: 'ai-insights', label: 'AI Insights' },
    ];

    const handleTitleChange = (newTitle: string) => {
        setLogData(prev => prev ? ({ ...prev, title: newTitle }) : null);
    };

    const handleSectionChange = (sectionId: keyof LogData['sections'], content: string) => {
        setLogData(prev => prev ? ({
            ...prev,
            sections: {
                ...prev.sections,
                [sectionId]: content
            }
        }) : null);
    };

    const handleSave = async () => {
        if (!logData) return; // Guard clause

        // Determine if this is a new log or an update
        const isUpdating = !!logData._id;
        
        const url = isUpdating ? `/api/logs/${logData._id}` : '/api/logs';
        const method = isUpdating ? 'PUT' : 'POST';

        console.log(`Attempting to ${method} log at ${url}`);

        try {
            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logData), // Send the whole logData object
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to save log');
            }

            const savedLog = await res.json();

            // After saving, navigate to the ViewLog page for the log
            const logToView = isUpdating ? savedLog.log : savedLog; 
            
            console.log('Save successful, navigating to view log');
            navigate(`/view-log`, { state: { logData: logToView } });

        } catch (err) {
            console.error("Error saving log:", err);
            // Don't use alert in production
            alert(`Error: ${err.message}`);
        }
    };


    // Parse tags string into tagsArray for display
    const tagsArray = logData.tags.split(',').map(tag => tag.trim()).filter(Boolean);

    return (
        <AnimatedPage>
        <div className="w-screen h-screen bg-[#0d0b1e] bg-[url(src/assets/Variant8.png)] text-white overflow-hidden flex flex-grow flex-col font-sans">
            <Header>
                <div className="flex items-center gap-4">
                    <p className="font-semibold text-xl">{logData.project}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Cancel />
                    <Save onClick={handleSave} />
                    <Profile />
                </div>
            </Header>

            <div className="flex flex-1 overflow-hidden p-4 sm:p-6 lg:p-8 gap-6">
                <AiSideNavBar />
                <main className="flex-grow flex-1 overflow-hidden bg-[#1E293B]/60 border border-teal-500/20 rounded-2xl p-6 backdrop-blur-sm shadow-lg shadow-teal-500/10 flex flex-col">
                    
                    <div className="flex justify-between items-start mb-4">
                        {/* Left block (Title + Author/Date) */}
                        <div className="flex flex-col items-start space-y-2 mr-4 min-w-0">
                            {isEditingTitle ? (
                                <input
                                    type="text"
                                    value={logData.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    onBlur={() => setIsEditingTitle(false)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); setIsEditingTitle(false); } }}
                                    className="font-semibold text-2xl bg-transparent border-b border-teal-400 outline-none text-white"
                                    autoFocus
                                />
                            ) : (
                                <p
                                    className="font-semibold text-2xl cursor-pointer truncate"
                                    onClick={() => setIsEditingTitle(true)}
                                >
                                    {logData.title}
                                </p>
                            )}
                            <div className="flex items-center gap-x-3 text-sm text-gray-400">
                                <span><strong>{logData.author.initials}</strong> {logData.author.name}</span>
                                <span>{creationDate.toLocaleDateString()}</span> 
                                <span>{creationDate.toLocaleTimeString()}</span>
                            </div>
                        </div>

                        {/* Right block (Status + Tags) */}
                        <div className="flex-shrink-0 flex flex-col items-end space-y-2">
                            <StatusTag status={logData.status} />
                            <div className="flex flex-wrap justify-end gap-2 max-w-xs">
                                <TypeTag type={logData.type} />
                                {tagsArray.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <nav className="w-full overflow-x-auto mt-2 p-1 border-b border-solid border-white/20 ">
                        <ul className="flex items-center gap-8 text-white">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.id;
                                const style = sectionStyles[link.label] || defaultStyle;
                                const activeClasses = `${style.text} border-b-2 ${style.borderB}`;
                                const inactiveClasses = 'text-gray-400 hover:text-white';
                                return (
                                    <li key={link.id}>
                                        <button
                                            type='button'
                                            onClick={() => setActiveSection(link.id)}
                                            className={`block p-2 font-semibold transition-colors ${isActive ? activeClasses : inactiveClasses}`}>
                                            {link.label}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="flex-grow pt-4 flex">
                        {activeSection === 'error' && <Section section="Error" content={logData.sections.error} onContentChange={(c) => handleSectionChange('error', c)} />}
                        {activeSection === 'code' && <Section section="Code Snippets" content={logData.sections.code} onContentChange={(c) => handleSectionChange('code', c)} />}
                        {activeSection === 'solution' && <Section section="Solution" content={logData.sections.solution} onContentChange={(c) => handleSectionChange('solution', c)} />}
                        {activeSection === 'resources' && <Section section="Resources" content={logData.sections.resources} onContentChange={(c) => handleSectionChange('resources', c)} />}
                        {activeSection === 'comments' && <Section section="Comments" content={logData.sections.comments} onContentChange={(c) => handleSectionChange('comments', c)} />}
                    </div>
                </main>
            </div>
        </div>
    </AnimatedPage>
    );
};

export default EditLog;