
import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import HomePage from "./pages/HomePage";


const App = () => {
  return (
    <>
    <Router>
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route exact path="/signin" element={<SignIn/>} />
            <Route exact path="/signup" element={<SignUp/>} />
            <Route exact path="/Dashboard" element={<Dashboard />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
      </Router>
    </>
    
  );
};

export default App;
