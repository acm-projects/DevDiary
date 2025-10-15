import "/src/styles/App.css";
import Log from "./Log.tsx";
import type { LogProps } from "./Log.tsx";

interface LogListProps {
  logList: LogProps[];
}

function LogList({ logList }: LogListProps) {
  //TODO: get search results from backend
  //      implement tags as components

  return (
    <div className="w-full overflow-y-auto">
      <ul className="space-y-5 font-dm-mono">
        {logList.map((log) => (
          <Log
            id={log.id}
            name={log.name}
            project={log.project}
            description={log.description}
            tags={log.tags}
          />
        ))}
      </ul>
    </div>
  );
}

export default LogList;