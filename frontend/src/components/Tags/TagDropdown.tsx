import '/src/styles/App.css'
import {useState, useRef, useEffect} from "react";
import ArrowIcon from "/src/assets/icons/sideArrow.png";
import Tag from "./Tag.tsx"
import type { TagProps } from "./Tag.tsx"
interface TagDropdownProps {
    label: string;
    tags: TagProps[];
    defaultValue?: string; // optional default selected value
    sendDataToParent: (data: string[]) => void; 
}



function Dropdown({ label, tags, defaultValue, sendDataToParent }: TagDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);   
    const [query, setQuery] = useState("");
                           // track if dropdown is open
    const [selectedMap, setSelectedMap] = useState<Record<string, number>>(() => {
        const initialState: Record<string, number> = {};
        tags.forEach(tag => {
            initialState[tag.name] = tag.selected ?? 0; // default to 0 if not set
        });
        return initialState;
    });    
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredTags = tags.filter((tag, i) => {
        return query === "" || tag.name.toLowerCase().includes(query.toLowerCase());
    });
    
    function handleSelect(tag: TagProps) {
        setSelectedMap(prev => {
            const current = prev[tag.name];
            // Only toggle if the tag isn't permanently disabled (-1)
            if (current === -1) return prev;

            const next = current === 1 ? 0 : 1;
            const updated = {
                ...prev,
                [tag.name]: next,
            };

            sendDataToParent(tags.filter(t => updated[t.name] === 1).map(t => t.name));
            return updated;
        });
        
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {label && <p className="font-headvig text-sm flex justify-start-safe">{label}</p>} 

            {/* <button onClick={ () => setIsOpen(!isOpen) } 
                type="button"
                className="font-headvig w-full px-2 py-1 text-white text-[14px] text-center cursor-pointer hover:border-white/50 leading-6 bg-[#011522] rounded-[10px] border-[1px] border-[#6A7278]/45">
                Tags 
                <img 
                    src={ArrowIcon} 
                    alt="arrow" 
                    className="w-[1vw] cursor-pointer rotate-90 float-right mt-1.5 mr-0.5" 
                /> 
                
            </button> */}

            <input
                type="text"
                className="bg-[#011522] px-3 py-1 placeholder-gray-400 placeholder:font-headvig font-headvig text-white text-lg w-full rounded-lg border-white border-0"
                value={query}
                placeholder="Enter Tags"
                onClick={ () => setIsOpen(true)}
                onChange={(e) => setQuery(e.target.value)}
            />

            { isOpen && (
                <ul className="font-headvig absolute left-0 mt-1 w-full bg-[#1E3249] border border-[#6A7278]/45 rounded-[10px] max-h-40 overflow-y-auto shadow-lg z-10">
                    {filteredTags.map((tag, idx) => (     // Map over tags to create list items
                        <li 
                            key={idx}
                            onClick= { () => {handleSelect(tag) }}
                            className="p-2 leading-6 hover:bg-[#4bddb433]/50 cursor-pointer text-white text-[14px]"                            
                        > {/* List items styling */}
                            <Tag 
                                name={tag.name}
                                color={tag.color}
                                selected={selectedMap[tag.name] ?? 0}
                            />        {/* Display option text */}
                        </li>
                    ))}
                </ul>
            )}
        </div>

    );
}


export default Dropdown
