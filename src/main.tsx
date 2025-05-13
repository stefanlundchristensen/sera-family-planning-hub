
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Define root element once to avoid memory leaks
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find root element");

// Use more memory-efficient createRoot API
createRoot(rootElement).render(<App />);
