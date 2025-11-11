import { useLocation, useNavigate } from 'react-router-dom';
import Cancel from '../components/Cancel';
import Save from '../components/Save';
import Profile from '../components/Profile';
import Header from '../components/Header';
import AiSideNavBar from '../components/AiSideNavBar';
import React from 'react';
import { useState } from 'react';
import TypeTag from 'components/TypeTag';
import StatusTag from 'components/StatusTag';
import AnimatedPage from 'components/AnimatedPages';

const sectionStyles: { [key: string]: { border: string; text: string; borderB: string; } } = {
    'Error': { border: 'border-[#ff0000]', text: 'text-red-500', borderB: 'border-red-500' },
    'Code Snippets': { border: 'border-blue-500', text: 'text-blue-500', borderB: 'border-blue-500' },
    'Solution': { border: 'border-green-500', text: 'text-green-500', borderB: 'border-green-500' },
    'Resources': { border: 'border-purple-500', text: 'text-purple-500', borderB: 'border-purple-500' },
    'Comments': { border: 'border-gray-500', text: 'text-gray-500', borderB: 'border-gray-500' },
    'AI Insights': { border: 'border-teal-400', text: 'text-teal-400', borderB: 'border-teal-400' },
};
const defaultStyle = sectionStyles['Comments'];


// Log data structure
interface LogData {
    _id?: string; // given by mongodb
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

// Section component for each editable section
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
    const [activeSection, setActiveSection] = useState('error'); // sets error as the default active section
    const navigate = useNavigate();


    // Default log data structure in case no data is passed
    const defaultLogData: LogData = {
        title: 'Untitled Log',
        project: 'Untitled Project',
        tags: '',
        status: 'In Progress',
        type: 'Feature',
        sections: { error: '', code: '', solution: '', resources: '', comments: '' },
        author: { initials: 'JD', name: 'John Doe' }, // Hardcoded author (for now, until we connect to user auth/database)
        creationDate: new Date().toISOString(), // Capture creation time
    };

    // Merge/replace the default log data with any data passed in 
    const initialLogData: LogData = {
        ...defaultLogData,
        ...state?.logData,
    };

    const [creationDate] = useState(new Date(initialLogData.creationDate));  // get current date and time

    // Navigation links for sections
    const navLinks = [
        { id: 'error', label: 'Error' },
        { id: 'code', label: 'Code Snippets' },
        { id: 'solution', label: 'Solution' },
        { id: 'resources', label: 'Resources' },
        { id: 'comments', label: 'Comments' },
        { id: 'ai-insights', label: 'AI Insights' },
    ]

    const [title, setTitle] = useState(initialLogData.title);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [sectionsContent, setSectionsContent] = useState(initialLogData.sections);

    // Handles content changes for each section
    const handleSectionChange = (sectionId: keyof LogData['sections'], content: string) => {
        setSectionsContent(prev => ({ ...prev, [sectionId]: content }));
    };

// Find out if creating a new log or just editing an existing one
    // const handleSave = async () => {
    //     const updatedLogData: LogData = {
    //         ...initialLogData,
    //         title: title,
    //         sections: sectionsContent,
    //     };

    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         alert("You are not logged in!");
    //         navigate("/login");
    //         return;
    //     }

    //     // If the log already has an `_id`, update it
    //     if (updatedLogData._id) {
    //         await handleUpdate(updatedLogData, token);
    //     } else {
    //         // Otherwise, create it
    //         await handleCreate(updatedLogData, token);
    //     }
    // };

// Creates a new log
    // const handleCreate = async (logData: LogData, token: string) => {
    //     try {
    //         const res = await fetch("http://localhost:5001/api/logs", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             },
    //             body: JSON.stringify(logData),
    //         });

    //         const data = await res.json();
    //         if (!res.ok) {
    //             throw new Error(data.message || "Failed to create log");
    //         }

    //         navigate('/view-log', { state: { logData: data } });

