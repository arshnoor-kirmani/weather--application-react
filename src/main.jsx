import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.js";
import App from "./App.jsx";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="w-screen h-screen">
        <App />
      </div>
    </BrowserRouter>
  </Provider>
);
