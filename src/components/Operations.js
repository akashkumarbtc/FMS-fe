import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import wavingHand from "../assets/wavingHand.png";
import accountsSettings from "../assets/accountsSettings.png";
import totalIncomeLogo from "../assets/totalIncomeLogo.png";
import totalExpenditureLogo from "../assets/totalExpenditureLogo.png";
import grossSalaryLogo from "../assets/grossSalaryLogo.png";
import expenseLogo from "../assets/expenseLogo.png";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var rows = [];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#051134",
    color: theme.palette.common.white,
    padding: "0px",
    paddingBottom: "16px",
    paddingTop: "16px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function createData(bill_related, bill_amount, bill_invoice, expenditure_type) {
  return {
    bill_related,
    bill_amount,
    bill_invoice,
    expenditure_type,
  };
}

const Operations = () => {
  var [myOptions, setMyOptions] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [billType, setBillType] = React.useState("");
  const [client, setClient] = React.useState("");
  const [clientLocation, setClientLocation] = React.useState("");
  const [clientDetails, setClientDetails] = React.useState("");
  const [billAmount, setBillAmount] = React.useState("");
  const [invoiceFile, setInvoiceFile] = useState({});
  const [bill_item, setBillItem] = useState("");
  const [userList, setUserList] = useState([]);
  const [totalCloudBill, setTotalCloudBill] = useState("")
  const [totalExpenditure, setTotalExpenditure] = useState("")
  const [totalMiscellaneous, setTotalMiscellaneous] = useState("")
  const data = localStorage.getItem("auth");
  const token = JSON.parse(data).accessToken;
  let formdata = new FormData();

  const handleClickOpen = (scrollType, type) => () => {
    ;
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
  useEffect(() => {
    getExpenditureList();
    getCloudBill();
    getExpenditure();
    getMiscellaneuos();
  }, []);

  const getExpenditure = async () => {
    ;
    const url = "/operations/total-expenditure";
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      });
      setTotalExpenditure(response.data.total_expenditure)
    } catch (err) {
      console.log(err);
    }
  };
  const getCloudBill = async () => {
    ;
    const url = "/operations/total-cloudbill";
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      });
      setTotalCloudBill(response.data.total_expenditure)
    } catch (err) {
      console.log(err);
    }
  };
  const getMiscellaneuos = async () => {
    ;
    const url = "/operations/total-miscellaneous";
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      });
      setTotalMiscellaneous(response.data.total_expenditure)
    } catch (err) {
      console.log(err);
    }
  };

  const getExpenditureList = async () => {
    const url = "/operations/list-expenditre";
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      });
      console.log(response.data.invoices);
      const expenditure_list = response.data.expenditure_list;
      rows = [];
      
      expenditure_list.map((items) => {
        rows.push(
          createData(
            items.bill_related,
            items.bill_amount,
            items.bill_invoice,
            items.expenditure_type
          )
        );
      });
      setUserList(rows);
      console.log(userList);
    } catch (err) {
      console.log(err);
    }
  };

  const getFilteredExpentureList = async(type) => {
    
    const url = "/operations/filter-expenditure";
    try {
      const response = await axios.post(url, 
        JSON.stringify({
          "expenditure_type": type
        }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      });
      console.log(response.data.invoices);
      const expenditure_list = response.data.expenditure_list;
      rows = [];
      expenditure_list.map((items) => {
        rows.push(
          createData(
            items.bill_related,
            items.bill_amount,
            items.bill_invoice,
            items.expenditure_type
          )
        );
      });
      setUserList(rows);
      console.log(userList);
    } catch (err) {
      console.log(err);
    }
  }

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

  const searchCompany = async (str) => {
    console.log(str);
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

  const searchEmployee = async (str) => {
    
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
        myOptions.push(data[i].name + ',' + data[i].email);
      }
      setMyOptions(myOptions);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFileUpload = async (e) => {
    ;
    let file = e.target.files[0];
    setInvoiceFile(file);
  };
  const upload = (e) => {
    e.preventDefault()
    document.getElementById("primaryinvoiceupload").click();
  };

  const handleSubmit = async (e) => {
    ;
    e.preventDefault();
    let Login_Url = "";
    if (billType == "cloud") {
      Login_Url = "/operations/create-cloudbill";
      formdata.append("expenditure_type", billType);
      formdata.append("client", client);
      formdata.append("location", clientLocation);
      formdata.append("bill_details", clientDetails);
      formdata.append("amount", parseFloat(billAmount));
      formdata.append("files", invoiceFile);
    } else {
      Login_Url = "/operations/create-miscellaneous";
      formdata.append("expenditure_type", billType);
      formdata.append("employee_email", client);
      formdata.append("bill_details", clientDetails);
      formdata.append("bill_item", bill_item);
      formdata.append("amount", parseFloat(billAmount));
      formdata.append("files", invoiceFile);
    }
    try {
      const response = await axios.post(
        Login_Url,

        formdata,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
          withCredentials: true,
        }
      );
      toast.success("Bill generated successfully!");

      setBillType("")
      setClient("")
      setClientLocation("")
      setClientDetails("")
      setBillAmount("")
      setBillAmount("")
      setInvoiceFile("")

      getExpenditureList();
      handleClose();
    } catch (err) {
      toast.error(err.response.data.detail);
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
                <h3 className="total-clients-text">Total Cloud Bill</h3>
                <h1 className="total-clients-no">{totalCloudBill}</h1>
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
                <h1 className="total-clients-no">{totalExpenditure}</h1>
              </div>
            </div>
            <div className="col-sm-4 active-clients">
              <img
                className="total-clients-image"
                src={grossSalaryLogo}
                alt="activeClients"
              />
              <div>
                <h3 className="total-clients-text">Total Miscellaneous</h3>
                <h1 className="total-clients-no">{totalMiscellaneous}</h1>
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
                    onChange={(e) => searchCompany(e.target.value)}
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
                <MenuItem onClick={handleClickOpen("paper", "miscellaneous")}>
                  Miscellaneous Bill
                </MenuItem>
              </Menu>
            </div>
            <select
              name="department"
              id="department"
              className="employee-select"
              onChange={(e) => getFilteredExpentureList(e.target.value)}
              required
            >
              <option value="select">Select</option>
              <option value="cloud">Cloud</option>
              <option value="miscellaneous">Miscellaneous</option>
              <option value="salary">Salary</option>
            </select>
          </div>
          <div className="row mt-4">
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650, maxHeight: 300 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                  <StyledTableCell
                      sx={{ lineHeight: "20px", padding: "5px" }}
                      align="center"
                    >
                      Client
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ lineHeight: "20px", padding: "5px" }}
                      align="center"
                    >
                      Bill Amount
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Bill Invoice&nbsp;
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Expenditure Type&nbsp;
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userList.map((row) => (
                    <TableRow
                      key={row.bill_invoice}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                       <TableCell sx={{ padding: "10px" }} align="center">
                        {row.bill_related}
                      </TableCell>
                      <TableCell sx={{ padding: "10px" }} align="center">
                        {row.bill_amount}
                      </TableCell>
                      <TableCell align="center">{row.bill_invoice}</TableCell>
                      <TableCell align="center">
                        {row.expenditure_type}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
                      <form className="form-container" onSubmit={handleSubmit}>
                        <div class="client-search-container search">
                          <label className="mt-3">Client Name</label>
                          <Autocomplete
                            className="mt-3"
                            style={{ width: "81%", marginLeft: "24px" }}
                            freeSolo
                            autoComplete
                            autoHighlight
                            options={myOptions}
                            onChange={(e) => setClient(e.target.value)}
                            renderInput={(params) => (
                              <TextField
                                style={{ padding: "5px !important" }}
                                {...params}
                                label="Type somethong here!"
                                onChange={(e) => searchCompany(e.target.value)}
                                variant="outlined"
                              />
                            )}
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
                            {invoiceFile.name ? invoiceFile.name : 'upload invoice'}
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
                      <form className="form-container" onSubmit={handleSubmit}>
                        <div class="client-search-container search">
                          <label className="mt-3">Employee Name</label>
                          <Autocomplete
                            className="mt-3"
                            style={{ width: "81%", marginLeft: "24px" }}
                            freeSolo
                            autoComplete
                            autoHighlight
                            options={myOptions}
                            onChange={(e) => setClient(e.target.value.split(',')[1])}
                            renderInput={(params) => (
                              <TextField
                                style={{ padding: "5px !important" }}
                                {...params}
                                label="Type somethong here!"
                                onChange={(e) => searchEmployee(e.target.value)}
                                variant="outlined"
                              />
                            )}
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
                          <label className="mt-3">Bill Item</label>
                          <select
                            name="department"
                            id="department"
                            className="department-select"
                            onChange={(e) => setBillItem(e.target.value)}
                            required
                          >
                            <option value="select">Select</option>
                            <option value="software_epense">
                              Software Expense
                            </option>
                            <option value="hardWare_expense">
                              HardWare Expense
                            </option>
                            <option value="other_expense">Other Expense</option>
                          </select>
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
                            {invoiceFile.name ? invoiceFile.name : 'upload invoice'}
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
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Operations;
