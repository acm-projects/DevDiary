import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from 'components/NavBar/Nav';
import { motion, AnimatePresence } from 'framer-motion';

interface Log {
    _id: string;
    title: string;
    project: string;
    status: string;
    tags: string[];
    type: string;
    cli_flag: Boolean;
    summary: String;
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
    PastedText: string;
}


const QuickLogCard: React.FC<{ log: Log; onClick: () => void }> = ({ log, onClick }) => {
    return (
        <li className="relative w-full h-auto p-0 flex flex-col justify-between transition-all duration-300">
            <div
                className="relative w-full bg-[#1E293B]/80 border border-white/25 bg-cover bg-[url(src/assets/Variant4.svg)] rounded-2xl p-6 flex flex-col justify-between backdrop-blur-sm shadow-lg shadow-teal-500/10 hover:shadow-[0px_20px_80px_-30px_#41cca6] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                onClick={onClick}
            >
                {/* Top Section */}
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-2xl font-bold text-white">{log.title}</h3>
                        <div className="flex justify-start items-start" >
                            <p className="text-sm text-gray-400 mt-1">{new Date(log.creationDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {/* Log Description (Summary) */}
                <div className="bg-black/50 p-3 my-4 rounded-lg border border-gray-700 font-sans text-gray-300 text-sm">
                    <p className="line-clamp-2">{log.summary || "No summary provided."}</p>
                </div>

                {/* Bottom Section */}
                <div className="flex items-center justify-between">
                    {/* A special tag for CLI logs */}
                    <span className="px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full border border-purple-400">
                        CLI Log
                    </span>

                    <button
                        className="px-5 py-2 bg-cyan-400/50 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </li>
    );
};

// Copy to Clipboard Button
const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="absolute top-2 right-2 px-3 py-1 bg-gray-600/80 hover:bg-purple-400/50 text-white/50 text-xs rounded-md transition-colors flex items-center gap-1"
        >
            {copied ? (
                <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </>
            ) : (
                <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </>
            )}
        </button>
    );
};


