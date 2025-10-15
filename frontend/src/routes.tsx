import {
  Home,
  CreateNewProject,
  Settings,
  Login,
  SignUp,
  SearchResults,
  AllLogs,
  ViewLog,
  LogMetaData,
  EditLog,
} from "./pages";

export const routes = [
  { path: "/new-project", element: <CreateNewProject /> },
  { path: "/search", element: <SearchResults /> },
  { path: "/home", element: <Home /> },
  { path: "/settings", element: <Settings /> },
  { path: "/login", element: <Login /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/all-logs", element: <AllLogs /> },
  { path: "/view-log", element: <ViewLog /> },
  { path: "/log-meta-data", element: <LogMetaData /> },
  { path: "/edit-log", element: <EditLog /> },
];
