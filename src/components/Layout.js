import { Outlet } from "react-router-dom";
import Accounts from "./Accounts";
// import Accounts from '../pages/Accounts'
import Admin from "./Admin";
import SideBar from "./SideBar";
import { ProSidebarProvider } from "react-pro-sidebar";
import Invoice from "./Invoice";

const Layout = () => {
  return (
    <main className="App" style={{display:"flex"}}>
      {/* <ProSidebarProvider>
      <SideBar/>
      </ProSidebarProvider> */}
      <SideBar/>
       <Accounts/>
       {/* <Invoice/> */}
      <Outlet />
    </main>
  );
};

export default Layout;
