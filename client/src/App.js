import Sidebar from "./components/Navbar";
import {routes} from "./routes";
import {Route, Routes} from "react-router-dom";


function App() {
    return (
        <div className="min-h-full">
            <Sidebar/>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="rounded-lg h-96">
                            <Routes>
                                {routes.map(route => (
                                    <Route path={route.path} exact={route.exact} element={route.component}/>
                                ))}
                            </Routes>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
