// Component for a log in list view
// Used in search results and view all logs


import '/src/styles/App.css'
export interface LogProps {
    _id: number;
    title: string;
    summary: string;
    tags: string[];
}

function Log({ _id, title, summary, tags }: LogProps) {
    return (

        <li key={_id} className="bg-[#011522]/50 px-3 py-5 h-full text-white text-lg w-full rounded-lg border-white">
          <div className="text-left flex">
            <h2 className="font-dm-mono">{title}</h2>
            <div className="flex mx-1">
              {/* TODO: Refactor Tags into components */}
              {tags.map((tag) => (
                <span 
                  key={tag}
                  className="mx-1"
                >
                  <p className="text-lg mx-4 font-headvig w-full p-1 text-[14px] text-center leading-6 bg-[#1E3249] rounded-[10px] border-[1px] border-[#6A7278]/45">
                    {tag}
                  </p>
                </span> 
              ))}
            </div>
          </div>
        <div className="text-left font-headvig">
          {summary}
        </div>
      </li>
    );
}


export default Log

// {
//         title: {
//             type: String,
//             required: true
//         },
//         content: {
//             type: String,
//             required: true
//         },
//         tags: {
//             type: [{ type: String }],
//             required: false
//         },
//         summary: { 
//             type: String,
//             required: false
//         },
//         explanation: { 
//             type: String,
//             required: false
//         },
//         similar_logs: { 
//             type: [{ type: String }],
//             required: false
//         },
//         embedding: { 
//             type: [Number],
//             required: false, 
//             default: []
//         }

//     },