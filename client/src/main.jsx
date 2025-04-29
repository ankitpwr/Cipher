import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { RecoilRoot } from "recoil";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <App />
    <Toaster />
  </RecoilRoot>
);
