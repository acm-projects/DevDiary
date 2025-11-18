import ArrowIcon from "../assets/icons/sideArrow.png";
import { useState } from "react";
type AiSideBarProps = {
  insights: string; // An array of strings for insights
  similarLogs: string[]; // An array of strings for logs
};
function AiSideBar({ insights, similarLogs }: AiSideBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const InsightItem: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => (
    <li className="bg-[#1E293B] p-2 rounded-md border border-gray-700 text-sm text-gray-300">
      {children}
    </li>
  );

  return (
    <div
      className={`h-full bg-[#0c384973]  bg-[url(src/assets/Variant7.png)] border-solid rounded-xl border border-gray-700 p-4 transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}>
      <button onClick={() => setIsOpen(!isOpen)} className="mb-4">
        <img
          src={ArrowIcon}
          alt="arrow"
          // Rotate icon if sidebar is open
          className={`w-6 h-auto cursor-pointer transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* SideBar UI and content when opened*/}
      {isOpen && (
        <div>
          {/* AI Insights */}
          {/* integrate into these 2 */}.
          <div className="mb-10">
            <h3 className="font-semibold text-gray-200 mb-3">AI Insights</h3>
            <ul className="space-y-2">
              <InsightItem>{insights}</InsightItem>
            </ul>
          </div>
          {/* Similar Logs*/}
          <div>
            <h3 className="font-semibold text-gray-200 mb-3">Similar Logs</h3>
            <ul className="space-y-2">
              {similarLogs.map((log, index) => (
                <InsightItem key={`log-${index}`}>{log}</InsightItem>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default AiSideBar;
