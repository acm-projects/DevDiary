// Component for a log in list view
// Used in search results and view all logs

import "/src/styles/App.css";
import Tag from "../Tags/Tag.tsx"
import type { TagProps } from "../Tags/Tag.tsx"
export interface LogProps {
  id: number;
  name: string;
  project: string;
  description: string;
  tags: TagProps[];
}

function Log({ id, name, project, description, tags }: LogProps) {
  return (
    <li
      key={id}
      className="bg-[#011522]/50 px-3 py-5 h-full text-white text-lg w-full rounded-lg border border-teal-500/30">
      <div className=" flex items-center">
        <div className="truncate">
          <h2 className="font-dm-mono w-full text-left text-xl">{name}</h2>
          <div className="text-left text-xs font-dm-mono ">{description} </div>
        </div>
        <div className="flex flex-row justify-end w-full gap-4">
          {/* TODO: Refactor Tags into components */}
          {tags.map((tag) => (
            <span key={tag.name} className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400">
              <Tag 
                name={tag.name}
                color={tag.color}
                selected={-1}
              />
              {/* <p className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400">
                {tag}
              </p> */}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}

export default Log;