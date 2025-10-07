import { Home, CreateNewProject, DefaultReactApp, SearchResults} from "./pages";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/new-project", element: <CreateNewProject /> },
  { path: "/DefaultReactApp", element: <DefaultReactApp /> },
  { path: "/search-results", element: <SearchResults /> },
];