import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import Tasks from "../pages/Tasks";
import Register from "../pages/Register";
import Login from "../pages/Login";

const TaskRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/tasks" element={<Tasks />} exact />
      </Routes>
    </BrowserRouter>
  );
};

export default TaskRoutes;
