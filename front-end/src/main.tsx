import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { I18nProvider } from "./i18n"; // <-- ajout
import { AuthProvider } from "./components/AuthCTA"; // <-- ajout

createRoot(document.getElementById("root")!).render(
   <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <I18nProvider>
          <App />
        </I18nProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
