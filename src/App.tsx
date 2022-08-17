import { useCallback } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DocPage from "./pages/DocPage";

function App() {
  const handleRender = useCallback(() => {
    return <Navigate to={`/${Math.random().toString(36).substring(7)}`} />;
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
