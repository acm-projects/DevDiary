import { Home, CreateNewProject, NewLog, Settings, SearchResults, AllLogs} from "./pages";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/new-project", element: <CreateNewProject /> },
  { path: "/search", element: <SearchResults /> },
  { path: "/new-log", element: <NewLog /> },
  { path: "/settings", element: <Settings /> },
  { path: "/all-logs", element: <AllLogs /> },
];