import { Home, CreateNewProject, NewLog, Settings, SearchResults} from "./pages";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/new-project", element: <CreateNewProject /> },
  { path: "/search-results", element: <SearchResults /> },
  { path: "/new-log", element: <NewLog /> },
  { path: "/settings", element: <Settings /> },
];