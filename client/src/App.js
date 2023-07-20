import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login.js";
import Registration from "./components/Registration";
import TodoHomePage from "./components/TodoHome";
import "./index.css";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="todoHome" element={<TodoHomePage />} />
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
    </div>
  );
};

export default App;
