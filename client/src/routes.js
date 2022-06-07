import Dashboard from "./pages/Dashboard";
import Pods from "./pages/Pods";
import Nodes from "./pages/Nodes";
import Services from "./pages/Services";
import {v4 as uuidv4} from "uuid";

export const routes = [
    {
        id: uuidv4(),
        path: '/dashboard',
        exact: true,
        component: Dashboard,
    },
    {
        id: uuidv4(),
        path: 'nodes',
        exact: true,
        component: Nodes,
    },
    {
        id: uuidv4(),
        path: 'pods',
        exact: true,
        component: Pods,
    },
    {
        id: uuidv4(),
        path: '/services',
        exact: true,
        component: Services,
    },
]
