import React from 'react'
import { useState, useEffect } from "react";
import axios from "../api/axios";
import "../css/accounts.css";
import Header from '../components/accounts/Header'
import Clients from '../components/accounts/Clients'
import ClientTable from '../components/accounts/ClientTable'
import AddNewClientForm from '../components/accounts/AddNewClientForm'

var rows = [];

const Accounts = () => {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState("paper");
    const [userList, setUserList] = useState([]);
    const data = localStorage.getItem("auth");
    const token = JSON.parse(data).accessToken;

    function createData(name, gst_number, phone, email, project_details, is_active) {
        return {
          name,
          gst_number,
          phone,
          email,
          project_details,
          is_active
        };
      }
      

    const getCompanyList = async () => {
        const url = "/accounts/company-list";
        try {
          const response = await axios.get(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            withCredentials: true,
          });
          const companyList = response.data.companies;
          rows = [];
          companyList.map((items) => {
            rows.push(
              createData(
                items.name,
                items.gst_number,
                items.phone,
                items.email,
                items.project_details,
                items.is_active
              )
            );
          });
          setUserList(rows);
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
        <div
        className="wrapper"
        style={{ padding: "17px", height: "100vh", background: "#F5F5F5" }}>
            <div className="container-fluid" style={{ height: "100vh" }}>
                <Header />
                <Clients setOpen={setOpen} setScroll={setScroll} setUserList={setUserList}/>
                <ClientTable userList={userList} setUserList={setUserList}  getCompanyList={getCompanyList}/>
                <AddNewClientForm open={open} setOpen={setOpen}  scroll={scroll} getCompanyList={getCompanyList}/>
                
            </div>
      </div>
    </div>
  )
}

export default Accounts