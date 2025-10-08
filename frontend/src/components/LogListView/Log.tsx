// Component for a log in list view
// Used in search results and view all logs


import '/src/styles/App.css'
export interface LogProps {
    id: number;
    name: string;
    description: string;
    tags: string[];
}

function Log({ id, name, description, tags }: LogProps) {
    return (
        
        <li key={id} className="bg-[#011522]/50 px-3 py-1 h-20 text-white text-lg w-full rounded-lg border-white">
          <div className="text-left flex">
            <h2 className="font-dm-mono">{name}</h2>
            <div className="flex mx-1">
              {tags.map((item) => (
                <span 
                  key={item}
                  className="mx-1"
                >
                  <p className="text-lg mx-4 font-headvig w-full p-1 text-white text-[14px] text-center leading-6 bg-[#1E3249] rounded-[10px] border-[1px] border-[#6A7278]/45">
                    {item}
                  </p>
                </span> 
              ))}
            </div>
          </div>
        <div className="text-left font-headvig">
          {description}
        </div>
      </li>
    );
}


export default Log