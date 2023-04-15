import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Platforms from "./pages/platforms/Platforms";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/platforms" element={<Platforms />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
