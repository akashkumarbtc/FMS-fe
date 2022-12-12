import * as React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import "../css/accounts.css";
import wavingHand from "../assets/wavingHand.png";
import accountsSettings from "../assets/accountsSettings.png";
import uploadFileLogo from "../assets/uploadFileLogo.png"
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Salary = () => {
  const [value, setValue] = React.useState(null);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div
        className="wrapper"
        style={{ padding: "17px", height: "100vh", background: "#F5F5F5" }}
      >
        <div className="container-fluid" style={{ height: "100vh" }}>
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
                <h5 className="account-role">Admin</h5>
              </div>
            </div>
          </div>
          <div className="salary-header row mt-4">
            <div className="user-search">
              <Autocomplete
                style={{ width: "97%" }}
                freeSolo
                autoComplete
                autoHighlight
                // options={myOptions}
                renderInput={(params) => (
                  <TextField
                    style={{ padding: "5px !important" }}
                    {...params}
                    label="Type somethong here!"
                    // onChange={(e) =>
                    //   handleControlSearch(searchCompany(e.target.value), 2000)
                    // }
                    // onChange={(e) => searchCompany(e.target.value)}
                    variant="outlined"
                  />
                )}
              />
            </div>
            <div className="salary-button">
              <button className="generate-salary-button">
                Generate Salary
              </button>
            </div>
            <div className="date-container">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Basic example"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="update-salary">
              <button className="update-salary-button">Update the Salary</button>
            </div>
          </div>
          <div className="salary-breakup row mt-4">
            <div className="breakdown-container">
              <div className="breakdown-header">
                <h5>Salary Breakdown</h5>
              </div>
              <div className="breakdown-list">
                <div className="list-header">
                  <div>Earning</div>
                  <div style={{ marginLeft: "163px" }}>Amount In Rs</div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left basic-da-container">Basic & DA</div>
                  <div className="item-right basic-da-container">20000.00</div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left hra-container">HRA</div>
                  <div className="item-right hra-container">20000.00</div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left allowance-container">
                    Special ALlowance
                  </div>
                  <div className="item-right allowance-container">20000.00</div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left pf-container">PF + VPF(if any)</div>
                  <div className="item-right pf-container">20000.00</div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left profession-tax-container">
                    Profession Tax
                  </div>
                  <div className="item-right profession-tax-container">
                    20000.00
                  </div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left earnings-container">
                    Earnings Total
                  </div>
                  <div className="item-right earnings-container">20000.00</div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left reimbursement-container">
                    Reimbursement
                  </div>
                  <div className="item-right reimbursement-container">
                    20000.00
                  </div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left deductions-container">
                    Other Deductions
                  </div>
                  <div className="item-right deductions-container">
                    20000.00
                  </div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left total-container">Total</div>
                  <div className="item-right total-container">20000.00</div>
                </div>
              </div>
            </div>
            <div className="reimbursement-details-container">
              <h5 className="reimbursement-header">
                Add Reimbursement Details
              </h5>
              <div className="reimbursement-inputs">
                <div className="reimbursement-type-container">
                  <label className="reimbursement-label">
                    Type of Reimbursement
                  </label>
                  <input
                    type="number"
                    className="reimbursement-type-input mt-2"
                    style={{ width: "90%" }}
                    name="quantity"
                    // value={singleItem.quantity}
                    // onChange={(e) => handleItemChange(e, index)}
                    required
                  />
                </div>
                <div className="reimbursement-amount-container">
                  <label className="reimbursement-label">Amount</label>
                  <input
                    type="number"
                    className="reimbursement-amount-input mt-2"
                    style={{ width: "90%" }}
                    name="quantity"
                    // value={singleItem.quantity}
                    // onChange={(e) => handleItemChange(e, index)}
                    required
                  />
                </div>
              </div>

              <div className="reimbursement-upload-container">
                <label className="reimbursement-label mt-2">Attach File</label>
                <div className="upload-container mt-2">
                <img className="reimbursement-upload-logo" src={uploadFileLogo} alt="uploadFileLogo" /> Upload a file
                </div>
                <div className="div-border mt-2"></div>
                <div className="salary-breakdown-button mt-2">
                <button className="breakdown-add-button">
                  Add to the breakdown
                </button>
            </div>
              </div>
              <div className="reimbursement-upload-container">
              <h5 className="reimbursement-header mt-3">
               Additional Leaves
              </h5>
              <div className="reimbursement-inputs">
              <div className="reimbursement-type-container">
                  <label className="reimbursement-label">
                    No of days
                  </label>
                  <input
                    type="number"
                    className="reimbursement-type-input mt-2"
                    style={{ width: "90%" }}
                    name="quantity"
                    // value={singleItem.quantity}
                    // onChange={(e) => handleItemChange(e, index)}
                    required
                  />
                </div>
                <div className="reimbursement-amount-container">
                  <label className="reimbursement-label">Amount</label>
                  <input
                    type="number"
                    className="reimbursement-amount-input mt-2"
                    style={{ width: "90%" }}
                    name="quantity"
                    // value={singleItem.quantity}
                    // onChange={(e) => handleItemChange(e, index)}
                    required
                  />
                </div>
                </div>
                <div className="salary-breakdown-button mt-2">
                <button className="breakdown-add-button">
                  Add to the breakdown
                </button>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salary;
