import { useState } from "react";

import "./App.css";
import Home from "./Pages/Home/Home";
import ContentContainer from "/src/component/Container/ContentContainer.tsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
