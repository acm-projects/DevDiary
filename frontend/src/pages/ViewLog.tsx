import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import AiSideNavBar from "../components/AiSideNavBar";
import Profile from "../components/Profile";
import StatusTag from "components/StatusTag";
import TypeTag from "components/TypeTag";

interface Section {
    type: string;
    content: string;
    order: number;
}

interface LogData {
    _id: string;
    title: string;
    project: string;
    status: string;
    tags: string[];
    type: string;
    sections: Section[];
    author: {
        initials: string;
        name: string;
    };
    createdAt: string;
}

const SECTION_STYLES: { [key: string]: { color: string } } = {
    error: { color: 'text-red-400' },
    code: { color: 'text-blue-400' },
    solution: { color: 'text-green-400' },
    resources: { color: 'text-purple-400' },
    comments: { color: 'text-gray-400' },
    heading: { color: 'text-yellow-400' },
    text: { color: 'text-gray-300' },
    list: { color: 'text-cyan-400' },
};

const SectionView: React.FC<{
    section: Section;
}> = ({ section }) => {
    const style = SECTION_STYLES[section.type] || { color: 'text-gray-400' };
    const label = section.type.charAt(0).toUpperCase() + section.type.slice(1);

    return (
        <div className="flex flex-wrap justify-start w-full mb-10">
            <h2 className={`text-xl font-semibold mb-2 ${style.color}`}>
                {label}
            </h2>
            <div className="w-full flex-none"></div>
            <pre className="flex flex-wrap justify-start p-2 text-gray-300 text-sm whitespace-pre-wrap font-sans border-b border-gray-700 w-full">
                <p className="mt-4 mb-6">
                    {section.content || `No content provided for ${label}.`}
                </p>
            </pre>
        </div>
    );
};

function ViewLog() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const navigate = useNavigate();

    const [logData, setLogData] = useState<LogData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            alert("No log ID in URL.");
            navigate("/home");
            return;
        }

        const fetchLog = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/logs/${id}`);

                if (!res.ok) throw new Error("Log not found");

                const data = await res.json();
                setLogData(data);
            } catch (err) {
                console.error("Error fetching log:", err);
                alert("Could not load log.");
                navigate("/home");
            } finally {
                setLoading(false);
            }
        };

        fetchLog();
    }, [id, navigate]);

    const handleDelete = async () => {
        if (!logData) return;

        if (
            window.confirm(
                "Are you sure you want to delete this log? This cannot be undone."
            )
        ) {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/logs/${logData._id}`,
                    {
                        method: "DELETE",
                    }
                );

                if (!res.ok) throw new Error("Failed to delete log");

                navigate("/home");
            } catch (err: any) {
                console.error("Error deleting log:", err);
                alert(err.message);
            }
        }
    };

    if (loading || !logData) {
        return (
            <div className="canvas-load flex items-center justify-center h-full">
                <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
            </div>
        );
    }

    const tagsArray = logData.tags;
    const creationDate = new Date(logData.createdAt);

    // Sort sections by order
    const sortedSections = [...logData.sections].sort((a, b) => a.order - b.order);

    return (
        <div className="w-screen h-screen bg-[#0d0b1e] bg-[url(src/assets/Variant8.png)] text-white overflow-hidden flex flex-col font-sans">
            <Header>
                <div className="flex items-center gap-4">
                    <p className="font-semibold text-xl">
                        {logData.project}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-[#2D3748]/50 rounded-md border border-gray-600 hover:bg-gray-700 transition-colors text-sm">
                        Share
                    </button>

                    <Link
                        to={`/edit-log?id=${logData._id}`}
                        className="px-4 py-2 bg-[#2D3748]/50 rounded-md border border-gray-600 hover:bg-gray-700 transition-colors text-sm"
                    >
                        Edit
                    </Link>

                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600/80 hover:bg-red-600 rounded-md transition-colors text-sm font-semibold"
                    >
                        Delete
                    </button>

                    <Profile />
                </div>
            </Header>

            <div className="flex flex-1 overflow-hidden p-4 sm:p-6 lg:p-8 gap-6">
                <main className="flex-grow flex-1 overflow-hidden bg-[#1E293B]/60 border border-teal-500/20 rounded-2xl p-6 backdrop-blur-sm shadow-lg shadow-teal-500/10 flex flex-col">
                    {/* Header section */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col items-start space-y-2 mr-4 min-w-0">
                            <h1
                                className="font-semibold text-2xl truncate"
                                title={logData.title}
                            >
                                {logData.title}
                            </h1>
                            <div className="flex items-center gap-x-3 text-sm text-gray-400">
                                <span>
                                    <strong>
                                        {logData.author.initials}
                                    </strong>{" "}
                                    {logData.author.name}
                                </span>
                                <span>
                                    {creationDate.toLocaleDateString()}
                                </span>
                                <span>
                                    {creationDate.toLocaleTimeString()}
                                </span>
                            </div>
                        </div>

                        <div className="flex-shrink-0 flex flex-col items-end space-y-2">
                            <StatusTag status={logData.status} />
                            <div className="flex flex-wrap justify-end gap-2 max-w-xs">
                                <TypeTag type={logData.type} />
                                {tagsArray.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main content sections */}
                    <div className="flex-grow pt-4 flex flex-col overflow-y-auto">
                        <div className="bg-black/70 p-6 rounded-xl border border-gray-700 overflow-y-auto text-left">
                            {sortedSections.length > 0 ? (
                                sortedSections.map((section, index) => (
                                    <SectionView
                                        key={index}
                                        section={section}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-400 text-center py-8">
                                    No sections yet. Click Edit to add content.
                                </p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ViewLog;