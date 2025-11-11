import React from "react";
import Tag from "../Tags/Tag.tsx"
import type {TagProps} from "../Tags/Tag.tsx"
import StatusTag from "components/StatusTag.tsx";
import { useNavigate } from "react-router-dom";

export interface ProjectProps {
    id: number;
    name: string;
    description: string;
    tags: TagProps[];
    status: string;
}

const Project = ({id, name, description, tags, status}: ProjectProps) => {4
  const navigate = useNavigate();

  const handleClick = (name: string) => {
      navigate('/projects/'+name); 
    }

  return (
    <>
      <div className="h-full w-full shrink-0 rounded-3xl cursor-pointer hover:scale-105 ease-in-out duration-200 bg-[#011522] flex flex-col justify-between py-2">
        <div className="text-white text-left text-2xl p-4 flex justify-between">
          {name}
          <span><StatusTag status={status}/></span>
        </div>
        <div className="text-gray-100 text-lg text-left px-4 truncate">
          {description}
        </div>

        <div className="grid grid-cols-3 justify-items-center w-full gap-y-2">
          {tags.map((tag) => (
            <span key={tag.name} className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400">
              <Tag 
                name={tag.name}
                selected={-1}
              />
            </span>
          ))}
        </div>

        <div className="flex justify-center align-middle mb-4">
          <button className="bg-[#244F51] bg-opacity-20 w-[155px] h-[35px] ml-1.5 mr-1.5 rounded-xl hover:scale-105 ease-in-out duration-200"
            onClick={(e) => handleClick(name)}
          >
            View Logs
          </button>
        </div>
      </div>
    </>
  );
};

export default Project;