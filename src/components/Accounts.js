import * as React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import "../css/accounts.css";
import wavingHand from "../assets/wavingHand.png";
import accountsSettings from "../assets/accountsSettings.png";
import totalClients from "../assets/totalClients.png";
import activeClients from "../assets/activeClients.png";
import clientsListIcon from "../assets/clientsListIcon.png";
import addNewIcon from "../assets/addNewIcon.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import DoNotDisturbOffIcon from '@mui/icons-material/DoNotDisturbOff';

var rows = [];
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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

const Accounts = () => {
  const [name, setName] = useState("");
  const [street_address, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [gst_number, setGstNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [landline, setLandline] = useState("");
  const [fax, setFax] = useState("");
  const [project_details, setProjectDetails] = useState("");
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [userList, setUserList] = useState([]);
  const data = localStorage.getItem("auth");
  const token = JSON.parse(data).accessToken;
  var [myOptions, setMyOptions] = useState([]);
  const [clientUpdate, setClientUpdate] = useState(false)
  const [errMsg, setErrMsg] = useState("");
  const[validEmail, setValidEmail] = useState(false);
  const[selectedCompany, setSelectedCompany] = useState("");
  const [totalClientsNo, setTotalClientsNo] = useState("")
  const [totalActiveClients, setTotalActiveClients] = useState("")


  const handleClickOpen = (scrollType) => () => {
    debugger
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

  useEffect(() => {
    getCompanyList();
    getClients()
    getActiveClients()
  }, []);
 
  
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [email]);

  const getClients = async () => {
    debugger;
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
    debugger;
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

  const searchCompany = async (str) => {
    // setSelectedCompany(str)
    console.log(selectedCompany)
    const url = "/accounts/company-autocomplete-invoice-filter";
    try {
      const response = await await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        params: { term: str },
      });
      myOptions = [];
      myOptions = [];
      let data = response.data.suggestions
      for (var i = 0; i < data.length; i++) {
        myOptions.push(data[i]);
      }
      setMyOptions(myOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const getSelctedCompany = async (value) => {
    debugger
     const url = "/accounts/company-filter";
     try {
      const response = await axios.post(url, 
        JSON.stringify({
          name: value,
        }),
        {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const companyList = [response.data];
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
  }

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

  const handleSubmit = async (e) => {
    let Login_Url = ''
    if(clientUpdate == true){
         Login_Url = "/accounts/company-update";
    }else{
         Login_Url = "/accounts/company-creation";
    }
    
    e.preventDefault();
    try {
      const response = await axios.post(
        Login_Url,
        JSON.stringify({
          name: name,
          street_address: street_address,
          city: city,
          state: state,
          postal_code: postal_code,
          country: country,
          gst_number: gst_number,
          phone: phone,
          email: email,
          landline: landline,
          fax: fax,
          project_details: project_details,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          withCredentials: true,
        }
      );
      setClientUpdate(false)
      // setOpen(false);
      toast.success("Company added successfully");
      getCompanyList();
      handleClose();

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
  };
 const secondaryClick = () => {
    document.getElementById("primarybutton").click();
  }; 

  const handleClientEdit = async(name) => {
    debugger
    setClientUpdate(true)
    const Login_Url = "/accounts/company-select";
    // e.preventDefault();
    try {
      const response = await axios.post(
        Login_Url,
        JSON.stringify({
        name: name
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          withCredentials: true,
        }
      );
      setName(response.data.name)
      setStreetAddress(response.data.street_address)
      setCity(response.data.city)
      setState(response.data.state)
      setPostalCode(response.data.postal_code)
      setCountry(response.data.country)
      setGstNumber(response.data.gst_number)
      setPhone(response.data.phone)
      setEmail(response.data.email)
      setLandline(response.data.landline)
      setFax(response.data.landline)
      setProjectDetails(response.data.project_details)
      document.getElementById("add-new").click();
    //   handleClickOpen("paper")
      // setOpen(false);
    //   toast.success("Company added successfully");
    //   getCompanyList();
    //   handleClose();

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
  const handleClientDeactivate = async(name) => {
    debugger
    // console.log(value)
    const url = "/accounts/Company-deactivate";
    try {
     const response = await axios.post(url, 
       JSON.stringify({
        "name": name
       }),
       {
       headers: {
         "Content-Type": "application/json",
         Authorization: "Bearer " + token,
       },
     });
     getCompanyList();
   } catch (err) {
     console.log(err);
   }
  }
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
          <div className="mt-3 clients-list">
            <img src={clientsListIcon} alt="clientsListIcon" />
            <p className="clients-list-text">Client's List</p>
          </div>
          <div className="mt-4 client-search">
            <div class="client-search-container search">
              {/* <input
                className="client-search-field form-control"
                type="text"
                placeholder="Type something here!"
                onChange={(e) => searchCompany(e.target.value)}
              /> */}
              <Autocomplete
                style={{ width: '97%' }}
                freeSolo
                autoComplete
                autoHighlight
                options={myOptions}
                onChange={(e) => getSelctedCompany(e.target.value)}
                renderInput={(params) => (
                  <TextField style={{padding:"5px !important"}}
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
            <button
              className="add-new-client"
              onClick={handleClickOpen("paper")}
            >
              <img className="add-new-icon" id='add-new'src={addNewIcon} alt="addNewIcon" />
              Add New
            </button>
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
                      Name
                    </StyledTableCell>
                    <StyledTableCell align="center">Gst No</StyledTableCell>
                    <StyledTableCell align="center">
                      Phone&nbsp;
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Email&nbsp;
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Project Details&nbsp;
                    </StyledTableCell>
                    <StyledTableCell align="center">
                Status&nbsp;
              </StyledTableCell>
              <StyledTableCell align="center">Action&nbsp;</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userList.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={{ padding: "10px" }} align="center">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.gst_number}</TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">
                        {row.project_details}
                      </TableCell>
                      <TableCell align="center">{row.is_active == 'True' ? <DoNotDisturbOnIcon style={{color:'green'}}/>: <DoNotDisturbOffIcon/>}</TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    className="delete-icon"
                    onClick={(e) => {
                        handleClientDeactivate(row.name);
                    }}
                  />
                  <BorderColorIcon
                    className="edit-icon"
                    onClick={(e) => {
                        handleClientEdit(row.name);
                    }}
                  />
                </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="formDialog">
            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle id="scroll-dialog-title">
                  Add New Client
                </DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                  <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                  >
                    <form className="form-container" onSubmit={handleSubmit}>
                      <div className="item">
                        <label className="mt-3">Company Name <span style={{color: 'red'}}>*</span></label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          required
                        />
                      </div>

                      <div className="item">
                        <label className="mt-3">Email <span style={{color: 'red'}}>*</span></label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          required
                        />
                        <p id="uidnote" className={email && !validEmail ? "instructions-email" : "offscreen-email"}>Enter a valid email address</p>
                      </div>

                      <div className="item">
                        <label className="mt-3">Country <span style={{color: 'red'}}>*</span></label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setCountry(e.target.value)}
                          value={country}
                          required
                        />
                      </div>

                      <div className="item">
                        <label className="mt-3">State <span style={{color: 'red'}}>*</span></label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setState(e.target.value)}
                          value={state}
                          required
                        />
                      </div>

                      <div className="item">
                        <label className="mt-3">City <span style={{color: 'red'}}>*</span></label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setCity(e.target.value)}
                          value={city}
                          required
                        />
                      </div>

                      <div className="item">
                        <label className="mt-3">Street Adress</label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setStreetAddress(e.target.value)}
                          value={street_address}
                          
                        />
                      </div>

                      <div className="item">
                        <label className="mt-3">Postal <span style={{color: 'red'}}>*</span></label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setPostalCode(e.target.value)}
                          value={postal_code}
                          required
                        />
                      </div>

                      

                      <div className="item">
                        <label className="mt-3">Gst No. <span style={{color: 'red'}}>*</span></label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setGstNumber(e.target.value)}
                          value={gst_number}
                          required
                        />
                      </div>

                      <div className="item">
                        <label className="mt-3">Phone <span style={{color: 'red'}}>*</span></label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setPhone(e.target.value)}
                          value={phone}
                          required
                        />
                      </div>

                      <div className="item">
                        <label className="mt-3">Landline</label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setLandline(e.target.value)}
                          value={landline}
                          
                        />
                      </div>

                      <div className="item">
                        <label className="mt-3">Fax</label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setFax(e.target.value)}
                          value={fax}
                          
                        />
                      </div>

                      <div className="item">
                        <label className="mt-3">Project Description</label>
                        <textarea
                          className="mt-3 description-text"
                          rows="2"
                          cols="24"
                          name="comment"
                          form="usrform"
                          autoComplete="off"
                          onChange={(e) => setProjectDetails(e.target.value)}
                          value={project_details}
                          
                        />
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
                    disabled={!validEmail ? true : false}
                  >
                    {clientUpdate == true ? 'Update' : "Submit"}
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Accounts;