const QuickLog: React.FC = () => {
    const [quickLogs, setQuickLogs] = useState<Log[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedLog, setSelectedLog] = useState<Log | null>(null);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuickLogs = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/logs');
                if (!res.ok) {
                    throw new Error('Failed to fetch logs');
                }
                const allLogs: Log[] = await res.json();
                const cliLogs = allLogs.filter(log => log.cli_flag);
                
                setQuickLogs(cliLogs);
            } catch (err) {
                console.error("Error fetching quick logs:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuickLogs();
    }, []); // Runs once when the page loads

    const handlePromoteLog = (quickLog: Log) => {
        quickLog.sections.code = quickLog.PastedText;

        const params = new URLSearchParams();
        params.set('title', quickLog.title || 'Untitled Log'); // Use a default if empty
        params.set('project', quickLog.project);
        params.set('type', quickLog.type);
        params.set('status', quickLog.status);
        params.set('code', quickLog.sections.code);
        // Navigate to the edit page with the params in the URL
        navigate(`/edit-log?${params.toString()}`);
    };

    const renderLogList = () => {
        if (isLoading) {
            return <p className="text-center text-lg text-gray-400">Loading Quick Logs...</p>;
        }
        if (quickLogs.length === 0) {
            return (
                <div className="text-center text-lg text-gray-400 bg-[#1E293B]/60 p-8 rounded-lg border border-teal-500/20">
                    <h3 className="text-xl font-semibold text-white mb-2">Inbox Zero!</h3>
                    <p>You have no new quick logs. Use the CLI to add some!</p>
                </div>
            );
        }
        return (
            <ul className="mt-6 max-w-5xl mx-auto space-y-6">
                {quickLogs.map(log => (
                    <QuickLogCard
                        key={log._id}
                        log={log}
                        onClick={() => setSelectedLog(log)}
                    />
                ))}
            </ul>
        );
    };

    return (
        <>
            <div className="grid grid-cols-[200px_auto] bg-[#0d0b1e] bg-[url(src/assets/Variant8.png)] bg-cover h-screen w-screen text-white font-sans">
                {/* Navigation Sidebar */}
                <div className="sticky top-0 h-screen">
                    <Nav />
                </div>

                {/* Main Content */}
                <main className="relative h-screen overflow-y-auto p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">Quick Logs</h1>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowHelpModal(true)}
                                className="px-4 py-2 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-lg font-semibold hover:bg-teal-500/30 transition-colors"
                            >
                                How to use Quick Log?
                            </button>
                        </div>
                    </div>

                    {renderLogList()}
                </main>
            </div>

            <AnimatePresence>
                {/* Log Detail Modal */}
                {selectedLog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-8"
                        onClick={() => setSelectedLog(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="bg-[#1E293B] border border-teal-500/30 w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-white mb-4">{selectedLog.title}</h2>
                                <h3 className="font-semibold text-teal-300 mt-4 mb-2">Summary</h3>
                                <p className="text-gray-300 bg-black/30 p-3 rounded-lg border border-gray-700">{selectedLog.summary || "No summary."}</p>

                                <h3 className="font-semibold text-teal-300 mt-4 mb-2">Code Snippet</h3>
                                <pre className="bg-black/50 p-4 rounded-lg border border-gray-700 text-cyan-300 font-mono text-sm overflow-x-auto text-left">
                                    <code>{selectedLog.PastedText || "No code snippet."}</code>
                                </pre>
                            </div>
                            <div className="bg-black/20 p-4 flex justify-end gap-4">
                                <button
                                    onClick={() => setSelectedLog(null)}
                                    className="px-4 py-2 bg-gray-600/50 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => handlePromoteLog(selectedLog)}
                                    className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
                                >
                                    Promote to Full Log
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* CLI Help Modal*/}
                {showHelpModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-8"
                        onClick={() => setShowHelpModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="bg-[#1E293B] border border-purple-500/30 w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-white mb-4">How to use Quick Log CLI</h2>
                                <p className="text-gray-300 mb-4">
                                    You can log errors, snippets, and notes directly from your terminal.
                                </p>

                                <h3 className="font-semibold text-purple-300 mt-4 mb-2">Installation</h3>
                                <div className="relative">
                                    <CopyButton text="command here" />
                                    <pre className="bg-black/50 p-4 rounded-lg border border-gray-700 text-cyan-300 font-mono text-sm">
                                        <code>command here</code>
                                    </pre>
                                </div>

                                <h3 className="font-semibold text-purple-300 mt-4 mb-2">(Optional) Specify Project</h3>
                                <div className="relative">
                                    <CopyButton text='devdiary set "projectid_example"' />
                                    <pre className="bg-black/50 p-4 rounded-lg border border-gray-700 text-cyan-300 font-mono text-sm">
                                        <code>devdiary set "projectid_example"</code>
                                    </pre>
                                </div>

                                <h3 className="font-semibold text-purple-300 mt-4 mb-2">Add a log and specify log type</h3>
                                <div className="relative">
                                    <CopyButton text="devdiary add --debug" />
                                    <pre className="bg-black/50 p-4 rounded-lg border border-gray-700 text-cyan-300 font-mono text-sm">
                                        <code>devdiary add --debug</code>
                                        <div>
                                            <code>devdiary add --document</code>
                                        </div>
                                    </pre>

                                    <h3 className="font-semibold text-purple-300 mt-4 mb-2">To add context, use the context flag</h3>
                                    <div className="relative">
                                        <CopyButton text='devdiary add --debug --context "error details"' />
                                        <pre className="bg-black/50 p-4 rounded-lg border border-gray-700 text-cyan-300 font-mono text-sm">
                                            <code>devdiary add --debug --context "error details"</code>
                                        </pre>

                                        <p className="text-gray-400 mt-4 text-sm">
                                            All logs will appear here in your inbox, ready to be reviewed and promoted to a full log.
                                        </p>
                                    </div>
                                    <div className="bg-black/20 p-4 flex justify-end">
                                        <button
                                            onClick={() => setShowHelpModal(false)}
                                            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                                        >
                                            Got it!
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default QuickLog;