import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LNF from "./LNF.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <LNF />
    </AuthProvider>
  </StrictMode>
);
