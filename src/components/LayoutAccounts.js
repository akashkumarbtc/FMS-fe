import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Invoice from "./Invoice";

const LayoutAccounts = () => {
  return (
    <main className="App" style={{display:"flex"}}>
      <SideBar/>
       <Invoice/>
      <Outlet />
    </main>
  );
};

export default LayoutAccounts;
