import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Upload from "./components/Upload";
import Gallery from "./components/Gallery";
import NoPage from "./components/NoPage";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/upload" element={<Upload />}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
        <Route path="*" element={<NoPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
