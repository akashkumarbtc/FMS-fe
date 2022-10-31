import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Admin from "./components/Admin";
import Accounts from "./components/Accounts";
import Operations from "./components/Operations";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="resetPassword" element={<ResetPassword />} />
        <Route path="admin" element={<Admin />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="operations" element={<Operations />} />
      </Route>
    </Routes>

    // <div className="App">
    //   <Login />
    // </div>
  );
}

export default App;
