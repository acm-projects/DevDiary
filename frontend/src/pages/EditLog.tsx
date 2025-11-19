<<<<<<< HEAD
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import Cancel from '../components/Cancel';
import Save from '../components/Save';
import Profile from '../components/Profile';
import Header from '../components/Header';
import AiSideNavBar from '../components/AiSideNavBar';
import StatusTag from 'components/StatusTag';
import TypeTag from 'components/TypeTag';
import AnimatedPage from 'components/AnimatedPages';
=======
import { useLocation, useNavigate } from "react-router-dom";
import Cancel from "../components/Cancel";
import Save from "../components/Save";
import Profile from "../components/Profile";
import Header from "../components/Header";
import AiSideNavBar from "../components/AiSideNavBar";
import React, { useEffect } from "react";
import { useState } from "react";
import TypeTag from "components/TypeTag";
import StatusTag from "components/StatusTag";
import AnimatedPage from "components/AnimatedPages";
import { section } from "framer-motion/client";
>>>>>>> routed-pages

interface LogData {
<<<<<<< HEAD
    _id?: string;
    title: string;
    project: string;
    tags: string;
    status: string;
    type: string;
    sections: Array<{ type: string; content: string; order: number }>;
    author: {
        initials: string;
        name: string;
    };
    createdAt: string;
}

const SECTION_TYPES = [
  { type: 'error', label: 'Error', color: 'text-red-500', border: 'border-red-500' },
  { type: 'code', label: 'Code Snippet', color: 'text-blue-500', border: 'border-blue-500' },
  { type: 'solution', label: 'Solution', color: 'text-green-500', border: 'border-green-500' },
  { type: 'resources', label: 'Resources', color: 'text-purple-500', border: 'border-purple-500' },
  { type: 'comments', label: 'Comments', color: 'text-gray-400', border: 'border-gray-500' },
  { type: 'heading', label: 'Heading', color: 'text-yellow-500', border: 'border-yellow-500' },
  { type: 'text', label: 'Text Block', color: 'text-gray-300', border: 'border-gray-400' },
  { type: 'list', label: 'List', color: 'text-cyan-400', border: 'border-cyan-500' },
];

function EditLog() {
  const location = useLocation();
  const state = location.state as { logData?: Partial<LogData> } | null;
  const [searchParams] = useSearchParams();
  const logIdFromQuery = searchParams.get('id');
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const defaultLogData: LogData = {
    title: 'Untitled Log',
    project: 'Untitled Project',
    tags: '',
    status: 'In Progress',
    type: 'Feature',
    sections: [],
    author: { initials: 'JD', name: 'John Doe' },
    createdAt: new Date().toISOString(),
  };

  const [logData, setLogData] = useState<LogData>(defaultLogData);
  const [content, setContent] = useState('');
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 });
  const [filteredSections, setFilteredSections] = useState(SECTION_TYPES);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // AI Insights state
  const [aiInsight, setAiInsight] = useState('');
  const [similarLogs, setSimilarLogs] = useState<string[]>([]);
  const [timer, setTimer] = useState<number | undefined>(undefined);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && 
          textareaRef.current && !textareaRef.current.contains(event.target as Node)) {
        setShowSlashMenu(false);
      }
=======
  title: string;
  project: string;
  tags: string;
  status: string;
  type: string;
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
}

// Section component for each editable section
const Section: React.FC<{
  section: string;
  content: string;
  onContentChange: (newContent: string) => void;
}> = ({ section, content, onContentChange }) => {
  const sectionStyles: { [key: string]: string } = {
    Error: "border-[#ff0000] text-red-500",
    "Code Snippets": "border-blue-500 text-blue-500",
    Solution: "border-green-500 text-green-500",
    Resources: "border-purple-500 text-purple-500",
    Comments: "border-gray-500 text-gray-500",
  };
  const style = sectionStyles[section] || "border-gray-500 text-gray-500";

  return (
    <div className="w-full h-full flex flex-col">
      <label className={`block text-left text-md font-medium mb-2 ${style}`}>
        {section}
      </label>
      <div className={`flex-grow bg-black/50 rounded-[10px] border ${style}`}>
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full h-full p-4 bg-transparent text-white text-[16px] leading-6 resize-none outline-none"
          placeholder={`Details for ${section}...`}
        />
      </div>
    </div>
  );
};

