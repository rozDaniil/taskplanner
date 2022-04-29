import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import { Navbar } from "./components/Header";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { Event } from "./pages/Event";
import { Login } from "./pages/Login";

function App() {
  const navigate = useNavigate();

  const { isAuth } = useTypedSelector(({ auth }) => auth);

  useEffect(() => {
    navigate("/");
  }, [isAuth]);

  return (
    <Layout className="App">
      <Navbar />
      <Content>
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Event /> : <Navigate to="/login" replace />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
