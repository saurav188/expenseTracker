import ReactDOM from "react-dom/client";
import "./tailwind.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./AccessControl/login.jsx";
import Dashboard from "./Pages/dashBoard.jsx";
import SignUp from "./AccessControl/signup.jsx";

//Routing Page
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
