import * as React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import "../css/accounts.css";
import wavingHand from "../assets/wavingHand.png";
import accountsSettings from "../assets/accountsSettings.png";
import uploadFileLogo from "../assets/uploadFileLogo.png";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Salary = () => {
  const [value, setValue] = React.useState(null);
  const[name, setName] = useState("")
  const data = localStorage.getItem("auth");
  var [myOptions, setMyOptions] = useState([]);
  const token = JSON.parse(data).accessToken;
  const [basic_DA, setBasic_DA] = useState("");
  const [hra, setHra] = useState("");
  const [earnings_total, setEarnings_total] = useState("");
  const [lta, setLta] = useState("");
  const [pf, setPf] = useState("");
  const [profession_tax, setProfession_tax] = useState("");
  const [special_allowance, setSpecial_allowance] = useState("");
  const [reimbursement, setReimbursement] = useState("");
  const [reimbursementAmount, setReimbursementAmout] = useState("");
  const [otherDeductions, setOtherDeductions] = useState("");
  const [otherDeductionsAmount, setOtherDeductionsAmount] = useState("");
  const [satutory_bonus, setSatutory_bonus] = useState("");
  const [netPay, setNetPay] = useState("");
  const [generated_at, setGenerated_at] = useState("");

  const searchCompany = async (str) => {
    console.log(str);
    const url = "/operations/employee/autocomplete";
    try {
      const response = await await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        params: { term: str },
      });
      console.log();
      let data = response.data.suggestions;
      myOptions = [];
      for (var i = 0; i < data.length; i++) {
        myOptions.push(data[i]);
      }
      setMyOptions(myOptions);
    } catch (err) {
      console.log(err);
    }
  };
  function handleControlSearch(fn, delay) {
    let timeOutId;
    return function (...args) {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
      timeOutId = setTimeout(() => {
        fn();
      }, delay);
    };
  }
  const getSelctedInvoice = async (value) => {
    debugger;
    const url = "/operations/select-salary";
    setName(value)
    try {
      const response = await axios.post(
        url,
        JSON.stringify({
          employee_name: value,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setBasic_DA(response.data.basic_DA);
      setEarnings_total(response.data.earnings_total);
      setPf(response.data.pf);
      setLta(response.data.lta);
      setHra(response.data.hra);
      setProfession_tax(response.data.profession_tax);
      setSpecial_allowance(response.data.special_allowance);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    debugger;
    const Login_Url = "/operations/create-salary-report";
    setNetPay(parseFloat(earnings_total) - parseFloat(otherDeductionsAmount) + (parseFloat(reimbursementAmount) + parseFloat(satutory_bonus)))
    e.preventDefault();
    try {
      const response = await axios.post(
        Login_Url,
        JSON.stringify({
          expenditure_type: "salary",
          employee_name: name,
          basic_DA: parseFloat(basic_DA),
          hra: parseFloat(hra),
          special_allowance: parseFloat(special_allowance),
          lta: parseFloat(lta),
          pf: parseFloat(pf),
          profession_tax: parseFloat(profession_tax),
          earnings_total: parseFloat(earnings_total),
          satutory_bonus: parseFloat(satutory_bonus),
          deductions: parseFloat(otherDeductionsAmount),
          deuctions_note: otherDeductions,
          reimbursement: parseFloat(reimbursementAmount),
          reimbursement_note: reimbursement,
          net_pay: parseFloat(earnings_total) - parseFloat(otherDeductionsAmount) + (parseFloat(reimbursementAmount) + parseFloat(satutory_bonus)),
          generated_at: generated_at,
        }),
        {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
          withCredentials: true,
        }
      );
      toast.success("sallary created successfully!")
    } catch (err) {
      toast.error(err.response.data.detail)
      // if (!err?.response) {
      //   setErrMsg("No Server Response");
      // } else if (err.response?.status === 400) {
      //   setErrMsg("Missing Username or Password");
      // } else if (err.response?.status === 401) {
      //   setErrMsg("Unauthorized");
      // } else {
      //   setErrMsg("Login Failed");
      // }
      // errRef.current.focus();
    }
  };
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
                options={myOptions}
                onChange={(e) => getSelctedInvoice(e.target.value)}
                renderInput={(params) => (
                  <TextField
                    style={{ padding: "5px !important" }}
                    {...params}
                    label="Type somethong here!"
                    onChange={(e) =>
                      handleControlSearch(searchCompany(e.target.value), 2000)
                    }
                    // onChange={(e) => searchCompany(e.target.value)}
                    variant="outlined"
                  />
                )}
              />
            </div>
          
            <div className="date-container">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select date"
                  value={generated_at}
                  onChange={(newValue) => {
                    debugger;
                    setGenerated_at(
                      newValue.$d.getFullYear() +
                        "-" +
                        newValue.$d.getMonth() +
                        "-" +
                        newValue.$d.getDate()
                    );
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            {/* <div className="update-salary">
              <button className="update-salary-button">
                Update the Salary
              </button>
            </div> */}
              <div className="salary-button">
              <button className="generate-salary-button" onClick={handleSubmit}>
                Generate Salary
              </button>
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
                  <div className="item-right basic-da-container">
                    {basic_DA}
                  </div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left hra-container">HRA</div>
                  <div className="item-right hra-container">{hra}</div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left allowance-container">
                    Special ALlowance
                  </div>
                  <div className="item-right allowance-container">
                    {special_allowance}
                  </div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left pf-container">PF + VPF(if any)</div>
                  <div className="item-right pf-container">{pf}</div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left profession-tax-container">
                    Profession Tax
                  </div>
                  <div className="item-right profession-tax-container">
                    {profession_tax}
                  </div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left earnings-container">
                    Earnings Total
                  </div>
                  <div className="item-right earnings-container">
                    {earnings_total}
                  </div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left reimbursement-container">
                    Reimbursement
                  </div>
                  <div className="item-right reimbursement-container">
                    {reimbursementAmount}
                  </div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left deductions-container">
                    Other Deductions
                  </div>
                  <div className="item-right deductions-container">
                    {otherDeductionsAmount}
                  </div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left deductions-container">
                    Satuary_bonus
                  </div>
                  <div className="item-right deductions-container">
                    {satutory_bonus}
                  </div>
                </div>
                <div className="salary-breakdown-container mt-2">
                  <div className="item-left total-container">Total</div>
                  <div className="item-right total-container">
                    {parseInt(earnings_total) -
                      parseInt(otherDeductionsAmount) +
                      (parseInt(reimbursementAmount) +
                        parseInt(satutory_bonus))}
                  </div>
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
                    type="text"
                    className="reimbursement-type-input mt-2"
                    style={{ width: "90%" }}
                    name="quantity"
                    value={reimbursement}
                    onChange={(e) => setReimbursement(e.target.value)}
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
                    value={reimbursementAmount}
                    onChange={(e) => setReimbursementAmout(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* <div className="reimbursement-upload-container">
                <label className="reimbursement-label mt-2">Attach File</label>
                <div className="upload-container mt-2">
                  <img
                    className="reimbursement-upload-logo"
                    src={uploadFileLogo}
                    alt="uploadFileLogo"
                  />{" "}
                  Upload a file
                </div>
                <div className="div-border mt-2"></div>
                <div className="salary-breakdown-button mt-2">
                  <button className="breakdown-add-button">
                    Add to the breakdown
                  </button>
                </div>
              </div> */}
              <div className="reimbursement-upload-container">
                <h5 className="reimbursement-header mt-3">Additional Leaves</h5>
                <div className="reimbursement-inputs">
                  <div className="reimbursement-type-container">
                    <label className="reimbursement-label">No of days</label>
                    <input
                      type="text"
                      className="reimbursement-type-input mt-2"
                      style={{ width: "90%" }}
                      name="quantity"
                      value={otherDeductions}
                      onChange={(e) => setOtherDeductions(e.target.value)}
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
                      value={otherDeductionsAmount}
                      onChange={(e) => setOtherDeductionsAmount(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {/*   */}
              </div>
              <div className="reimbursement-upload-container">
                <h5 className="reimbursement-header mt-3">satutory Bonus</h5>
                <div className="reimbursement-inputs">
                  <div className="reimbursement-type-container">
                    <label className="reimbursement-label">Bonus</label>
                    <input
                      type="number"
                      className="reimbursement-type-input mt-2"
                      style={{ width: "90%" }}
                      name="quantity"
                      value={satutory_bonus}
                      onChange={(e) => setSatutory_bonus(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {/*   */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Salary;
