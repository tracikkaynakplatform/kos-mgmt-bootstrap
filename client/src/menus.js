import { v4 as uuidv4 } from 'uuid';

const menus = [
    {
        id: uuidv4(),
        path: "/dashboard",
        name: "Dashboard"
    },
    {
        id: uuidv4(),
        path: "/nodes",
        name: "Nodes"
    },
    {
        id: uuidv4(),
        path: "/pods",
        name: "Pods"
    },
    {
        id: uuidv4(),
        path: "/services",
        name: "Services"
    }
]

export default menus
