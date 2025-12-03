import React, { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/NavBar/Nav.tsx";
import LogList from "components/LogListView/LogList.tsx";
import StatusTag from "components/StatusTag.tsx";
import SearchBar from "components/Search/SearchBar.tsx";
import RobotMascot from '../components/RobotMascot.tsx';
import FloatingBackground from "components/FloatingBackground.tsx";

// Floating background gradient elements
const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Big circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/15 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-float-medium" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>

      {/* Small circles */}
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-pink-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
    </div>
  );
};

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
  let currentLog;
  if (logs.length != 0) {
    currentLog = logs[currentIndex];
  } else {
    currentLog = {
      id: "_id",
      project: "project",
      title: "title",
      status: "status",
      description: "summary",
      tags: ["tags"],
      sections: { code: `const [user, setUser] = useState(null)`, error: '', solution: '', resources: '', comments: '' },
      updatedAt: "updatedAt",
    };
  }

  return (
    <div className="w-full max-w-5xl mx-auto relative group">
      <div className="relative h-[300px] w-full bg-[#0F172A]/50 bg-[url(src/assets/Variant6.svg)] bg-cover border border-teal-500/20 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md shadow-xl shadow-teal-500/10 hover:shadow-[0px_20px_80px_-30px_#41cca6] hover:border-teal-500/40 hover:h-[340px] transition-all duration-300">
        <div className="absolute top-3 right-3 w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-3 left-3 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>

        {/* Top Section */}
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="text-2xl text-left font-bold text-white mb-1">{currentLog.title}</h3>
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                {currentLog.project}
              </p>
            </div>
            <span className="px-3 py-1 text-xs">
              <StatusTag status={currentLog.status} />
            </span>
          </div>
        </div>

        {/* Code Snippet */}
        <div className="bg-black/60 p-4 rounded-lg border border-teal-500/30 font-mono text-teal-300 text-sm relative overflow-hidden">
          <code> const [user, setUser] = useState(null) </code>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-wrap gap-2">
            {currentLog.tags.slice(0, 3).map((tag: string, index: number) => (
              <span key={index} className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400/50 hover:bg-cyan-500/30 transition-colors">
                {tag}
              </span>
            ))}
            {currentLog.tags.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium bg-gray-500/20 text-gray-400 rounded-full border border-gray-500/50">
                +{currentLog.tags.length - 3}
              </span>
            )}
          </div>
          <Link
            to={`/view-log?id=${currentLog.id}`}
            className="flex items-center gap-2 px-6 py-2.5 bg-cyan-400/50 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 border border-cyan-400/30"
          >
            View Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Navigation Arrows */}
        {logs.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 left-[-50px] p-2 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 right-[-50px] p-2 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
          </>
        )}

        {/* Dots */}
        {logs.length > 1 && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
            {logs.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-teal-400 w-6' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
              ></button>
            ))}
          </div>
        )}
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

  const [allLogs, setAllLogs] = useState<any[]>([]);
  const [loadingRecentLogs, setLoadingRecentLogs] = useState<boolean>(true);
  const [errorRecentLogs, setErrorRecentLogs] = useState<string | null>(null);

  useEffect(() => {
    setLoadingRecentLogs(true);
    setErrorRecentLogs(null);

    fetch("http://localhost:5000/api/logs", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAllLogs(data);
        setLoadingRecentLogs(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setErrorRecentLogs("Error fetching search results");
        setLoadingRecentLogs(false);
      });
  }, []);

  const simplifiedAllLogs = allLogs.map(({ _id, title, project, summary, tags, updatedAt, status, sections }) => ({
    id: _id,
    project: project,
    title: title,
    status: status,
    description: summary,
    tags: tags,
    sections: sections,
    updatedAt: updatedAt,
  }));

  const recentLogs = simplifiedAllLogs.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5);

  return (
    <div className="relative snap-y snap-mandatory h-screen overflow-y-scroll">
      <div className="grid grid-cols-[200px_auto] bg-[#0F172A] bg-[url(src/assets/Variant6.svg)] bg-cover h-screen w-screen text-white font-sans">
        <div className="sticky top-0 h-screen">
          <Nav />
        </div>

        <div className="relative h-screen overflow-y-auto">
          {/* Floating background elements */}
          <FloatingElements />
          <FloatingBackground />

          {/* Main Content */}
          <div className="relative z-10">
            <section className="min-h-screen w-full flex flex-col items-center justify-center space-y-10 py-16 px-8">
              {/* Welcome Banner */}
              <div className="relative group w-full max-w-5xl">
                <div className="relative  bg-[#0F172A] bg-[url(src/assets/Variant6.svg)] bg-cover w-full border border-white/10 rounded-2xl pr-8 pl-4 py-4 flex items-center justify-between shadow-2xl">
                  {/* Robot Mascot */}
                  <span className="flex justify-center w-40 h-40 -ml-5 flex-shrink-0">
                    <RobotMascot />
                  </span>

                  {/* Welcome Text */}
                  <div className="flex-1 text-left">
                    <h1 className="text-4xl green-text-gradient font-bold">
                      Welcome Back, User!
                    </h1>
                    <p className="text-gray-400 mt-2">Ready to document your next log?</p>
                  </div>

                  {/* New Log Button*/}
                  <button
                    onClick={handleNewLog}
                    className="relative flex items-center gap-2 px-6 py-3 text-teal-300 bg-teal-500/20 border border-teal-500/30 rounded-xl hover:bg-teal-500/30 hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 flex-shrink-0 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105">
                    <span className="text-2xl mb-1 group-hover/btn:rotate-90 transition-transform duration-300">+</span>
                    <span className="text-md font-semibold">New Log</span>
                  </button>
                </div>
              </div>

              {/* Search Bar*/}
              <div className="w-1/2 max-w-3xl">
                <SearchBar />
              </div>

              {/* Recent Logs */}
              <div className="w-full max-w-5xl flex items-center gap-3 mt-8">
                <h2 className="text-2xl font-bold green-text-gradient ">
                  Recent Logs
                </h2>
                <div className="flex-1 h-[1px] bg-white/30"></div>
              </div>

              {/* Carousel */}
              <RecentLogsCarousel logs={recentLogs} />
            </section>

            {/* All Logs Section */}
            <div className="w-5/6 mx-auto flex flex-col pb-16 mt-20">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold green-text-gradient">
                  All Logs
                </h2>
                <div className="flex-1 h-[1px] bg-white/30"></div>
                <span className="px-3 py-1 green-text-gradient rounded-full text-sm font-semibold border border-blue-500/30">
                  {simplifiedAllLogs.length} Logs
                </span>
              </div>

              <div className="overflow-y-auto max-h-[600px] custom-scrollbar">
                <LogList logList={simplifiedAllLogs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;