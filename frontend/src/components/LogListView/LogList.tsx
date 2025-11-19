import "styles/App.css";
import { Link } from "react-router-dom";
import StatusTag from "components/StatusTag";

interface Tag {
  name: string;
}

type LogProps = {
  id: number;
  title: string;
  project: string;
  description: string;
  status: string;
  tags: string[];
}

interface LogListProps {
  logList: LogProps[];
}

function LogList({ logList }: LogListProps) {
  console.log("In LogList",logList);
  return (
    <div className="w-full max-w-5xl mx-auto relative group">
      <ul className="flex flex-col space-y-6 font-sans">
        {logList.map((log) => (
          <li key={log.id} className="relative w-full h-auto p-0 flex flex-col justify-between transition-all duration-300">
            <div className="relative w-full bg-[#1E293B]/80 border border-white/25 bg-cover bg-[url(src/assets/Variant4.svg)] rounded-2xl p-6 flex flex-col justify-between backdrop-blur-sm shadow-lg shadow-teal-500/10 hover:shadow-[0px_20px_80px_-30px_#41cca6] hover:scale-[1.02] transition-all duration-300">
              
              {/* Top Section */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-white">{log.title}</h3>
                  <div className="flex justify-start items-start" >
                    <p className="text-sm text-gray-400 mt-1">{log.project}</p>
                  </div>
                </div>
                <span className="flex-shrink-0">
                  <StatusTag status={log.status} />
                </span> 
              </div>

              {/* Log Description */}
              <div className="bg-black/50 p-3 my-4 rounded-lg border border-gray-700 font-sans text-gray-300 text-sm">
                <p className="line-clamp-2">{log.description}</p>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {log.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => window.location.href = '/view-log'} 
                  //state={{ logData: log }}
                  className="px-5 py-2 bg-cyan-400/50 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity" 
                  //to={"/view-log"} 
                >
                  View Full Details
                </button>
              </div>
            </div>
          </li>
        ))
        }
      </ul >
    </div>
  );
}

export default LogList;
