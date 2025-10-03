// TODO
// Change the dropdown to use the dropdown component
// Make tags their own component

import React, { useState } from "react";

interface TagSearchProps {
    options: string[];
}

function TagSearch({options }: TagSearchProps) {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<string[]>([]);

    const filteredOptions = options.filter(
        (opt) => 
            opt.toLowerCase().includes(query.toLowerCase()) && 
        !selected.includes(opt)
    );

    function handleSelect(option: string) {
        setSelected((prev) => [...prev, option]);
        setQuery("");
    }

    function removeSelection(option: string) {
        setSelected((prev) => prev.filter((item) => item !== option));
    }

    return (
        <div className="flex items-center">
            
            <div>
                <input
                    type="text"
                    className="bg-[#011522] px-3 py-1 placeholder-gray-400 placeholder:font-headvig font-headvig text-white text-lg w-full rounded-lg border-white border-0"
                    value={query}
                    placeholder="Enter Tags"

                    onChange={(e) => setQuery(e.target.value)}
                />

                {query && filteredOptions.length > 0 && (
                    <ul className="px-3 py-y font-headvig absolute mt-1 bg-[#1E3249] border border-[#6A7278]/45 rounded-[10px] max-h-40 overflow-y-auto shadow-lg z-10">
                        {filteredOptions.map((option) => (
                            <li
                                key={option}
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex mx-1">
                {selected.map((item) => (
                    <span 
                        key={item}
                        className="mx-1"
                    >
                        <button
                            type="button"
                            className="text-lg mx-4 font-headvig w-full p-1 text-white text-[14px] text-center cursor-pointer hover:border-red-800/50 leading-6 bg-[#1E3249] rounded-[10px] border-[1px] border-[#6A7278]/45"
                            onClick={() => removeSelection(item)}
                        >{item}</button>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default TagSearch