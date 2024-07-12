import React from "react";
import './components/partials/Partials/Form.css'
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { SocketContextProvider } from "./components/contexts/Socket.tsx";
import ChartAuthContexProvider from "./components/contexts/ChartAuthContext.tsx";
const selectRoot = document.getElementById("root");
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
})
if (selectRoot !== null) {
  const root = ReactDOM.createRoot(selectRoot);
  root.render(
    <BrowserRouter>
      <ChartAuthContexProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </ChartAuthContexProvider>
    </BrowserRouter>
  );
}
