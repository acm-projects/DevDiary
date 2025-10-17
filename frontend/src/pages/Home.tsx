import React, { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Nav from "../components/NavBar/Nav.tsx";
import LogList from "components/LogListView/LogList.tsx";
import StatusTag from "components/StatusTag.tsx";


const logList = [{

  id: 0,

  name: "Log 1",

  project: "Project 1",

  description: "description...",

  tags: [{

    name: "Tag 1",

    color: "#FF0000",

  }, {

    name: "Tag 2",

    color: "#00FF00",

  }, {

    name: "Tag 3",

    color: "#0000FF",

  }]

}, {

  id: 1,
  name: "Log 2",
  project: "Project 2",
  description: "description...",
  tags: [{
    name: "Tag 1",
    color: "#FF0000",
  }, {
    name: "Tag 2",
    color: "#00FF00",
  }, {
    name: "Tag 3",
    color: "#0000FF",
  }]
}, {
  id: 2,
  name: "Log 3",
  project: "Project 3",
  description: "description...",
  tags: [{
    name: "Tag 1",
    color: "#FF0000",
  }, {
    name: "Tag 2",
    color: "#00FF00",
  }, {
    name: "Tag 3",
    color: "#0000FF",
  }]
}, {
  id: 3,
  name: "Log 4",
  project: "Project 4",
  description: "description...",
  tags: [{
    name: "Tag 1",
    color: "#FF0000",
  }, {
    name: "Tag 2",
    color: "#00FF00",
  }, {
    name: "Tag 3",
    color: "#0000FF",
  }, {
    name: "Tag 4",
    color: "#df09e7",
  }]
}, {
  id: 4,
  name: "Log 5",
  project: "Project 5",
  description: "description...",
  tags: [{
    name: "Tag 1",
    color: "#FF0000",
  }, {
    name: "Tag 2",
    color: "#00FF00",
  }, {
    name: "Tag 3",
    color: "#0000FF",
  }]
},];



// Carousel Component 
const RecentLogsCarousel: React.FC<{ logs: any[] }> = ({ logs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? logs.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === logs.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Get the current log based on the index
  const currentLog = logs[currentIndex];
  const tagsArray = currentLog.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean);


  return (
    <div className="w-full max-w-4xl mx-auto relative group ">
      <div className="relative h-[280px] w-full bg-[#1E293B]/80 border border-white/25 bg-cover bg-[url(src/assets/Variant4.svg)] rounded-2xl p-6 flex flex-col justify-between backdrop-blur-sm shadow-lg shadow-teal-500/10 hover:shadow-[0px_20px_80px_-30px_#41cca6] hover:h-[320px] transition-all duration-300">
        {/* Top Section */}
        <div >
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold text-white">{currentLog.title}</h3>
            <span className="px-3 py-1 text-xs ">
              <StatusTag status={currentLog.status} />
            </span>
          </div>
          <div className="flex justify-start items-start" >
            <p className="text-sm text-gray-400 mt-1">&lt;&gt; {currentLog.project} </p> {/* Dummy Project Names for now */}
          </div>
        </div>

        {/* Code Snippet */}
        <div className="bg-black/50 p-3 rounded-lg border border-gray-700 font-mono text-teal-300 text-sm">
          <code>{currentLog.sections.code}</code>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {tagsArray.map((tag: string, index: number) => (
              <span key={index} className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400/50">
                {tag}
              </span>
            ))}
          </div>
          <Link
            onClick={() => window.location.href = '/view-log'}
            state={{ logData: currentLog }}
            className="px-6 py-3 bg-cyan-400/50 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity" to={""}                    >
            View Full Details
          </Link>
        </div>

        {/* Navigation Arrows */}
        <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 left-[-50px] p-2 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 right-[-50px] p-2 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 flex space-x-2">
          {logs.map((_, index) => (
            <div key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${currentIndex === index ? 'bg-teal-400' : 'bg-gray-600'}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
};


const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    navigate("/search?search=" + query);
  }

  const handleNewLog = () => {
    navigate("/log-meta-data");
  };

  // Hardcoded data for the carousel and list (for now, ideally it comes from backend)
  const recentLogs = [
    { title: 'CORS policy blocking API requests', project: 'WebApp V2', status: 'In Progress', tags: 'cors,api,express', sections: { code: `fetch("https://api.example.com/data")`, error: '', solution: '', resources: '', comments: '' } },
    { title: 'Database connection timeout', project: 'Backend API', status: 'On Hold', tags: 'database,mongo,timeout', sections: { code: `mongoose.connect(process.env.DB_URI)`, error: '', solution: '', resources: '', comments: '' } },
    { title: 'React component not re-rendering', project: 'Frontend Dashboard', status: 'Completed', tags: 'react,state,hooks', sections: { code: `const [user, setUser] = useState(null)`, error: '', solution: '', resources: '', comments: '' } },
    { title: 'CSS Grid alignment issue on Firefox', project: 'Company Website', status: 'In Progress', tags: 'css,grid,firefox', sections: { code: `display: grid; place-items: center;`, error: '', solution: '', resources: '', comments: '' } },
    { title: 'Authentication token expiring early', project: 'Mobile App', status: 'In Progress', tags: 'jwt,auth,security', sections: { code: `jwt.sign({ id }, SECRET, { expiresIn: '1h' })`, error: '', solution: '', resources: '', comments: '' } },
  ];

  return (
    <div className="relative snap-y snap-mandatory h-screen overflow-y-scroll">
      <div className="grid grid-cols-[200px_auto] bg-[#0F172A] bg-[url(src/assets/Variant6.svg)] bg-cover h-screen w-screen text-white font-sans">
        <div className="sticky top-0 h-screen">
          <Nav />
        </div>

        <div className="relative h-screen overflow-y-auto ">
          {/* Welcome, Search, and Carousel */}
          <section className="h-screen w-full flex flex-col items-center justify-center p-8 space-y-12">

            {/* Search Bar */}

            <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
              <div className="relative bg-[#011522]/80 border border-teal-500/30 rounded-full backdrop-blur-sm transition-colors duration-300 focus-within:border-teal-400 focus-within:shadow-[0px_20px_80px_-20px_#41cca6]">

                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>

                <input
                  type="search"
                  className="block w-full p-4 pl-12 text-lg bg-transparent rounded-full focus:ring-0 focus:outline-none text-white placeholder-gray-400"
                  placeholder="Search logs..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  required
                />
              </div>
            </form>


            {/* Welcome Banner */}

            <div className=" bg-[#0F172A] bg-[url(src/assets/Variant6.svg)] bg-cover w-full max-w-4xl border border-white/30 rounded-2xl p-8 flex items-center justify-between shadow-lg shadow-teal-500/10 hover:shadow-teal-500/20 transition-all duration-300">
              <span className="text-3xl font-semibold">Welcome Back, User!</span>
              <button
                onClick={handleNewLog}
                className="flex items-center gap-2 px-5 py-3 text-teal-300 bg-teal-500/20 border border-teal-500/30 rounded-xl hover:bg-teal-500/30 transition-colors">
                <span className="text-2xl mb-1">+</span>
                <span className="text-md"> New Log</span>
              </button>
            </div>

            {/* Carousel */}
            <RecentLogsCarousel logs={recentLogs} />
          </section>

          <div className="w-4/5 mx-auto flex flex-col flex-1 min-h-0">

            <h2 className=" text-xl font-semibold text-white text-left pt-5 pb-5">

              Unresolved Logs:

            </h2>


            <div className="overflow-y-scroll ">

              <LogList logList={logList} />

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;