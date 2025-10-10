import AiSideNavBar from "../components/AiSideNavBar";
import Editor from "../components/Editor";
import LogSideNavbar from "../components/LogSideNavBar";
import Dropdown from "../components/Dropdown";
import "../styles/index.css";
import Cancel from "../components/Cancel";
import Save from "../components/Save";
import Profile from "../components/Profile";
import Logo from "../components/Logo";

function NewLog() {
  return (
    <>
      <div className="relative w-screen h-screen bg-center bg-cover bg-[#120F2C] bg-[url(src/assets/gradient2.png)]">
        <LogSideNavbar />
        <Editor />
        <AiSideNavBar />

        {/* Logo */}
        <div className="fixed top-[1.5vh] left-[1vw]">
          <Logo />
        </div>

        {/* Project Name */}
        <p className="fixed top-[6vh] left-[3.5vw] [font-family:'Inter-SemiBold', Helvetica] text-[1.6rem] text-white">
          Project Name
        </p>

        {/* Cancel Button */}
        <div className="fixed top-[4.5vh] right-[17.5vw]">
          <Cancel />
        </div>

        {/* Save Button */}
        <div className="fixed top-[4.5vh] right-[10vw]">
          <Save />
        </div>

        {/* Profile Icon */}
        <div className="fixed top-[1.5vh] right-[1vw]">
          <Profile />
        </div>

        {/* Log Meta Data */}
        <div className="fixed top-[23vh] left-[6vw] w-[88vw] max-w-[1200px] flex flex-wrap gap-[2vw]">
          {/* title of the log */}
          <p className="fixed left-[12vw] top-[13vh] ">Title</p>
          <div className="fixed left-[12vw] top-[16vh] w-[42.75%] h-[5%] bg-[#1E3249] rounded-[10px] border-[1px] border-[#6A7278]/45">
            {" "}
            {/* log-box */}
            <textarea
              className="w-full h-full p-2 bg-transparent text-white text-[14px] leading-6 resize-none outline-none"
              placeholder="Title your log here..."
            />
          </div>

          {/* Status dropdown of the log */}
          <div className="absolute top-[-10.2vh] left-[49.5vw] w-a[25%]">
            <Dropdown
              label="Status"
              options={["In Progress", "Completed", "On Hold"]}
              defaultValue="In Progress"
              onSelect={function (option: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>

          {/* Date of the log */}
          <div className="fixed left-[77vw] top-[14.5vh] w-[10%] h-[7%] bg-[#4bddb433]/50 rounded-[10px] border border-[#4bddb480]/80">
            {" "}
            {/* log-box */}
            <textarea
              className="w-full h-full p-2 bg-transparent text-white text-[14px] leading-6 resize-none outline-none"
              placeholder="Date: In Progress"
            />
          </div>

          {/* Project dropdown menu */}
          <div className="absolute left-[6vw] top-[-0.65vh] w-[26.75%] h-[5%]">
            <Dropdown
              label="Project"
              options={["Project A", "Project B", "Project C", "Project D"]}
              defaultValue="Project A"
            />
          </div>

          {/* Type, also dropdown menu */}
          <div className="absolute left-[28.75vw] top-[-0.65vh] w-[24.5%] h-[5%]">
            <Dropdown
              label="Type"
              options={[
                "Feature",
                "Improvement",
                "Research",
                "Meeting",
                "Idea",
                "Bug",
                "Refactor",
                "Documentation",
                "Testing",
              ]}
              defaultValue="Feature"
            />
          </div>

          {/* Tags */}
          <div className="absolute left-[49.5vw] top-[-0.65vh] w-[35.5%] h-[5%]">
            <Dropdown
              label="Tags"
              options={[
                "Error",
                "Syntax",
                "Typescript",
                "Environment",
                "React",
                "Tailwind",
                "Node",
                "Express",
                "MongoDB",
                "Mongoose",
                "API",
                "Frontend",
                "Backend",
              ]}
              defaultValue="Error"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default NewLog;
