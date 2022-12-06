import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Puhelintiedot from "./components/Puhelintiedot";
import Ylatunniste from "./components/Ylatunniste";
import Tietoa from "./components/pages/Tietoa";
import LisaaPuhelintieto from "./components/LisaaPuhelintieto";
import MuokkaaPuhelintieto from "./components/MuokkaaPuhelintieto";
import "bootstrap/dist/css/bootstrap.min.css";

import GlobalState from "./context/GlobalState";

function App() {
  return (
    <GlobalState>
      <Router>
        <div className="App">
          <Ylatunniste turvataso="keskisuuri" />
          <div className="container">
            <Routes>
              <Route path="/" element={<Puhelintiedot />} />
              <Route
                path="/puhelintieto/lisaa"
                element={<LisaaPuhelintieto />}
              />
              <Route
                path="/puhelintieto/muokkaa/:id"
                element={<MuokkaaPuhelintieto />}
              />
              <Route path="/tietoa" element={<Tietoa />} />
            </Routes>
          </div>
        </div>
      </Router>
    </GlobalState>
  );
}

export default App;
