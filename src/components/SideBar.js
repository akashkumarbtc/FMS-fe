import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import React from "react";
import "../css/sideBar.css";
import "react-pro-sidebar/dist/css/styles.css";
import bluetickIcon from "../assets/bluetickIcon.png";
import dashboardIcon from "../assets/dashboardIcon.png";
import invoiceIcon from "../assets/invoiceIcon.png";
import invoiceIconSelected from "../assets/invoiceIconSelected.png";
import dashboardIconSelected from "../assets/dashboardIconSelected.png";
import logoutIcon from "../assets/logoutIcon.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const SideBar = () => {
  const userData = JSON.parse(localStorage.getItem("auth"));
  const [itemSelect, setItemSelect] = useState("");
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setItemSelect("dashboard");

  }, []);

//   const onItemClick = (item) => {
//     debugger;
//     if (!status) {
//     //   setItemSelect(item);
//       navigate("/dashboard/invoice");
//     } else if (status) {
//     //   setItemSelect(item);
//       navigate("/dashboard");
//     }
//   };
  const logoutHandle = () => {
    navigate("/");
  };
  return (
    <div style={{ height: "100vh" }}>
      <ProSidebar style={{ background: "#051134 !important" }}>
        <SidebarHeader className="sidebar-header-content">
          <img
            src={bluetickIcon}
            alt="bluetickIcon"
            style={{ height: "48px" }}
          />
          <h2>Bluetick Consultants</h2>
        </SidebarHeader>
        <SidebarContent className="sidebar-content">
          <Menu>
            {userData.roles[0] == "accounts" &&  <MenuItem
              id="dashboard"
              className={
                status
                  ? "dashboard-menu"
                  : "dashboard-menu-not-selected"
              }
              onClick={(e) => {
                setStatus(true)
                navigate("/dashboard");
            }}
            >
              {status ? (
                <img
                  src={dashboardIconSelected}
                  alt="dashboardIconSelected"
                  style={{ marginRight: "10px" }}
                />
              ) : (
                <img
                  src={dashboardIcon}
                  alt="dashboardIcon"
                  style={{ marginRight: "10px" }}
                />
              )}
              Dashboard
            </MenuItem>}
           {userData.roles[0] == "accounts" && <MenuItem
              id="invoice"
              className={
                !status
                  ? "dashboard-menu"
                  : "dashboard-menu-not-selected"
              }
              onClick={(e) => {
                setStatus(false)
                navigate("/dashboard/invoice");
            }}
            >
              {!status ? (
                <img
                  src={invoiceIconSelected}
                  alt="invoiceIconSelected"
                  style={{ marginRight: "10px" }}
                />
              ) : (
                <img
                  src={invoiceIcon}
                  alt="invoiceIcon"
                  style={{ marginRight: "10px" }}
                />
              )}
              Invoice
            </MenuItem>}

            {userData.roles[0] == "admin" &&  <MenuItem
              id="dashboard"
              className={
                status
                  ? "dashboard-menu"
                  : "dashboard-menu-not-selected"
              }
              onClick={(e) => {
                setStatus(true)
                navigate("/admin/dashboard");
            }}
            >
              {status ? (
                <img
                  src={dashboardIconSelected}
                  alt="dashboardIconSelected"
                  style={{ marginRight: "10px" }}
                />
              ) : (
                <img
                  src={dashboardIcon}
                  alt="dashboardIcon"
                  style={{ marginRight: "10px" }}
                />
              )}
              Analytics
            </MenuItem>}
           {userData.roles[0] == "admin" && <MenuItem
              id="invoice"
              className={
                !status
                  ? "dashboard-menu"
                  : "dashboard-menu-not-selected"
              }
              onClick={(e) => {
                setStatus(false)
                navigate("/admin/User");
            }}
            >
              {!status ? (
                <img
                  src={invoiceIconSelected}
                  alt="invoiceIconSelected"
                  style={{ marginRight: "10px" }}
                />
              ) : (
                <img
                  src={invoiceIcon}
                  alt="invoiceIcon"
                  style={{ marginRight: "10px" }}
                />
              )}
              Create User
            </MenuItem>}



            
            
          </Menu>
        </SidebarContent>
        <SidebarFooter
          className="sidebar-footer-content"
          onClick={logoutHandle}
        >
          <img
            src={logoutIcon}
            alt="logoutIcon"
            style={{ marginRight: "10px" }}
          />
          <Link to="/" /> Logout
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default SideBar;
