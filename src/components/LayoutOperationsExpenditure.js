import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { ProSidebarProvider } from "react-pro-sidebar";
import Operations from "./Operations";

const LayoutOperationsExpenditure = () => {
  return (
    <main className="App" style={{display:"flex"}}>
      <SideBar/>
       <Operations/>
      <Outlet />
    </main>
  );
};

export default LayoutOperationsExpenditure;
