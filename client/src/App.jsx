import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

import useinitAuth from "./useinitAuth";
import Auth from "./Pages/Auth/Auth";
import User from "./Pages/User/User";
import ErrorPage from "./components/ErrorPage";

function App() {
  useinitAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/profile/*" element={<User />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
