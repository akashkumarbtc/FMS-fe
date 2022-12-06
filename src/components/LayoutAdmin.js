import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { ProSidebarProvider } from "react-pro-sidebar";
import Admin from "./Admin";

const LayoutAdmin = () => {
  return (
    <main className="App" style={{display:"flex"}}>
      <SideBar/>
       <Admin/>
      <Outlet />
    </main>
  );
};

export default LayoutAdmin;
