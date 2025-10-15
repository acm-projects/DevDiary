import {Home, CreateNewProject, Settings, Login, SignUp, SearchResults, AllLogs, ViewLog, LogMetaData, EditLog, LandingPage, Projects} from "./pages";

export const routes = [
  {path: "/", element: <LandingPage /> },
  { path: "/home", element: <Home /> },
  { path: "/new-project", element: <CreateNewProject /> },
  { path: "/search", element: <SearchResults /> },
  { path: "/settings", element: <Settings /> },
  { path: "/login", element: <Login /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/all-logs", element: <AllLogs /> },
  { path: "/view-log", element: <ViewLog /> },
  { path: "/log-meta-data", element: <LogMetaData /> },
  { path: "/edit-log", element: <EditLog /> },
  { path: "/projects", element: <Projects /> },
];
