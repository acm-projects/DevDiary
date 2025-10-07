import '/src/styles/App.css'
import {useState, useRef, useEffect} from "react";
import ArrowIcon from "../assets/icons/sideArrow.png";

interface DropdownProps {
    label: string;
    options: string[];
    defaultValue?: string; // optional default selected value
    onSelect: (option: string) => void;
}

function Dropdown({ label, options, defaultValue }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);                          // track if dropdown is open
    const [selected, setSelected] = useState(defaultValue || options[0]); // default to first option if no defaultValue
    const dropdownRef = useRef<HTMLDivElement>(null);

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

            <button onClick={ () => setIsOpen(!isOpen) } 
                type="button"
                className="font-headvig w-full px-2 py-1 text-white text-[14px] text-left cursor-pointer hover:border-white/50 leading-6 bg-[#011522] rounded-[10px] border-[1px] border-[#6A7278]/45">
                {selected} {/* Show selected option */}
                <img 
                    src={ArrowIcon} 
                    alt="arrow" 
                    className="w-[1vw] cursor-pointer rotate-90 float-right mt-1.5 mr-0.5" 
                />  {/* Down arrow icon */}
                
            </button>

            {isOpen && (
                <ul className="font-headvig absolute left-0 mt-1 w-full bg-[#1E3249] border border-[#6A7278]/45 rounded-[10px] max-h-40 overflow-y-auto shadow-lg z-10">
                    {options.map((option, idx) => (     // Map over options to create list items
                        <li 
                            key={idx}
                            onClick= { () => {
                                setSelected(option); // Update selected option
                                setIsOpen(false);    // Close dropdown
                            }}
                            className="p-2 leading-6 hover:bg-[#4bddb433]/50 cursor-pointer text-white text-[14px]"> {/* List items styling */}
                            {option}        {/* Display option text */}
                        </li>
                    ))}
                </ul>
            )}
        </div>

    );
}


export default Dropdown