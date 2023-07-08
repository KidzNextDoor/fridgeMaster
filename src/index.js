import React from "react";
import { createRoot } from "react-dom/client";
<<<<<<< HEAD
import App from "./components/App";
=======
import App from "./components/App.jsx";
import '../styles/tailwind.css'
>>>>>>> 5a6c7677045fd9a32ce2abc65cf78b741cb12026

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);


// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./components/App";

// ReactDOM.render(<App />, document.getElementById("root"));