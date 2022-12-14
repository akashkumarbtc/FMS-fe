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
import expenditureLogo from "../assets/expenditureLogo.png";
import expenditureLogoSelected from "../assets/expenditureLogoSelected.png";
import salaryLogo from "../assets/salaryLogo.png";
import salaryLogoSelected from "../assets/salaryLogoSelected.png";
import employeeLogo from "../assets/employeeLogo.png";
import employeeLogoSelected from "../assets/employeeLogoSelected.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const SideBar = () => {
  const userData = JSON.parse(localStorage.getItem("auth"));
  const [itemSelect, setItemSelect] = useState("");
  const[operationStatues, setOperationStatus] = useState('expenditure');
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setItemSelect("dashboard");

  }, []);

  const onItemClick = (item) => {
    ;
    if (item =='employee') {
      setOperationStatus(item);
      navigate("/operations/employee");
    } else if (item == 'salary') {
      setOperationStatus(item);
      navigate("/operations/salary");
    } else if (item == 'expenditure') {
      setOperationStatus(item);
      navigate("/operations/expenditure");
    }
  };
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
            {userData.roles[0] == "operations" && <MenuItem
              id="expenditure"
              className={
                operationStatues == 'expenditure'
                  ? "dashboard-menu"
                  : "dashboard-menu-not-selected"
              }
              onClick={(e) => {
                onItemClick('expenditure')
                // navigate("/operations/expenditure");
            }}
            >
              {operationStatues != 'expenditure' ? (
                <img
                  src={expenditureLogo}
                  alt="expenditureLogo"
                  style={{ marginRight: "10px" }}
                />
              ) : (
                <img
                  src={expenditureLogoSelected}
                  alt="expenditureLogoSelected"
                  style={{ marginRight: "10px" }}
                />
              )}
              Expenditure
            </MenuItem>}
            {userData.roles[0] == "operations" && <MenuItem
              id="salary"
              className={
                operationStatues == 'salary'
                  ? "dashboard-menu"
                  : "dashboard-menu-not-selected"
              }
              onClick={(e) => {
                onItemClick('salary')
                // navigate("/operations/expenditure");
            }}
            >
              {operationStatues != 'salary' ? (
                <img
                  src={salaryLogo}
                  alt="salaryLogo"
                  style={{ marginRight: "10px" }}
                />
              ) : (
                <img
                  src={salaryLogoSelected}
                  alt="salaryLogoSelected"
                  style={{ marginRight: "10px" }}
                />
              )}
              Salary Geneeration
            </MenuItem>}
            {userData.roles[0] == "operations" && <MenuItem
              id="employee"
              className={
                operationStatues == 'employee'
                  ? "dashboard-menu"
                  : "dashboard-menu-not-selected"
              }
              onClick={(e) => {
                onItemClick('employee')
                // navigate("/operations/expenditure");
            }}
            >
              {operationStatues != 'employee' ? (
                <img
                  src={employeeLogo}
                  alt="salaryLogo"
                  style={{ marginRight: "10px" }}
                />
              ) : (
                <img
                  src={employeeLogoSelected}
                  alt="salaryLogoSelected"
                  style={{ marginRight: "10px" }}
                />
              )}
              Employee Lists
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
