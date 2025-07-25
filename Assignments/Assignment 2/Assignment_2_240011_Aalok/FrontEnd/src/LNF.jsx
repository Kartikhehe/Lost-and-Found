import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home_Layout from "./Layouts/Home_Layout.jsx";
import MyLost_Layout from "./Layouts/MyLost_Layout.jsx";
import MyFound_Layout from "./Layouts/MyFound_Layout.jsx";
import AuthForm from "./Utilities/Auth/AuthForm.jsx";
import ForgotPassword from "./Utilities/Auth/ForgotPassword.jsx";
import Report from "./Utilities/Report/Report.jsx";
import ClaimForm from "./Utilities/Claim/Claim.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home_Layout />,
    children: [
      { path: "login", element: <AuthForm /> },
      { path: "signup", element: <AuthForm /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "report", element: <Report /> },
      { path: "claim/:itemId", element: <ClaimForm /> },
    ],
  },
  {
    path: "/my-lost",
    element: <MyLost_Layout />,
  },
  {
    path: "/my-found",
    element: <MyFound_Layout />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
