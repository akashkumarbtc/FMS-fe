import React from "react";
import "../css/accounts.css"
import wavingHand from "../assets/wavingHand.png"
import accountsSettings from "../assets/accountsSettings.png"
import totalClients from "../assets/totalClients.png"
import activeClients from "../assets/activeClients.png"
import clientsListIcon from "../assets/clientsListIcon.png"
import addNewIcon from "../assets/addNewIcon.png"

const Accounts = () => {
  return <div style={{ width: "100%", height: "100%" }}>
    <div className="wrapper" style={{ padding: '17px', background: "#F5F5F5" }}>
      <div className="container-fluid" style={{ height: '100vh' }}>
        <div className="main-header">
          <div className="admin-header">
            <div>
              <h3 className="welcome-name">Hi, Ankur</h3>
              <h2 className="welcome-text">Welcome back!</h2>
            </div>
            <img className="waving" src={wavingHand} alt="wavingHand" />
          </div>
          <div className="userSetting">
            <img className="user-image" src={accountsSettings} alt="accountsSettings" />
            <div>
              <h3 className="account-name">Ankur Gupta</h3>
              <h5 className="account-role">Accounts</h5>
            </div>
          </div>
        </div>
        <div className='row mt-5' style={{ width: '100px !important', backgroundColor: '#F5F5F5', height: 'auto', display: 'flex', justifyContent: 'left', paddingLeft: '9px' }}>
          <div className="col-sm-4 total-clients">
            <img className="total-clients-image" src={totalClients} alt="totalClients" />
            <div>
              <h3 className="total-clients-text">Total Clients</h3>
              <h1 className="total-clients-no">65</h1>
            </div>
          </div>
          <div className="col-sm-4 active-clients">
            <img className="total-clients-image" src={activeClients} alt="activeClients" />
            <div>
              <h3 className="total-clients-text">Total Active Clients</h3>
              <h1 className="total-clients-no">50</h1>
            </div>
          </div>
        </div>
        <div className="mt-3 clients-list">
          <img src={clientsListIcon} alt="clientsListIcon" />
          <p className="clients-list-text">Client's List</p>
        </div>
        <div className="mt-3 client-search">
            <div class="client-search-container search">
              <i class="fa fa-search"></i>
              <input className="client-search-field form-control" type="text" placeholder="Type something here!" />
            </div>
            <button className=" add-new-client"><img className="add-new-icon" src={addNewIcon} alt="addNewIcon" />Add New</button>
        </div>
        <div className="row mt-2"></div>
      </div>
    </div>
  </div>;
};

export default Accounts;
