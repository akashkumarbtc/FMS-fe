import { Outlet } from "react-router-dom";
import Accounts from "./Accounts";
import Admin from "./Admin";
import SideBar from "./SideBar";
import { ProSidebarProvider } from "react-pro-sidebar";

const Layout = () => {
  return (
    <main className="App" style={{display:"flex"}}>
      {/* <ProSidebarProvider>
      <SideBar/>
      </ProSidebarProvider> */}
      <SideBar/>
       <Accounts/>
      <Outlet />
    </main>
  );
};

export default Layout;
