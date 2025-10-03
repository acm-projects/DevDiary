import { useState } from "react";

import "./App.css";
import Home from "./Pages/Home/Home";
import TemplateBox from "/src/component/NavBar/TemplateBox.tsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TemplateBox />
    </>
  );
}

export default App;
