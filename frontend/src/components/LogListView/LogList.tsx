import '/src/styles/App.css'
import Log from "./Log.tsx"
import type { LogProps } from "./Log.tsx"

interface LogListProps {
    logList: LogProps[]
}

function LogList({ logList }: LogListProps) {

  //TODO: get search results from backend
  //      implement tags as components

  return (
    <div>
      <ul className="space-y-5">
        {logList.map(log => 
          <Log 
            _id = {log._id} 
            title={log.title} 
            summary={log.summary} 
            tags={log.tags}
          />
        )}
      </ul>
    </div>
  )  
}

export default LogList

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