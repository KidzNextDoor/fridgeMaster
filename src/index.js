import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import '../styles/tailwind.css'

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);


// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./components/App";

// ReactDOM.render(<App />, document.getElementById("root"));