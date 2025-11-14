import "./styles/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { routes } from "./routes.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes location={location} key={location.pathname}>
        {routes.map((r, i) => (
          <Route key={i} path={r.path} element={r.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
