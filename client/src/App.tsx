import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Platforms from "./pages/platforms/Platforms";
import Home from "./pages/home/Home";
import Cryptocurrencies from "./pages/cryptocurrencies/Cryptocurrencies";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
