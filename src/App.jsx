import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <main className="px-5 md:px-16 lg:px-24 xl:px-32 ">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/test-page" element={<TestPage />}></Route>
        <Route path="result-page" element={<ResultPage />}></Route>
      </Routes>
    </main>
  );
}

export default App;
