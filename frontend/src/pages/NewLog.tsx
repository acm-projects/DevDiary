import AiSideNavBar from '../components/AiSideNavBar';
import Editor from '../components/Editor';
import LogSideNavbar from '../components/LogSideNavBar';
import Dropdown from '../components/Dropdown';
import '../styles/index.css'

function NewLog() {

    return (
        <>
            <div className="relative w-screen h-screen bg-center bg-cover bg-[#120F2C] bg-[url(src/assets/gradient2.png)]"> {/*bg-[url(src/assets/gradientBackground1.png)]"*/}

                <LogSideNavbar />
                <Editor />
                <AiSideNavBar />

                {/* Logo */}
                <div className="fixed top-[0vh] left-[1.5vw] [font-family:'DM-Mono',Helvetica] text-[1rem] flex items-center">
                    <span className="text-[#80ffdbbf]">&lt;/&gt;</span>
                    <span className="ml-1 text-white">devDiary</span>
                </div>

                {/* Project Name */}
                <p className="fixed top-[6vh] left-[3.5vw] [font-family:'Inter-SemiBold', Helvetica] text-[1.6rem] text-white">
                    Project Name
                </p>

                {/* Log Meta Data */}
                <div className="fixed top-[23vh] left-[6vw] w-[88vw] max-w-[1200px] flex flex-wrap gap-[2vw]">

                    {/* title of the log */}
                    <p className="fixed left-[12vw] top-[13vh] ">Title</p>
                    <div className="fixed left-[12vw] top-[16vh] w-[42.75%] h-[5%] bg-[#1E3249] rounded-[10px] border-[1px] border-[#6A7278]/45"> {/* log-box */}
                        <textarea
                            className="w-full h-full p-2 bg-transparent text-white text-[14px] leading-6 resize-none outline-none"
                            placeholder="Title your log here..."
                        />
                    </div>

                    {/* Status dropdown of the log */}
                    <div className="absolute top-[-10.2vh] left-[49.5vw] w-[25%]">
                        <Dropdown
                            label="Status"
                            options={["In Progress", "Completed", "On Hold"]}
                            defaultValue="In Progress"
                        />
                    </div>


                    {/* Date of the log */}
                    <div className="fixed left-[77vw] top-[14.5vh] w-[10%] h-[7%] bg-[#4bddb433]/50 rounded-[10px] border border-[#4bddb480]/80"> {/* log-box */}
                        <textarea
                            className="w-full h-full p-2 bg-transparent text-white text-[14px] leading-6 resize-none outline-none"
                            placeholder="Date: In Progress"
                        />
                    </div>

                    {/* Project Name, also dropdown menu */}
                    <p className="fixed left-[12vw] top-[22.5vh]">Project</p>
                    <div className="fixed left-[12vw] top-[25.5vh] w-[22%] h-[5%] bg-[#1E3249] rounded-[10px] border-[1px] border-[#6A7278]/45"> {/* log-box */}
                        <textarea
                            className="w-full h-full p-2 bg-transparent text-white text-[14px] leading-6 resize-none outline-none"
                            placeholder="Project: In Progress"
                        />
                    </div>

                    {/* Type, also dropdown menu */}
                    <p className="fixed left-[34.75vw] top-[22.5vh]">Type</p>
                    <div className="fixed left-[34.75vw] top-[25.5vh] w-[20%] h-[5%] bg-[#1E3249] rounded-[10px] border-[1px] border-[#6A7278]/45">
                        <textarea
                            className="w-full h-full p-2 bg-transparent text-white text-[14px] leading-6 resize-none outline-none"
                            placeholder="Type: In Progress"
                        />
                    </div>

                    {/* Tags */}
                    <p className="fixed left-[55.5vw] top-[22.5vh]">Tags</p>
                    <div className="fixed left-[55.5vw] top-[25.5vh] w-[29.5%] h-[5%] bg-[#1E3249] rounded-[10px] border-[1px] border-[#6A7278]/45">
                        <textarea
                            className="w-full h-full p-2 bg-transparent text-white text-[14px] leading-6 resize-none outline-none"
                            placeholder="Tags: In Progress"
                        />
                    </div>

                </div>


            </div>
        </>
    );

}



export default NewLog;
