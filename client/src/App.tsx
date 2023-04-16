import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Platforms from "./pages/platforms/Platforms";
import Home from "./pages/home/Home";
import Service1 from "./pages/volumes/Volume";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/volumes" element={<Service1 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
