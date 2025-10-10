import { Home, CreateNewProject, DefaultReactApp} from "./pages";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/new-project", element: <CreateNewProject /> },
  { path: "/DefaultReactApp", element: <DefaultReactApp /> },
];