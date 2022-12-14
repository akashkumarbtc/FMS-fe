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
import LayoutAccounts from "./components/LayoutAccounts";
import LayoutAdmin from "./components/LayoutAdmin";
import LayoutAdminUser from "./components/LayoutAdminUser";
import LayoutOperationsExpenditure from "./components/LayoutOperationsExpenditure";
import LayoutOperationsEmployee from "./components/LayoutOperationsEmployee";
import LayoutOperationsSalary from "./components/LayoutOperationsSalary";

function App() {
  const Roles = {
    Admin: "admin",
    Accounts: "accounts",
    Operations: "operations",
  };

  return (
 <Routes>
      {/* <Route path="/dashboard" exact   element={<Layout />}/> */}

        <Route path="/" exact element={<Login />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route exact path="/resetPassword/:resetToken"  element={<ResetPassword />} />
        <Route path="unAuthorized" element={<Unauthorized />} />
        <Route path="sidebar" element={SideBar}></Route>
        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[Roles.Admin]} />}>
          {/* <Route path="admin" element={<Admin />} /> */}
          <Route path="admin/dashboard" element={<LayoutAdmin />} />
          <Route path="admin/User" element={<LayoutAdminUser />} />
      </Route>
        <Route element={<RequireAuth allowedRoles={[Roles.Accounts]} />}>
          {/* <Route path="accounts" element={<Accounts />} /> */}
          <Route path="/dashboard" exact   element={<Layout />}/>
          <Route path="/dashboard/invoice" exact   element={<LayoutAccounts />}/>
          </Route>
        <Route element={<RequireAuth allowedRoles={[Roles.Operations]} />}>
          {/* <Route path="operations/expenditure" element={<Operations />} /> */}
          <Route path="operations/expenditure" element={<LayoutOperationsExpenditure />} />
          <Route path="operations/employee" element={<LayoutOperationsEmployee />} />
          <Route path="operations/salary" element={<LayoutOperationsSalary />} />

       </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;

