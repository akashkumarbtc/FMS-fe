import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { ProSidebarProvider } from "react-pro-sidebar";
import Salary from "./Salary";

const LayoutOperationsSalary = () => {
  return (
    <main className="App" style={{display:"flex"}}>
      <SideBar/>
       <Salary/>
      <Outlet />
    </main>
  );
};

export default LayoutOperationsSalary;