    //     } catch (err: any) {
    //         console.error("Error creating log:", err);
    //         alert(`Error: ${err.message}`);
    //     }
    // };

// Updates an existing log
    // const handleUpdate = async (logData: LogData, token: string) => {
    //     try {
    //         const res = await fetch(`http://localhost:5001/api/logs/${logData._id}`, {
    //             method: "PUT", 
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             },
    //             body: JSON.stringify(logData),
    //         });

    //         const data = await res.json();
    //         if (!res.ok) {
    //             throw new Error(data.message || "Failed to update log");
    //         }

    //         navigate('/view-log', { state: { logData: data.log } });

    //     } catch (err: any) {
    //         console.error("Error updating log:", err);
    //         alert(`Error: ${err.message}`);
    //     }
    // };


    // When clicking the save button, navigate to ViewLog page with updated log data
    const handleSave = () => {
        const updatedLogData: LogData = {
            ...initialLogData,
            title: title,
            sections: sectionsContent,
        };
        navigate('/view-log', { state: { logData: updatedLogData } });
    };


    // Parse tags into tagsArrya
    const tagsArray = initialLogData.tags.split(',').map(tag => tag.trim()).filter(Boolean);

    return (
        <AnimatedPage>
            <div className="w-screen h-screen bg-[#0d0b1e] bg-[url(src/assets/Variant8.png)] text-white overflow-hidden flex flex-grow flex-col font-sans">

                {/* Header */}
                <Header>
                    <div className="flex items-center gap-4">
                        <p className="font-semibold text-xl">{initialLogData.project}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Cancel />
                        <Save //onClick={handleSave} 
                            onClick={handleSave}
                        />
                        <Profile />
                    </div>
                </Header>


                {/* Editor & Siderbar  */}
                <div className="flex flex-1 overflow-hidden p-4 sm:p-6 lg:p-8 gap-6">

                    {/* AI Sidebar */}
                    <AiSideNavBar />

                    {/* Main Area for the Editor */}
                    <main className="flex-grow flex-1 overflow-hidden bg-[#1E293B]/60 border border-teal-500/20 rounded-2xl p-6 backdrop-blur-sm shadow-lg shadow-teal-500/10 flex flex-col">

                        <div className="flex justify-between items-start mb-4">

                            <div className="flex flex-col items-start space-y-2 mr-4 min-w-0">
                                {/* Title */}
                                {isEditingTitle ? (
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        onBlur={() => setIsEditingTitle(false)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                setIsEditingTitle(false);
                                            }
                                        }}
                                        className="font-semibold text-2xl bg-transparent border-b border-teal-400 outline-none text-white"
                                        autoFocus
                                    />
                                ) : (
                                    <p
                                        className="font-semibold text-2xl cursor-pointer truncate"
                                        onClick={() => setIsEditingTitle(true)}
                                    >
                                        {title}
                                    </p>
                                )}

                                {/* Author/Date Info (under title) */}
                                <div className="flex items-center gap-x-3 text-sm text-gray-400">
                                    <span><strong>{initialLogData.author.initials}</strong> {initialLogData.author.name}</span>
                                    <span>{creationDate.toLocaleDateString()}</span>
                                    <span>{creationDate.toLocaleTimeString()}</span>
                                </div>
                            </div>

                            {/*Right block (Status + Tags) */}
                            <div className="flex-shrink-0 flex flex-col items-end space-y-2">
                                <StatusTag status={initialLogData.status} />

                                {/* Tags*/}
                                <div className="flex flex-wrap justify-end gap-2 max-w-xs">
                                    <TypeTag type={initialLogData.type} />
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
                            {activeSection === 'error' && <Section section="Error" content={sectionsContent.error} onContentChange={(c) => handleSectionChange('error', c)} />}
                            {activeSection === 'code' && <Section section="Code Snippets" content={sectionsContent.code} onContentChange={(c) => handleSectionChange('code', c)} />}
                            {activeSection === 'solution' && <Section section="Solution" content={sectionsContent.solution} onContentChange={(c) => handleSectionChange('solution', c)} />}
                            {activeSection === 'resources' && <Section section="Resources" content={sectionsContent.resources} onContentChange={(c) => handleSectionChange('resources', c)} />}
                            {activeSection === 'comments' && <Section section="Comments" content={sectionsContent.comments} onContentChange={(c) => handleSectionChange('comments', c)} />}
                        </div>
                    </main>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default EditLog;