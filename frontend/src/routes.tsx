import { Home, CreateNewProject, SearchResults} from "./pages";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/new-project", element: <CreateNewProject /> },
  { path: "/search-results", element: <SearchResults /> },
];