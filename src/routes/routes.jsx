import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import App from "../App";
import Protect from "./Protect";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <Protect>
                <App />
            </Protect>
        ),
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />
    }
])

export default appRouter;
