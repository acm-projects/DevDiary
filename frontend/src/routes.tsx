import { Home, CreateNewProject, NewLog, Settings} from "./pages";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/new-project", element: <CreateNewProject /> },
  { path: "/new-log", element: <NewLog /> },
  { path: "/settings", element: <Settings /> },
];