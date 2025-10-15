// Component for a log in list view
// Used in search results and view all logs

import "/src/styles/App.css";
export interface LogProps {
  id: number;
  name: string;
  description: string;
  tags: string[];
}

function Log({ id, name, description, tags }: LogProps) {
  return (
    <li
      key={id}
      className="bg-[#011522]/50 px-3 py-5 h-full text-white text-lg w-full rounded-lg border border-teal-500/30">
      <div className=" flex">
        <h2 className="font-dm-mono w-full text-left ">{name}</h2>
        <div className="flex flex-row justify-end w-full">
          {/* TODO: Refactor Tags into components */}
          {tags.map((tag) => (
            <span key={tag} className="mx-1 ">
              <p className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400">
                {tag}
              </p>
            </span>
          ))}
        </div>
      </div>
      <div className="text-left text-xs font-dm-mono">{description}</div>
    </li>
  );
}

export default Log;
