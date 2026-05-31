import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppWrapper>
      <App />
    </AppWrapper>
  </BrowserRouter>
);
