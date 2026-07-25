import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

createRoot(rootElement as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
