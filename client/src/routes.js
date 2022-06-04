import CreateCluster from "./pages/CreateCluster";
import Dashboard from "./pages/Dashboard";
import Pods from "./pages/Pods";
import Nodes from "./pages/Nodes";
import Services from "./pages/Services";

export const routes = [
    {
        id: 1,
        path: '/dashboard',
        exact: true,
        component: Dashboard,
    },
    {
        id: 2,
        path: '/',
        exact: true,
        component: CreateCluster,
    },
    {
        id: 3,
        path: 'nodes',
        exact: true,
        component: Nodes,
    },
    {
        id: 4,
        path: 'pods',
        exact: true,
        component: Pods,
    },
    {
        id: 5,
        path: '/services',
        exact: true,
        component: Services,
    },
]
