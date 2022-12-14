import React from 'react'
import {useState, useEffect} from 'react'
import wavingHand from "../../assets/wavingHand.png";
import accountsSettings from "../../assets/accountsSettings.png";
import totalClients from "../../assets/totalClients.png";
import activeClients from "../../assets/activeClients.png";
import axios from "../../api/axios"

const Header = () => {
    const [totalClientsNo, setTotalClientsNo] = useState("")
    const [totalActiveClients, setTotalActiveClients] = useState("")
    const data = localStorage.getItem("auth");
    const token = JSON.parse(data).accessToken;

    useEffect(()=>{
        getClients()
        getActiveClients()
    },[])

    const getClients = async () => {
        ;
        const url = "/accounts/total-clients";
        try {
          const response = await axios.get(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            withCredentials: true,
          });
          setTotalClientsNo(response.data.total_client)
        } catch (err) {
          console.log(err);
        }
      };
      const getActiveClients = async () => {
        ;
        const url = "/accounts/total-active-clients";
        try {
          const response = await axios.get(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            withCredentials: true,
          });
          setTotalActiveClients(response.data.total_active_client)
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <>
        <div className="main-header">
            <div className="admin-header">
                <div>
                    <h3 className="welcome-name">Hi, Ankur</h3>
                    <h2 className="welcome-text">Welcome back!</h2>
                </div>
                <img className="waving" src={wavingHand} alt="wavingHand" />
            </div>
            <div className="userSetting">
                <img
                className="user-image"
                src={accountsSettings}
                alt="accountsSettings"
                />
                <div>
                    <h3 className="account-name">Ankur Gupta</h3>
                    <h5 className="account-role">Accounts</h5>
                </div>
            </div>
        </div>
        <div
        className="row mt-5"
        style={{
        width: "100px !important",
        backgroundColor: "#F5F5F5",
        height: "auto",
        display: "flex",
        justifyContent: "left",
        paddingLeft: "9px",
        }}>
            <div className="col-sm-4 total-clients">
                <img
                    className="total-clients-image"
                    src={totalClients}
                    alt="totalClients"
                />
                <div>
                    <h3 className="total-clients-text">Total Clients</h3>
                    <h1 className="total-clients-no">{totalClientsNo}</h1>
                </div>
            </div>
            <div className="col-sm-4 active-clients">
                <img
                    className="total-clients-image"
                    src={activeClients}
                    alt="activeClients"
                />
            <div>
                <h3 className="total-clients-text">Total Active Clients</h3>
                <h1 className="total-clients-no">{totalActiveClients}</h1>
            </div>
        </div>
    </div>
  </>
  )
}

export default Header