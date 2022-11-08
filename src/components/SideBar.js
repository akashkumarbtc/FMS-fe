import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from "react-pro-sidebar";
import React from 'react';
import '../css/sideBar.css';
import 'react-pro-sidebar/dist/css/styles.css';
import bluetickIcon from "../assets/bluetickIcon.png";
import dashboardIcon from "../assets/dashboardIcon.png";
import invoiceIcon from "../assets/invoiceIcon.png";
import invoiceIconSelected from "../assets/invoiceIconSelected.png"
import dashboardIconSelected from "../assets/dashboardIconSelected.png"
import logoutIcon from "../assets/logoutIcon.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";




const SideBar = () => {
    const [itemSelect, setItemSelect] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        setItemSelect("dashboard")
    }, [])

    const onItemClick = (item) => {
        setItemSelect(item)
    }
    const logoutHandle = () => {
        navigate("/")
    }
    return (
        <div style={{ height: '100vh' }}>
            <ProSidebar style={{ background: '#051134 !important' }}>
                <SidebarHeader className="sidebar-header-content">
                    <img src={bluetickIcon} alt="bluetickIcon" style={{ height: '48px' }} /><h2>Bluetick Consultants</h2>
                </SidebarHeader>
                <SidebarContent className="sidebar-content">
                    <Menu>
                        <MenuItem id="dashboard" className={itemSelect == "dashboard" ? "dashboard-menu" : "dashboard-menu-not-selected"}
                            onClick={(e) => onItemClick('dashboard')}>
                            {itemSelect == "dashboard" ? <img src={dashboardIconSelected} alt="dashboardIconSelected" style={{ marginRight: "10px" }} />
                                : <img src={dashboardIcon} alt="dashboardIcon" style={{ marginRight: "10px" }} />}
                            Dashboard</MenuItem>
                        <MenuItem className={itemSelect == "invoice" ? "dashboard-menu" : "dashboard-menu-not-selected"} style={{ marginTop: "12px" }}
                            onClick={(e) => onItemClick('invoice')}>
                            {itemSelect == "invoice" ? <img src={invoiceIconSelected} alt="invoiceIconSelected" style={{ marginRight: "10px" }} />
                                : <img src={invoiceIcon} alt="invoiceIcon" style={{ marginRight: "10px" }} />}
                            Invoice</MenuItem>
                    </Menu>
                </SidebarContent>
                <SidebarFooter className="sidebar-footer-content" onClick={logoutHandle}>
                    <img src={logoutIcon} alt="logoutIcon" style={{ marginRight: "10px" }} />
                    <Link to="/" /> Logout</SidebarFooter>
            </ProSidebar>
        </div>
    )
}

export default SideBar
