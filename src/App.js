import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Admin from "./components/Admin";
import Accounts from "./components/Accounts";
import Operations from "./components/Operations";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import Missing from "./components/Missing";
import { Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";

function App() {
  const Roles = {
    Admin: "admin",
    Accounts: "accounts",
    Operations: "operations",
  };

  return (
 <Routes>
      <Route path="/dash" exact   element={<Layout />}/>

        <Route path="/" exact element={<Login />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="resetPassword" element={<ResetPassword />} />
        <Route path="unAuthorized" element={<Unauthorized />} />
        <Route path="sidebar" element={SideBar}></Route>
        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[Roles.Admin]} />}>
          <Route path="admin" element={<Admin />} />
      </Route>
        <Route element={<RequireAuth allowedRoles={[Roles.Accounts]} />}>
          <Route path="accounts" element={<Accounts />} />
          </Route>
        <Route element={<RequireAuth allowedRoles={[Roles.Operations]} />}>
          <Route path="operations" element={<Operations />} />
       </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;

