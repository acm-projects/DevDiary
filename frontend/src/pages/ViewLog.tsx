import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import AiSideNavBar from '../components/AiSideNavBar';
import Profile from '../components/Profile';
import StatusTag from 'components/StatusTag';
import TypeTag from 'components/TypeTag';
import AnimatedPage from 'components/AnimatedPages';

interface LogData {
    title: string;
    project: string;
    status: string;
    tags: string;
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

const SectionView: React.FC<{ title: string, content: string, colorClassName: string }> = ({ title, content, colorClassName }) => (
    <div className="flex flex-wrap justify-start w-full mb-10">
        <h2 className={`text-xl font-semibold mb-2 ${colorClassName}`}>{title}</h2>
        <div className="w-full flex-none"></div> {/* forces content to be on a new line */}
        <pre className="flex flex-wrap justify-start p-2 text-gray-300 text-sm whitespace-pre-wrap font-sans border-b border-gray-700 w-full">
            <p className='mt-4 mb-6'>{content || `No content provided for ${title}.`}</p>
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
        type: 'Bug',
        sections: { error: '', code: '', solution: '', resources: '', comments: '' },
        author: { initials: 'N/A', name: 'No Author' },  // Default author info for now, until we can connect to user auth/database
        creationDate: new Date().toISOString(),
    };

    const tagsArray = (logData.tags || '').split(',').map(tag => tag.trim()).filter(Boolean);
    const creationDate = new Date(logData.creationDate);

    return (
        <AnimatedPage> 
        <div className="w-screen h-screen bg-[#0d0b1e] bg-[url(src/assets/Variant8.png)] text-white overflow-hidden flex flex-col font-sans">

            {/* Header */}
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

            <div className="flex flex-1 overflow-hidden p-4 sm:p-6 lg:p-8 gap-6">
                <AiSideNavBar />
                <main className="flex-grow flex-1 overflow-hidden bg-[#1E293B]/80 border border-white/25 bg-cover bg-[url(src/assets/Variant4.svg)] rounded-2xl p-6 backdrop-blur-sm shadow-lg shadow-teal-500/10 flex flex-col">
                    
                    <div className="flex justify-between items-start mb-4">
                        
                        {/* Left block (Title + Author/Date) */}
                        <div className="flex flex-col items-start space-y-2 mr-4 min-w-0">
                            <h1 className="font-semibold text-2xl truncate" title={logData.title}>
                                {logData.title}
                            </h1>
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
                    
                    <div className="flex-grow pt-4 flex flex-col overflow-y-auto">
                        <div className="flex flex-wrap justify-start bg-black/70 p-6 rounded-xl border border-gray-700 overflow-y-auto">
                            <SectionView title="Error" content={logData.sections.error} colorClassName="text-red-400" />
                            <div className="w-full flex-none"></div> {/* forces next section to be on a new line */}
                            <SectionView title="Code Snippets" content={logData.sections.code} colorClassName="text-cyan-400" />
                            <div className="w-full flex-none"></div>
                            <SectionView title="Solution" content={logData.sections.solution} colorClassName="text-green-400" />
                            <div className="w-full flex-none"></div>
                            <SectionView title="Resources" content={logData.sections.resources} colorClassName="text-purple-400" />
                            <div className="w-full flex-none"></div>
                            <SectionView title="Comments" content={logData.sections.comments} colorClassName="text-gray-400" />
                        </div>
                    </div>
                </main>
            </div>
        </div>
        </AnimatedPage>
    );
};

export default ViewLog;