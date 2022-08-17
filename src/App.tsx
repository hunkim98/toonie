import { useCallback, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DocPage from "./pages/DocPage";
import { generateRandomParams } from "./utils/generateRandomParams";

function App() {
  const handleRender = useCallback(() => {
    return <Navigate to={generateRandomParams()} />;
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={handleRender()} />
        <Route path="/:docKey" element={<DocPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
