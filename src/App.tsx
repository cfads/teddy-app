import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Menu } from "./components/Shared/Menu";
import Parceiros from "./pages/Parceiros";
import Empresas from "./pages/Empresas";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/parceiros" element={<Parceiros />} />
            <Route path="/empresas" element={<Empresas />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
