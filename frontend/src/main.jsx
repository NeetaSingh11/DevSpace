import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/global.css";
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    <Toaster
        position="top-right"
        toastOptions={{
            duration: 2500,
            style: {
                borderRadius: "12px",
                padding: "14px",
            },
        }}
    />
    <App />
    </>
  </StrictMode>,
)
