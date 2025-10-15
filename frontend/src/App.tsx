import { useState } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes.tsx";

import Home from "./pages/Home.tsx";
import ContentContainer from "./components/Container/ContentContainer.tsx";
import { AllLogs, Login } from "pages/index.ts";
import { SignUp } from "pages/index.ts";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((r, i) => (
          <Route key={i} path={r.path} element={r.element} />
        ))}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/all" element={<AllLogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
