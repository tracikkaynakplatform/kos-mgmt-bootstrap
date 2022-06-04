import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Navbar";

function App() {
  return (
      <div className="min-h-full">
          <Sidebar />
          <main>
              <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                  <div className="px-4 py-6 sm:px-0">
                      <div className="rounded-lg h-96">
                          <Routes>
                              <Route path="/" element={<Home />} />
                              <Route path="/team" element={<Home />} />
                          </Routes>
                      </div>
                  </div>
              </div>
          </main>
      </div>
  );
}

export default App;
