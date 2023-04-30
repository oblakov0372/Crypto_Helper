import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Platforms from "./pages/platforms/Platforms";
import Home from "./pages/home/Home";
import Cryptocurrencies from "./pages/cryptocurrencies/Cryptocurrencies";
import TradesTracker from "./pages/tradesTracker/TradesTracker";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <div className="wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/platforms" element={<Platforms />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/tradesTracker" element={<TradesTracker />} />
              <Route path="/login" element={<Login />}></Route>
              <Route path="/registration" element={<Registration />}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
