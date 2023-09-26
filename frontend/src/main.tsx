import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./infrastructure/i18n"
import "./styles/index.scss"
import "./styles/reset.scss"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
