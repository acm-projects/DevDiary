import { Home, CreateNewProject, NewLog, Settings, Login, SignUp, SearchResults, AllLogs} from "./pages";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/new-project", element: <CreateNewProject /> },
  { path: "/search", element: <SearchResults /> },
  { path: "/new-log", element: <NewLog /> },
  { path: "/settings", element: <Settings /> },
  { path: "/login", element: <Login /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/all-logs", element: <AllLogs /> },
];