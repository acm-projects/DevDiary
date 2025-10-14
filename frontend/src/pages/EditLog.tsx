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

// Log data structure
interface LogData {
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
    const sectionStyles: { [key: string]: string } = {
        'Error': 'border-[#ff0000] text-red-500',
        'Code Snippets': 'border-blue-500 text-blue-500',
        'Solution': 'border-green-500 text-green-500',
        'Resources': 'border-purple-500 text-purple-500',
        'Comments': 'border-gray-500 text-gray-500',
    };
    const style = sectionStyles[section] || 'border-gray-500 text-gray-500';

    return (
        <div className="w-full h-full flex flex-col">
            <label className={`block text-left text-md font-medium mb-2 ${style}`}>{section}</label>
            <div className={`flex-grow bg-black/50 rounded-[10px] border ${style}`}>
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
    const [creationDate] = useState(new Date());  // get current date and time
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
        <div className="w-screen h-screen bg-[#011522] text-white overflow-hidden flex flex-grow flex-col font-sans">

            {/* Header */}
            {/*<div className="border-b border-solid border-[#ffffff33]/30 bg-cover bg-[#41B3A9]/15 bg-[url(src/assets/gradient2.png) overflow-hidden">*/}
            <div className="border-b py-1 border-solid border-[#ffffff33]/30 bg-cover bg-[#011522] bg-[url(src/assets/Variant6.svg)] text-white overflow-hidden">
               <Header>
                <div className="flex items-center gap-4">
                    <p className="font-semibold text-xl">{initialLogData.project}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Cancel />
                    <Save onClick={handleSave} />
                    <Profile />
                </div>
            </Header>
            </div>


            {/*  Editor & Siderbar  */}
            <div className="flex flex-1 overflow-hidden p-4 sm:p-6 lg:p-8 gap-6">

                {/* AI Sidebar */}
                <AiSideNavBar />

                {/* Main Area for the Editor */}
                <main className="flex-grow flex-1 overflow-hidden bg-[#011522] bg-[url(src/assets/Variant6.svg)] rounded-xl border border-gray-700 p-6 flex flex-col">
                    <div className="mb-4">
                        <div className="flex justify-center gap-2 items-center mb-2">
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
                                    className="font-semibold text-xl bg-transparent border-b border-teal-400 outline-none text-white"
                                    autoFocus
                                />
                            ) : (
                                <p
                                    className="font-semibold text-xl cursor-pointer"
                                    onClick={() => setIsEditingTitle(true)}
                                >
                                    {title}
                                </p>
                            )}
                            {/* Status Tag */}
                            <StatusTag status={initialLogData.status} />
                        </div>

                        {/* Author and Date Info */}
                        <div className="flex justify-center mb-5 items-center gap-x-4 gap-y-2 text-sm text-gray-400">
                            <span><strong>JD</strong> John Doe</span>
                            <span>{creationDate.toLocaleDateString()}</span> 
                            <span>{creationDate.toLocaleTimeString()}</span>
                        </div>

                        
                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                            {/* Type Tag */}
                            <TypeTag type = {initialLogData.type} />
                            <span className="text-gray-400">|</span>
                            {tagsArray.map((tag, index) => (
                                <span key={index} className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <nav className="w-full overflow-x-auto mt-4 p-1 bg-cover border-b border-solid border-white/20 ">
                            {/* Navigation Links */}
                            <ul className="flex items-center gap-30 text-white">
                                {navLinks.map((link) => (

                                    <li key={link.id}>
                                        <button
                                            type='button'
                                            onClick={() => setActiveSection(link.id)}
                                            className={`block p-2 font-semibold transition-colors ${activeSection === link.id ? 'text-teal-300 border-b-2 border-teal-300' : 'text-gray-400 hover:text-white'}`}>

                                            {link.label}

                                        </button>
                                    </li>
                                )
                                )}
                            </ul>
                        </nav>
                    </div>

                    <div className="flex-grow pt-1 flex">
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