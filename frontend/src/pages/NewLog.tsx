import AiSideNavBar from '../components/AiSideNavBar';
import Editor from '../components/Editor';
import LogSideNavbar from '../components/LogSideNavBar';
import Dropdown from '../components/Dropdown';
import '../styles/index.css';
import Cancel from '../components/Cancel';
import Save from '../components/Save';
import Profile from '../components/Profile';
import Header from '../components/Header';

interface NewLogProps {
    logName?: string;     // Optional log name to highlight a specific log
    projectName?: string;
}

function NewLog({logName, projectName}: NewLogProps) {
    return (
        // The main container covers the full screen. overflow-hidden prevents scrolling issues.
        <div className="w-screen h-screen bg-center bg-cover bg-[#120F2C] bg-[url(src/assets/gradient2.png)] text-white overflow-hidden flex flex-col">

{/* HEADER SECTION */}
<div className="w-screen border-b border-solid border-[#ffffff33]/80 bg-center bg-cover bg-[#120F2C] bg-[url(src/assets/Variant6.svg)] text-white overflow-hidden flex flex-col">
<Header>
    {/* Use a React Fragment <> to group the elements without adding an extra div */}
    <>
        {/* Top left side of the header (specific to this page) */}
        <div className="flex items-center justify-between gap-4">
            <p className="font-semibold text-[1.2rem]">
                {projectName ? projectName : "Untitled Project"}
            </p>
        </div>
    
        {/* Top right side of the header (specific to this page) */}
        <div className="flex items-center gap-4">
            <div className="mr-5 flex items-center gap-4">
                <Cancel />
                <Save />
            </div>
            <Profile />
        </div>
        
    </>
</Header>
</div>

            {/* MAIN LOG SECTION */}
            <div className="flex flex-1 gap-4 h-full">
                
                {/* Left Sidebar */}
                <LogSideNavbar
                    projectName={projectName ? projectName : "Untitled Project"}
                    logName={logName ? logName : "New Log"}
                />
                
                <main className="flex-1 p-6 overflow-y-auto ml-0.5 h-full bg-[#41b3a926] rounded-[7px] border border-solid border-[#ffffff33]/50">
                    
                    {/* Log Meta Data Container */}
                    <div className="flex flex-wrap gap-6 mb-6">
                        
                        {/* Title of the log */}
                        <div className="flex flex-col flex-grow w-full md:w-auto">
                            <label className="mb-0 text-shadow-md text-gray-400 text-[16px] text-left">Title</label>
                            <div className="h-[40px] bg-[#1E3249] rounded-[10px] border-[1px] border-[#6A7278]/45">
                                <textarea
                                    className="w-full h-full p-2 bg-transparent text-[14px] leading-6 resize-none outline-none"
                                    placeholder="Title your log here..."
                                />
                            </div>
                        </div>

                        {/* Date of the log */}
                        <div className="flex flex-col">
                           <label className="mb-0 text-shadow-md text-gray-400 text-[16px] text-left">Date</label>
                            <div className="h-[40px] w-full md:w-[150px] bg-[#4bddb433]/50 rounded-[10px] border border-[#4bddb480]/80">
                                <textarea
                                    className="w-full h-full p-2 bg-transparent text-[14px] leading-6 resize-none outline-none"
                                    placeholder="MM / DD / YYYY"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6 mb-4">

                        {/* Project dropdown menu */}
                        <div className="w-full md:w-1/3">
                            <Dropdown
                                label="Project"
                                options={["Project A", "Project B", "Project C", "Project D"]}
                                defaultValue="Project A"
                            />
                        </div>

                        {/* Type dropdown menu */}
                        <div className="w-full md:w-1/3">
                            <Dropdown
                                label="Type"
                                options={["Feature", "Improvement", "Research", "Meeting", "Idea", "Bug", "Refactor", "Documentation", "Testing"]}
                                defaultValue="Feature"
                            />
                        </div>

                        {/* Status dropdown menu */}
                         <div className="w-full md:w-1/4">
                             <Dropdown
                                label="Status"
                                options={["In Progress", "Completed", "On Hold"]}
                                defaultValue="In Progress"
                            />
                         </div>

                        {/* Tags */}
                        <div className="w-full flex-grow">
                            <Dropdown
                                label="Tags"
                                options={["Error", "Syntax", "Typescript", "Environment", "React", "Tailwind", "Node", "Express", "MongoDB", "Mongoose", "API", "Frontend", "Backend"]}
                                defaultValue="Error"
                            />
                        </div>
                    </div>

                    {/* Text Editor */}
                    <Editor />
                </main>

                {/* AI Sidebar */}
                <AiSideNavBar />
            </div>
        </div>
    );
}

export default NewLog;


