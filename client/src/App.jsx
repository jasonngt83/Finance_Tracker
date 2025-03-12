import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import './App.css';
import App2 from "./component/App"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App2 />}></Route>
      </Routes>
    </Router>

  );
}

export default App;