function EditLog() {
  const location = useLocation();
  const state = location.state as { logData: LogData };
  const [activeSection, setActiveSection] = useState("error"); // sets error as the default active section
  const [creationDate] = useState(new Date()); // get current date and time
  const navigate = useNavigate();

  // Default log data structure in case no data is passed
  const defaultLogData: LogData = {
    title: "Untitled Log",
    project: "Untitled Project",
    tags: "",
    status: "In Progress",
    type: "Feature",
    sections: {
      error: "",
      code: "",
      solution: "",
      resources: "",
      comments: "",
    },
    author: { initials: "JD", name: "John Doe" }, // Hardcoded author (for now, until we connect to user auth/database)
    creationDate: new Date().toISOString(), // Capture creation time
  };

  // Merge/replace the default log data with any data passed in
  const initialLogData: LogData = {
    ...defaultLogData,
    ...state?.logData,
  };

  // Navigation links for sections
  const navLinks = [
    { id: "error", label: "Error" },
    { id: "code", label: "Code Snippets" },
    { id: "solution", label: "Solution" },
    { id: "resources", label: "Resources" },
    { id: "comments", label: "Comments" },
    { id: "ai-insights", label: "AI Insights" },
  ];

  const [title, setTitle] = useState(initialLogData.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const [timer, setTimer] = useState<number | undefined>(undefined);
  const [sectionsContent, setSectionsContent] = useState(
    initialLogData.sections
  );
  const [arg_insight, setArg_insight] = useState("");
  const [arg_similar, setArg_similar] = useState<string[]>([]);

  const getLogTitle = async (id: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/getLogById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      console.log("inside");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Here at similar");
      const log = await res.json();
      console.log(log.summary);
      setArg_similar([...arg_similar, log.summary]);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  const inputChanged = (title_in: string, content_in: string) => {
    clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      // put request to update log
      try {
        console.log("before starting");
        console.log(title_in);
        console.log(content_in);
        const res = await fetch("http://localhost:5000/api/generateTags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: title_in, content: content_in }),
        });
        console.log("inside");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        // get the explanation
        console.log("Here");
        const data_insight = await res.json();
        console.log(data_insight.explanation);
        setArg_insight(data_insight.explanation);
        // generateStuffWithLogs(title, content)
        const res2 = await fetch(
          "http://localhost:5000/api/generateStuffWithLogs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: title_in, content: content_in }),
          }
        );
        console.log("inside");
        if (!res2.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Here at similar");
        const data_similar = await res2.json();
        console.log(data_similar.explanation);
        const list = data_similar.similar_logs.split(",");
        for (const item of list) {
          getLogTitle(item);
        }
        //setArg_similar(data_similar.similar_logs.split(","));

        // pass it into the ai insight board
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 4000);

    setTimer(newTimer);
  };

  // Handles content changes for each section
  const handleSectionChange = (
    sectionId: keyof LogData["sections"],
    content: string
  ) => {
    setSectionsContent((prev) => ({ ...prev, [sectionId]: content }));
  };

  // When clicking the save button, navigate to ViewLog page with updated log data
  const handleSave = () => {
    const updatedLogData: LogData = {
      ...initialLogData,
      title: title,
      sections: sectionsContent,
>>>>>>> routed-pages
    };
    navigate("/view-log", { state: { logData: updatedLogData } });
  };

<<<<<<< HEAD
    if (showSlashMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSlashMenu]);

  // Load log data
  useEffect(() => {
    const loadLog = async () => {
      if (logIdFromQuery) {
        try {
          const res = await fetch(`http://localhost:5000/api/logs/${logIdFromQuery}`);
          const data = await res.json();
          
          const markdownContent = data.sections
            ?.sort((a: any, b: any) => a.order - b.order)
            .map((s: any) => `/${s.type}\n${s.content}`)
            .join('\n\n') || '';
          
          setLogData({
            ...data,
            tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags
          });
          setContent(markdownContent);
        } catch (err) {
          console.error('Error loading log:', err);
          alert('Could not load log.');
          navigate('/home');
        }
      } 
      else if (state?.logData) {
        const passedData = state.logData;
        if (passedData._id) {
          try {
            const res = await fetch(`http://localhost:5000/api/logs/${passedData._id}`);
            const data = await res.json();
            const markdownContent = data.sections
              ?.sort((a: any, b: any) => a.order - b.order)
              .map((s: any) => `/${s.type}\n${s.content}`)
              .join('\n\n') || '';
            setLogData({
              ...data,
              tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags
            });
            setContent(markdownContent);
          } catch (err) {
            console.error('Error loading log:', err);
          }
        } else {
          setLogData({ ...defaultLogData, ...passedData } as LogData);
        }
      }
      else {
        const title = searchParams.get('title');
        const project = searchParams.get('project');
        const type = searchParams.get('type');
        const status = searchParams.get('status');
        const tags = searchParams.get('tags');
        
        if (title || project || type || status || tags) {
          setLogData({
            ...defaultLogData,
            title: title || defaultLogData.title,
            project: project || defaultLogData.project,
            type: (type as LogData['type']) || defaultLogData.type,
            status: (status as LogData['status']) || defaultLogData.status,
            tags: tags || defaultLogData.tags,
          });
        }
      }
    };
    loadLog();
  }, [logIdFromQuery, state, navigate, searchParams]);
  const fetchAiInsights = async (title: string, contentText: string) => {
    try {
      // Generate tags and explanation
      const res1 = await fetch('http://localhost:5000/api/generateTags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content: contentText }),
      });
      if (res1.ok) {
        const data = await res1.json();
        setAiInsight(data.explanation);
      }
      const res2 = await fetch('http://localhost:5000/api/generateStuffWithLogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content: contentText }),
      });
      if (res2.ok) {
        const data = await res2.json();
        const logIds = data.similar_logs.split(',');
        const titles: string[] = [];
        for (const id of logIds) {
          try {
            const logRes = await fetch('http://localhost:5000/api/getLogById', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id }),
            });
            if (logRes.ok) {
              const log = await logRes.json();
              titles.push(log.summary);
            }
          } catch (err) {
            console.error('Error fetching similar log:', err);
          }
        }
        setSimilarLogs(titles);
      }
    } catch (err) {
      console.error('Error fetching AI insights:', err);
    }
  };

  // Handle textarea input
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);

    // Debounce AI insights
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      fetchAiInsights(logData.title, newContent);
    }, 4000);
    setTimer(newTimer);

    // Check for slash command
    const cursorPos = e.target.selectionStart;
    const textBeforeCursor = newContent.substring(0, cursorPos);
    const lastLine = textBeforeCursor.split('\n').pop() || '';
    
    if (lastLine.startsWith('/')) {
      const searchTerm = lastLine.substring(1).toLowerCase();
      const filtered = SECTION_TYPES.filter(s => 
        s.type.toLowerCase().includes(searchTerm) || 
        s.label.toLowerCase().includes(searchTerm)
      );
      
      setFilteredSections(filtered);
      setSelectedIndex(0);
      setShowSlashMenu(true);
      
      const textarea = textareaRef.current;
      if (textarea) {
        const lineHeight = 24;
        const charWidth = 8;
        const linesBeforeCursor = textBeforeCursor.split('\n').length - 1;
        const lastLineText = textBeforeCursor.split('\n').pop() || '';
        const top = linesBeforeCursor * lineHeight + lineHeight + 8;
        const left = lastLineText.length * charWidth + 8;
        setSlashMenuPosition({ top, left });
      }
    } else {
      setShowSlashMenu(false);
    }
  };

  // Handle slash menu selection
  const insertSection = (sectionType: string) => {
    const cursorPos = textareaRef.current?.selectionStart || 0;
    const textBeforeCursor = content.substring(0, cursorPos);
    const textAfterCursor = content.substring(cursorPos);
    
    const lines = textBeforeCursor.split('\n');
    lines[lines.length - 1] = lines[lines.length - 1].replace(/\/\w*$/, '');
    const newTextBefore = lines.join('\n');
    
    const newContent = `${newTextBefore}/${sectionType}\n\n${textAfterCursor}`;
    setContent(newContent);
    setShowSlashMenu(false);
    
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  // Handle keyboard navigation in slash menu
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showSlashMenu) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredSections.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev === 0 ? filteredSections.length - 1 : prev - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      insertSection(filteredSections[selectedIndex].type);
    } else if (e.key === 'Escape') {
      setShowSlashMenu(false);
    }
  };

  // Parse content into sections for saving
  const parseContentToSections = () => {
    const sections: Array<{ type: string; content: string; order: number }> = [];
    const lines = content.split('\n');
    let currentSection: { type: string; content: string } | null = null;
    let order = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.startsWith('/')) {
        if (currentSection) {
          sections.push({ ...currentSection, order: order++ });
        }
        const sectionType = line.substring(1).trim();
        if (SECTION_TYPES.find(s => s.type === sectionType)) {
          currentSection = { type: sectionType, content: '' };
        }
      } else if (currentSection) {
        currentSection.content += (currentSection.content ? '\n' : '') + line;
      }
    }
    
    if (currentSection) {
      sections.push({ ...currentSection, order: order++ });
    }

    return sections;
  };

  // Save log
  const handleSave = async () => {
    const sections = parseContentToSections();
    const dataToSave = { ...logData, sections };
    
    const isUpdating = !!logData._id;
    const url = isUpdating 
      ? `http://localhost:5000/api/logs/${logData._id}` 
      : 'http://localhost:5000/api/logs';
    const method = isUpdating ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });

      if (!res.ok) {
        throw new Error('Failed to save log');
      }

      const savedLog = await res.json();
      const logId = isUpdating ? savedLog.log?._id : savedLog._id;
      
      navigate(`/view-log?id=${logId}`);
    } catch (err: any) {
      console.error('Error saving log:', err);
      alert(`Error: ${err.message}`);
    }
  };

  const tagsArray = logData.tags.split(',').map(t => t.trim()).filter(Boolean);
  const creationDate = new Date(logData.createdAt);

  return (
    <AnimatedPage>
    <div className="w-screen h-screen bg-[#0d0b1e] bg-[url(src/assets/Variant8.png)] text-white overflow-hidden flex flex-col font-sans">
      <Header>
        <div className="flex items-center gap-4">
          <p className="font-semibold text-xl">{logData.project}</p>
        </div>
        <div className="flex items-center gap-4">
          <Cancel />
          <Save onClick={handleSave} />
          <Profile />
        </div>
      </Header>

      <div className="flex flex-1 overflow-hidden p-4 sm:p-6 lg:p-8 gap-6">
        <AiSideNavBar insights={aiInsight} similarLogs={similarLogs} />
        
        <main className="flex-grow flex-1 overflow-hidden bg-[#1E293B]/60 border border-teal-500/20 rounded-2xl p-6 backdrop-blur-sm shadow-lg shadow-teal-500/10 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col items-start space-y-2 mr-4 min-w-0">
              {isEditingTitle ? (
                <input
                  value={logData.title}
                  onChange={(e) => setLogData({ ...logData, title: e.target.value })}
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); setIsEditingTitle(false); } }}
                  className="font-semibold text-2xl bg-transparent border-b border-teal-400 outline-none text-white"
                  autoFocus
                />
              ) : (
                <p
                  className="font-semibold text-2xl cursor-pointer truncate"
                  onClick={() => setIsEditingTitle(true)}
                >
                  {logData.title}
                </p>
              )}
              <div className="flex items-center gap-x-3 text-sm text-gray-400">
                <span><strong>{logData.author.initials}</strong> {logData.author.name}</span>
                <span>{creationDate.toLocaleDateString()}</span>
                <span>{creationDate.toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col items-end space-y-2">
              <StatusTag status={logData.status} />
              <div className="flex flex-wrap justify-end gap-2 max-w-xs">
                <TypeTag type={logData.type} />
                {tagsArray.map((tag, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Info banner */}
          <div className="mb-4 p-3 bg-teal-500/10 border border-teal-500/30 rounded-lg text-sm text-teal-300">
            💡 Type <code className="bg-black/30 px-2 py-0.5 rounded">/</code> to add a section (error, code, solution, etc.)
          </div>

          {/* Editor */}
          <div className="flex-grow relative">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleContentChange}
              onKeyDown={handleKeyDown}
              className="w-full h-full p-4 bg-black/50 rounded-lg border border-gray-700 text-white resize-none outline-none font-mono text-sm leading-relaxed"
              placeholder="Start typing or press / to add a section..."
            />

            {/* Slash command menu */}
            {showSlashMenu && (
              <div 
                ref={menuRef}
                className="absolute bg-[#1a1f2e] border border-teal-500/30 rounded-lg shadow-2xl z-50 min-w-[200px] max-h-[300px] overflow-y-auto"
                style={{ top: slashMenuPosition.top, left: slashMenuPosition.left }}
              >
                {filteredSections.map((section, idx) => (
                  <div
                    key={section.type}
                    onClick={() => insertSection(section.type)}
                    className={`px-3 py-2 cursor-pointer flex flex-col items-start ${
                      idx === selectedIndex ? 'bg-teal-500/20' : 'hover:bg-gray-700/50'
                    }`}
                  >
                    <div className={`font-semibold text-sm ${section.color}`}>{section.label}</div>
                    <div className="text-xs text-gray-500">/{section.type}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
    </AnimatedPage>
  );
}
=======
  // Parse tags into tagsArrya
  const tagsArray = initialLogData.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return (
    <AnimatedPage>
      <div className="w-screen h-screen bg-[#011522] text-white overflow-hidden flex flex-grow flex-col font-sans">
        {/* Header */}
        {/*<div className="border-b border-solid border-[#ffffff33]/30 bg-cover bg-[#41B3A9]/15 bg-[url(src/assets/gradient2.png) overflow-hidden">*/}
        <div className="border-b py-1 border-solid border-[#ffffff33]/30 bg-cover bg-[#011522] bg-[url(src/assets/Variant6.svg)] text-white overflow-hidden">
          <Header>
            <div className="flex items-center gap-4">
              <p className="font-semibold text-xl">{initialLogData.project}</p>
            </div>
            <div className="flex items-center gap-4">
              <Cancel />
              <Save onClick={handleSave} />
              <Profile />
            </div>
          </Header>
        </div>
>>>>>>> routed-pages

        {/*  Editor & Siderbar  */}
        <div className="flex flex-1 overflow-hidden p-4 sm:p-6 lg:p-8 gap-6">
          {/* AI Sidebar */}
          <AiSideNavBar insights={arg_insight} similarLogs={arg_similar} />

          {/* Main Area for the Editor */}
          <main className="flex-grow flex-1 overflow-hidden bg-[#011522] bg-[url(src/assets/Variant6.svg)] rounded-xl border border-gray-700 p-6 flex flex-col">
            <div className="mb-4">
              <div className="flex justify-center gap-2 items-center mb-2">
                {isEditingTitle ? (
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={() => setIsEditingTitle(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        setIsEditingTitle(false);
                      }
                    }}
                    className="font-semibold text-xl bg-transparent border-b border-teal-400 outline-none text-white"
                    autoFocus
                  />
                ) : (
                  <p
                    className="font-semibold text-xl cursor-pointer"
                    onClick={() => setIsEditingTitle(true)}>
                    {title}
                  </p>
                )}
                {/* Status Tag */}
                <StatusTag status={initialLogData.status} />
              </div>

              {/* Author and Date Info */}
              <div className="flex justify-center mb-5 items-center gap-x-4 gap-y-2 text-sm text-white">
                <span>
                  <strong>JD</strong> John Doe
                </span>
                <span>{creationDate.toLocaleDateString()}</span>
                <span>{creationDate.toLocaleTimeString()}</span>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {/* Type Tag */}
                <TypeTag type={initialLogData.type} />
                <span className="text-gray-400">|</span>
                {tagsArray.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400">
                    {tag}
                  </span>
                ))}
              </div>

              <nav className="w-full overflow-x-auto mt-4 p-1 bg-cover border-b border-solid border-white/20 ">
                {/* Navigation Links */}
                <ul className="flex items-center gap-30 text-white">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <button
                        type="button"
                        onClick={() => setActiveSection(link.id)}
                        className={`block p-2 font-semibold transition-colors ${
                          activeSection === link.id
                            ? "text-teal-300 border-b-2 border-teal-300"
                            : "text-gray-400 hover:text-white"
                        }`}>
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="flex-grow pt-1 flex">
              {activeSection === "error" && (
                <Section
                  section="Error"
                  content={sectionsContent.error}
                  onContentChange={(c) => {
                    handleSectionChange("error", c);
                    inputChanged(title, c);
                  }}
                />
              )}
              {activeSection === "code" && (
                <Section
                  section="Code Snippets"
                  content={sectionsContent.code}
                  onContentChange={(c) => {
                    handleSectionChange("code", c);
                    inputChanged(title, c);
                  }}
                />
              )}
              {activeSection === "solution" && (
                <Section
                  section="Solution"
                  content={sectionsContent.solution}
                  onContentChange={(c) => {
                    handleSectionChange("solution", c);
                    inputChanged(title, c);
                  }}
                />
              )}
              {activeSection === "resources" && (
                <Section
                  section="Resources"
                  content={sectionsContent.resources}
                  onContentChange={(c) => {
                    handleSectionChange("resources", c);
                    inputChanged(title, c);
                  }}
                />
              )}
              {activeSection === "comments" && (
                <Section
                  section="Comments"
                  content={sectionsContent.comments}
                  onContentChange={(c) => {
                    handleSectionChange("comments", c);
                    inputChanged(title, c);
                  }}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default EditLog;
