import type { Component } from "react";
import {
  Home,
  CreateNewProject,
  NewLog,
  Settings,
  SearchResults,
  AllLogs,
} from "./pages";
import LandingPage from "pages/LandingPage";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/new-project", element: <CreateNewProject /> },
  { path: "/search-results", element: <SearchResults /> },
  { path: "/new-log", element: <NewLog /> },
  { path: "/settings", element: <Settings /> },
  { path: "/all-logs", element: <AllLogs /> },
];
