import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Menu } from "./components/Menu";
import Parceiros from "./pages/Parceiros";
import Empresas from "./pages/Empresas";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parceiros" element={<Parceiros />} />
          <Route path="/empresas" element={<Empresas />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
