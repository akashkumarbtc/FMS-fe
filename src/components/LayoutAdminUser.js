import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import User from "./User";

const LayoutAdminUser = () => {
  return (
    <main className="App" style={{display:"flex"}}>
      <SideBar/>
       <User/>
      <Outlet />
    </main>
  );
};

export default LayoutAdminUser;
