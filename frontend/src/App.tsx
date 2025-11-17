import "./styles/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { routes } from "./routes.tsx";
import { AnimatePresence } from 'framer-motion';  //  Added page transition animations

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routes.map((r, i) => (
          <Route key={i} path={r.path} element={r.element} />
        ))}
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
