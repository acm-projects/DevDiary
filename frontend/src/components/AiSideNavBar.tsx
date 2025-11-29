import ArrowIcon from "../assets/icons/sideArrow.png";
import { useState } from "react";

type AiSideBarProps = {
  insights: string;
  similarLogs: string[];
};

function AiSideNavBar({ insights, similarLogs }: AiSideBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const InsightItem: React.FC<{ children: React.ReactNode; icon?: string }> = ({
    children,
    icon,
  }) => (
    <li className="bg-gradient-to-br from-[#1E293B]/80 to-[#0F172A]/90 p-4 rounded-lg border border-teal-500/20 text-sm text-gray-200 hover:border-teal-500/40 transition-all duration-200 shadow-lg">
      {icon && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{icon}</span>
          <div className="h-px flex-1 bg-gradient-to-r from-teal-500/50 to-transparent"></div>
        </div>
      )}
      <p className="leading-relaxed">{children}</p>
    </li>
  );

  return (
    <div
      className={`h-full bg-gradient-to-br from-[#1E293B]/60 to-[#0F172A]/80 backdrop-blur-sm border border-teal-500/20 rounded-2xl p-4 transition-all duration-300 ease-in-out shadow-xl shadow-teal-500/5 ${
        isOpen ? "w-80" : "w-16"
      }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 p-2 hover:bg-teal-500/10 rounded-lg transition-colors duration-200 w-full flex justify-center">
        <img
          src={ArrowIcon}
          alt="toggle sidebar"
          className={`w-6 h-auto cursor-pointer transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="space-y-8 overflow-y-auto max-h-[calc(100%-60px)] pr-2 scrollbar-thin scrollbar-thumb-teal-500/30 scrollbar-track-transparent">
          {/* AI Insights Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
              <h3 className="font-bold text-lg text-teal-300 tracking-wide">AI Insights</h3>
            </div>
            
            {insights ? (
              <ul className="space-y-3">
                <InsightItem>{insights}</InsightItem>
              </ul>
            ) : (
              <div className="bg-[#1E293B]/40 p-4 rounded-lg border border-dashed border-gray-600 text-center">
                <p className="text-gray-500 text-sm">Start typing to get AI insights...</p>
              </div>
            )}
          </div>

          {/* Similar Logs Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <h3 className="font-bold text-lg text-purple-300 tracking-wide">Similar Logs</h3>
            </div>
            
            {similarLogs && similarLogs.length > 0 ? (
              <ul className="space-y-3">
                {similarLogs.map((log, index) => (
                  <InsightItem key={`log-${index}`}>
                    {log}
                  </InsightItem>
                ))}
              </ul>
            ) : (
              <div className="bg-[#1E293B]/40 p-4 rounded-lg border border-dashed border-gray-600 text-center">
                <p className="text-gray-500 text-sm">No similar logs found yet...</p>
              </div>
            )}
          </div>

          {/* Loading Sign */}
          {!insights && !similarLogs?.length && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              </div>
              <p className="text-gray-400 text-sm">AI is analyzing...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AiSideNavBar;