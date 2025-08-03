import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home_Layout from "./Layouts/Home_Layout.jsx";
import Login from "./Utilities/Login/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home_Layout />,
    children: [
      {
        path: "login",
        element: <Login />
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
