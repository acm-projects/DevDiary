import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import AiSideNavBar from '../components/AiSideNavBar';
import Profile from '../components/Profile';


interface LogData {
    title: string;
    project: string;
    status: string;
    tags: string;
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

// Status tag component with different colors based on status
const StatusTag: React.FC<{ status: string }> = ({ status }) => {
    const statusStyles: { [key: string]: string } = {
        'In Progress': 'bg-amber-200/20 text-yellow-300 border border-amber-300',
        'Completed': 'bg-green-500/20 text-green-300 border border-green-400',
        'On Hold': 'bg-gray-500/20 text-gray-300 border border-gray-400',
    };
    const style = statusStyles[status] || statusStyles['On Hold'];
    return <span className={`px-3 py-1 text-xs font-medium rounded-full ${style}`}>{status}</span>;
};

const SectionView: React.FC<{ title: string, content: string, colorClassName: string }> = ({ title, content, colorClassName }) => (
    <div className="bg-[#1E293B]/70 p-6 rounded-xl border border-gray-700">
        <h2 className={`text-xl font-semibold mb-4 ${colorClassName}`}>{title}</h2>
        <pre className="bg-black/30 p-4 rounded-md text-gray-300 text-sm whitespace-pre-wrap font-sans">
            <code>{content || `No content provided for ${title}.`}</code>
        </pre>
    </div>
);

function ViewLog(){
    const location = useLocation();
    const state = location.state as { logData: LogData };

    // Get log data from edit log page
    const logData: LogData = state?.logData || {
        title: 'Default Title: Log Not Found',
        project: 'Default Project',
        status: 'On Hold',
        tags: 'default',
        sections: { error: '', code: '', solution: '', resources: '', comments: '' },
        author: { initials: 'N/A', name: 'No Author' },  // Default author info for now, until we can connect to user auth/database
        creationDate: new Date().toISOString(),
    };

    const tagsArray = logData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    const creationDate = new Date(logData.creationDate);

    return (
        <div className="w-screen h-screen bg-[#011522] text-white overflow-hidden flex flex-col font-sans">

            {/* Header */}
            <div className="border-b py-1 border-solid border-[#ffffff33]/30 bg-cover bg-[#011522] bg-[url(src/assets/Variant6.svg)] text-white overflow-hidden"> 
            <Header>
                <div className="flex items-center gap-4">
                    <p className="font-semibold text-xl">{logData.project}</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-[#2D3748]/50 rounded-md border border-gray-600 hover:bg-gray-700 transition-colors text-sm">Share</button>
                    <Link to="/edit-log" state={{ logData: logData }} className="px-4 py-2 bg-[#2D3748]/50 rounded-md border border-gray-600 hover:bg-gray-700 transition-colors text-sm">
                        Edit
                    </Link>
                    <button className="px-4 py-2 bg-red-600/80 hover:bg-red-600 rounded-md transition-colors text-sm font-semibold">Delete</button>
                    <Profile />
                </div>
            </Header>
            </div>

            <div className="flex flex-1 overflow-hidden p-4 sm:p-6 lg:p-8 gap-6">
                <AiSideNavBar />
                <main className="flex-grow flex-1 overflow-y-auto bg-[#011522] bg-[url(src/assets/Variant6.svg)] rounded-xl border border-gray-700 p-6 space-y-6">
                    
                    {/* Log Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-3">{logData.title}</h1>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400 mb-4">
                            <span><strong>{logData.author.initials}</strong> {logData.author.name}</span>
                            <span>{creationDate.toLocaleDateString()}</span>
                            <span>{creationDate.toLocaleTimeString()}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <StatusTag status={logData.status} />
                            {tagsArray.map((tag, index) => (
                                <span key={index} className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    {/* Sections */}
                    <SectionView title="Error Message" content={logData.sections.error} colorClassName="text-red-400" />
                    <SectionView title="Code Snippet" content={logData.sections.code} colorClassName="text-cyan-400" />
                    <SectionView title="Solution" content={logData.sections.solution} colorClassName="text-green-400" />
                    <SectionView title="Resources" content={logData.sections.resources} colorClassName="text-purple-400" />
                    <SectionView title="Comments" content={logData.sections.comments} colorClassName="text-gray-400" />
                </main>
            </div>
        </div>
    );
};

export default ViewLog;