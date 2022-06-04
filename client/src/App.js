import Sidebar from "./components/Navbar";
import {routes} from "./routes";
import {Route, Routes} from "react-router-dom";


function App() {
    return (
        <div className="min-h-full">
            <Sidebar/>
            <main>

                            <Routes>
                                    {routes.map(route => (
                                        <Route key={route.id} path={route.path} exact={route.exact} element={<route.component/>}/>
                                    ))}
                            </Routes>

            </main>
        </div>
    );
}

export default App;
