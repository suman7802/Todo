import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import axios from "axios";
import Login from "./components/Login.js";
import Registration from "./components/Registration";
import TodoHomePage from "./components/TodoHome";
import "./index.css";

axios.defaults.withCredentials = true;
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/todoHome" element={<TodoHomePage />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

const Root = () => {
  return (
    <div>
      <Outlet />
      <div className="footer">
        <a href="https://github.com/suman7802" target="_blank">
          GitHub
        </a>
        <a href="https://www.facebook.com/suman7802" target="_blank">
          suman sharma
        </a>
        <a>2023 Copyright. All Rights Reserved.</a>
      </div>
    </div>
  );
};

export default App;
