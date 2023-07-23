import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import axios from "axios";
import Login from "./components/Login.js";
import Registration from "./components/Registration";
import TodoHomePage from "./components/TodoHome";
import Footer from "./components/footer.js";
import "./index.css";

axios.defaults.withCredentials = true;
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="todoHome" element={<TodoHomePage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
