import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { ProSidebarProvider } from "react-pro-sidebar";
import Employee from "./Employee";

const LayoutOperationsEmployee = () => {
  return (
    <main className="App" style={{display:"flex"}}>
      <SideBar/>
       <Employee/>
      <Outlet />
    </main>
  );
};

export default LayoutOperationsEmployee;
