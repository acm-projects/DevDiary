import { useState } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes.tsx";

import Home from "./pages/Home.tsx";
import ContentContainer from "./components/Container/ContentContainer.tsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((r, i) => (
          <Route key={i} path={r.path} element={r.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
