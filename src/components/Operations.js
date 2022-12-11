import React from "react";
import { useState } from "react";
import axios from "../api/axios";
import wavingHand from "../assets/wavingHand.png";
import accountsSettings from "../assets/accountsSettings.png";
import totalIncomeLogo from "../assets/totalIncomeLogo.png";
import totalExpenditureLogo from "../assets/totalExpenditureLogo.png";
import grossSalaryLogo from "../assets/grossSalaryLogo.png";
import expenseLogo from "../assets/expenseLogo.png";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ToastContainer, toast } from "react-toastify";
import addNewIcon from "../assets/addNewIcon.png";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Operations = () => {
  var [myOptions, setMyOptions] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [billType, setBillType] = React.useState("");
  const [client, setClient] = React.useState("");
  const [clientLocation, setClientLocation] = React.useState("");
  const [clientDetails, setClientDetails] = React.useState("");
  const [billAmount, setBillAmount] = React.useState("");
  const [invoiceFile, setInvoiceFile] = useState({})
  const data = localStorage.getItem("auth");
  const token = JSON.parse(data).accessToken;
  let formdata = new FormData();
  let formdata1 = new FormData()


  const handleClickOpen = (scrollType, type) => () => {
    debugger;
    setBillType(type);
    handleCloseMenue();
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenue = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenue = () => {
    setAnchorEl(null);
  };

  function handleControlSearch(fn, delay){
    let timeOutId;
    return function(...args){
      if(timeOutId){
        clearTimeout(timeOutId)
      }
    timeOutId = setTimeout(()=>{
        fn()
    }, delay)
  }
  }

  const searchCompany = async (str) => {
    console.log(str)
    const url = "/accounts/company/autocomplete";
    try {
      const response = await await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        params: { term: str },
      });
      console.log();
      let data = response.data
      myOptions = [];
      for (var i = 0; i < data.length; i++) {
        myOptions.push(data[i]);
      }
      setMyOptions(myOptions);
    } catch (err) {
      console.log(err);
    }
  };

 
  const handleFileUpload = async (e) => {
    debugger;
    let file = e.target.files[0];
    formdata1.append("files", file);
  };
  const upload = () => {
    document.getElementById("primaryinvoiceupload").click();
  };
  
  const handleSubmit = async (e) => {
    debugger
    const Login_Url = "/operations/create-cloudbill";
    e.preventDefault();
  //   for (var key of formdata.entries()) {
  //     console.log(key[0] + ', ' + key[1]);
  // }
  
  formdata1.append('expenditure_type', billType)
  formdata1.append('client', client)
  formdata1.append('location', clientLocation)
  formdata1.append('bill_details', clientDetails)
  formdata1.append('amount', billAmount)
  

    try {
      const response = await axios.post(
        Login_Url,
        // {
        //   expenditure_type: billType,
        //   client: client,
        //   location: clientLocation,
        //   bill_details: clientDetails,
        //   amount: billAmount,
        // },
        formdata1,
        {
          headers: {  'Content-type': 'multipart/form-data', 'Authorization': 'Bearer '+token },
          withCredentials: true,
        }
      );
      // setOpen(false);

      // navigate(from, { replace: true });
    } catch (err) {
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
  }
  const secondaryClick = () => {
    document.getElementById("primarybutton").click();
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
            }}
          >
            <div className="col-sm-4 total-clients">
              <img
                className="total-clients-image"
                src={totalIncomeLogo}
                alt="totalClients"
              />
              <div>
                <h3 className="total-clients-text">Total Income</h3>
                <h1 className="total-clients-no">65</h1>
              </div>
            </div>
            <div className="col-sm-4 active-clients">
              <img
                className="total-clients-image"
                src={totalExpenditureLogo}
                alt="activeClients"
              />
              <div>
                <h3 className="total-clients-text">Total Expenditure</h3>
                <h1 className="total-clients-no">50</h1>
              </div>
            </div>
            <div className="col-sm-4 active-clients">
              <img
                className="total-clients-image"
                src={grossSalaryLogo}
                alt="activeClients"
              />
              <div>
                <h3 className="total-clients-text">Gross Salary</h3>
                <h1 className="total-clients-no">50</h1>
              </div>
            </div>
          </div>
          <div className="mt-3 clients-list">
            <img
              src={expenseLogo}
              alt="invoiceimage"
              style={{ width: "27px", height: "27px" }}
            />
            <p className="clients-list-text" style={{ marginLeft: "10px" }}>
              Expenditure Details
            </p>
          </div>
          <div className="mt-3 client-search">
            <div class="invoice-search-container search">
              <Autocomplete
                style={{ width: "97%" }}
                freeSolo
                autoComplete
                autoHighlight
                options={myOptions}
                // onChange={(e) => getSelctedInvoice(e.target.value)}
                renderInput={(params) => (
                  <TextField
                    style={{ padding: "5px !important" }}
                    {...params}
                    label="Type somethong here!"
                    // onChange={(e)=>handleControlSearch(
                    //  searchCompany(e.target.value)
                    // ,2000)}
                    // onChange={(e) => searchCompany(e.target.value)}
                    variant="outlined"
                  />
                )}
              />
            </div>
            <div>
              <Button
                id="basic-button"
                style={{
                  backgroundColor: "#051134",
                  fontSize: "11px",
                  color: "white",
                }}
                aria-controls={openMenue ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenue ? "true" : undefined}
                onClick={handleClick}
              >
                <img
                  className="add-new-icon"
                  src={addNewIcon}
                  alt="addNewIcon"
                />
                Add New
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenue}
                onClose={handleCloseMenue}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClickOpen("paper", "cloud")}>
                  Cloud Bill
                </MenuItem>
                <MenuItem onClick={handleClickOpen("paper", "miscellaneous")}>Miscellaneous Bill</MenuItem>
              </Menu>
            </div>
            <select
              name="department"
              id="department"
              className="employee-select"
              // onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="select">Select</option>
              <option value="admin">Admin</option>
              <option value="accounts">Accounts</option>
              <option value="operations">Operations</option>
            </select>
          </div>
          <div className="formDialog">
            <div>
              {billType == "cloud" ? (
                <Dialog
                  open={open}
                  onClose={handleClose}
                  scroll={scroll}
                  aria-labelledby="scroll-dialog-title"
                  aria-describedby="scroll-dialog-description"
                >
                  <DialogTitle id="scroll-dialog-title">
                    Create Cloud Bill
                  </DialogTitle>
                  <DialogContent dividers={scroll === "paper"}>
                    <DialogContentText
                      id="scroll-dialog-description"
                      ref={descriptionElementRef}
                      tabIndex={-1}
                    >
                      <form
                        className="form-container"
                        onSubmit={handleSubmit}
                      >
                        <div className="item">
                        <label className="mt-3">Client Name</label>
                        <input
                            className="mt-3"
                            type="text"
                            autoComplete="off"
                            onChange={(e) => setClient(e.target.value)}
                            value={client}
                            required
                          />
                        </div>

                        <div className="item">
                          <label className="mt-3">Client Location</label>
                          <input
                            className="mt-3"
                            type="text"
                            autoComplete="off"
                            onChange={(e) => setClientLocation(e.target.value)}
                            value={clientLocation}
                            required
                          />
                        </div>

                        <div className="item">
                          <label className="mt-3">Bill Details</label>
                          <textarea
                            className="description-text mt-3"
                            style={{ height: "43px" }}
                            cols="24"
                            name="comment"
                            form="usrform"
                            autoComplete="off"
                            value={clientDetails}
                            onChange={(e) => setClientDetails(e.target.value)}
                            required
                          />
                        </div>
                        <div className="item">
                          <label className="mt-3">Amount</label>
                          <input
                            className="mt-3"
                            type="number"
                            autoComplete="off"
                            onChange={(e) => setBillAmount(e.target.value)}
                            value={billAmount}
                            required
                          />
                        </div>
                        <div className="item" style={{ textAlign: "left" }}>
                          <label className="mt-3" style={{ textAlign: "left" }}>
                            Upload Invoice
                          </label>
                          <input
                            type="file"
                            id="primaryinvoiceupload"
                            onChange={(e) => handleFileUpload(e)}
                          />
                          <button
                            id="secondaryinvoiceupload"
                            className="add-cloud-invoice mt-3"
                            onClick={upload}
                          >
                            <img
                              className="add-new-icon"
                              src={addNewIcon}
                              alt="addNewIcon"
                            />
                            Upload invoice
                          </button>
                        </div>
                        <button
                          className="submitButton"
                          id="primarybutton"
                          style={{ display: "none" }}
                        >
                          Submit
                        </button>
                      </form>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      className="add-company-button"
                      id="secondarybutton"
                      onClick={secondaryClick}
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              ) : (
                <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle id="scroll-dialog-title">
                  Create Miscellaneous Bill
                </DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                  <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                  >
                    <form
                      className="form-container"
                      // onSubmit={handleSubmit}
                    >
                      <div className="item">
                      <label className="mt-3">Client/Employee Name</label>
                        <Autocomplete
                          style={{ width: "90%", marginTop: "20px", paddingLeft:'25px' }}
                          freeSolo
                          autoComplete
                          autoHighlight
                          options={myOptions}
                          // onChange={(e) => setCompanyClient(e.target.value)}
                          renderInput={(params) => (
                            <TextField
                              style={{ padding: "5px !important" }}
                              {...params}
                              label="Search company here!"
                              onChange={(e) =>
                                handleControlSearch(
                                  searchCompany(e.target.value),
                                  2000
                                )
                              }
                              variant="outlined"
                            />
                          )}
                        />
                      </div>

                      {/* <div className="item">
                        <label className="mt-3">Client Location</label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          // onChange={(e) => setDesignation(e.target.value)}
                          // value={designation}
                          required
                        />
                      </div> */}

                      <div className="item">
                        <label className="mt-3">Bill Details</label>
                        <textarea
                          className="description-text mt-3"
                          style={{ height: "43px" }}
                          // rows="2"
                          cols="24"
                          name="comment"
                          form="usrform"
                          autoComplete="off"
                          // value={notes}
                          // onChange={(e) => setNotes(e.target.value)}
                          required
                        />
                      </div>
                      <div className="item">
                        <label className="mt-3">Amount</label>
                        <input
                          className="mt-3"
                          type="number"
                          autoComplete="off"
                          // onChange={(e) => setEmail(e.target.value)}
                          // value={email}
                          required
                        />
                      </div>
                      <div className="item" style={{ textAlign: "left" }}>
                        <label className="mt-3" style={{ textAlign: "left" }}>
                          Upload Invoice
                        </label>
                        <input
                          type="file"
                          id="primaryinvoiceupload"
                          onChange={(e) => handleFileUpload(e)}
                        />
                        <button
                          id="secondaryinvoiceupload"
                          className="add-cloud-invoice mt-3"
                          onClick={upload}
                        >
                          <img
                            className="add-new-icon"
                            src={addNewIcon}
                            alt="addNewIcon"
                          />
                          Upload invoice
                        </button>
                      </div>
                      <button
                        className="submitButton"
                        id="primarybutton"
                        style={{ display: "none" }}
                      >
                        Submit
                      </button>
                    </form>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    className="add-company-button"
                    id="secondarybutton"
                    // onClick={secondaryClick}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operations;
