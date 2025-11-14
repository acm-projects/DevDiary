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

interface LogData {
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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && 
          textareaRef.current && !textareaRef.current.contains(event.target as Node)) {
        setShowSlashMenu(false);
      }
    };

    if (showSlashMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSlashMenu]);

  // Load log data
  useEffect(() => {
    const loadLog = async () => {
      // Editing existing log by ID
      if (logIdFromQuery) {
        try {
          const res = await fetch(`http://localhost:5000/api/logs/${logIdFromQuery}`);
          const data = await res.json();
          
          // Convert sections array back to markdown format
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
      // Data passed via state
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
      // Data from URL params (from LogMetaData)
      else {
        const title = searchParams.get('title');
        const project = searchParams.get('project');
        const type = searchParams.get('type');
        const status = searchParams.get('status');
        const tags = searchParams.get('tags');
        
        if (title || project || type || status || tags) {
          console.log('Loading data from URL params:', { title, project, type, status, tags });
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

  // Handle textarea input
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);

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
      
      // Calculate menu position based on cursor
      const textarea = textareaRef.current;
      if (textarea) {
        // Get the textarea's position
        const textareaRect = textarea.getBoundingClientRect();
        
        // Estimate line height and character width
        const lineHeight = 24; 
        const charWidth = 8; 
        
        // Count lines before cursor
        const linesBeforeCursor = textBeforeCursor.split('\n').length - 1;
        const lastLineText = textBeforeCursor.split('\n').pop() || '';
        
        // Calculate position
        const top = linesBeforeCursor * lineHeight + lineHeight + 8; // 8px padding
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
    
    // Remove the slash command
    const lines = textBeforeCursor.split('\n');
    lines[lines.length - 1] = lines[lines.length - 1].replace(/\/\w*$/, '');
    const newTextBefore = lines.join('\n');
    
    // Insert the section marker
    const newContent = `${newTextBefore}/${sectionType}\n\n${textAfterCursor}`;
    setContent(newContent);
    setShowSlashMenu(false);
    
    // Focus back on textarea
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
        // Save previous section if exists
        if (currentSection) {
          sections.push({ ...currentSection, order: order++ });
        }
        
        // Start new section
        const sectionType = line.substring(1).trim();
        if (SECTION_TYPES.find(s => s.type === sectionType)) {
          currentSection = { type: sectionType, content: '' };
        }
      } else if (currentSection) {
        // Add content to current section
        currentSection.content += (currentSection.content ? '\n' : '') + line;
      }
    }
    
    // Push the last section if exists
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
        <AiSideNavBar />
        
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

export default EditLog;