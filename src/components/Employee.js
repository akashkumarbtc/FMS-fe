import * as React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import "../css/accounts.css";
import wavingHand from "../assets/wavingHand.png";
import accountsSettings from "../assets/accountsSettings.png";
import addNewIcon from "../assets/addNewIcon.png";
import adminList from "../assets/adminList.png";
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
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import employeeListLogo from "../assets/employeeListLogo.png"
import { ToastContainer, toast } from 'react-toastify';
import DeleteIcon from "@mui/icons-material/Delete";
import 'react-toastify/dist/ReactToastify.css';


var rows = [];
const options = ["Delete"];
const ITEM_HEIGHT = 48;
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

function createData(department, designation, email, name, phone, Is_active) {
  return {
    department, designation, email, name, phone, Is_active
  };
}

const Employee = () => {
  const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("")
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [address, setAddress] = useState("")
  const [bankName, setBankName] = useState("")
  const [bankNo, setBankNo] = useState("")
  const [pfNo, setPfNO] = useState("")
  const [pfUan, setPfUan] = useState("")
  const [esiNo, setEsiNo] = useState("")
  const [pan, setPan] = useState("");
  const [basic_DA, setBasicDa] = useState("")
  const [hra, setHra] = useState("")
  const [special_allowance, setSpecialAllowance] = useState("")
  const [pf, setPf] = useState("")
  const [lta, setLta] = useState("")
  const [professional_tax, setProfessionalTax] = useState("")
  const [earnings_total, setEarningsTotal] = useState("")
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [userList, setUserList] = useState([]);
  const data = localStorage.getItem("auth");
  const token = JSON.parse(data).accessToken;
  const[validEmail, setValidEmail] = useState(false);
  var [myOptions, setMyOptions] = useState([]);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenue = Boolean(anchorEl);
  const handleClickMenue = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenue = () => {
    setAnchorEl(null);
  };
  const handleDeleteEmployee = async(name) => {
    // console.log(e.target.id)
      debugger
      const url = "/operations/delete-employee";
      try {
        // const response = await axios.delete(
        //   {
        //     url,
        //     // JSON.stringify({
        //     //   employee_name: e.target.id
        //     // }),
        //     // {
        //     //   headers: {
        //     //     "Content-Type": "application/json",
        //     //     Authorization: "Bearer " + token,
        //     //   },
             
              
        //     //   withCredentials: true,
        //     // }
        //     // headers: {
        //     //   Authorization:"Bearer " + token,
        //     // },
        //     // data: {
        //     //   employee_name: e.target.id
        //     // }
        //   }
        const response = await axios.delete(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          data: {
            employee_name: name,
          },
        });
         
        // );
        // setOpen(false);
        toast.success("employee deleted successfully!")
        getCompanyList()
        // handleClose()
    } catch (err) {
        console.log(err);
      }
  }

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
  }, []);

  const getCompanyList = async () => {
    debugger
    const url = "/operations/employee-list";
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      });
      const companyList = response.data.employees;
      console.log(companyList);
      console.log(rows);
      rows = [];
      console.log(rows);
      companyList.map((items) => {
        rows.push(createData(items.department, items.designation, items.email, items.name, items.phone, items.Is_active));
      });
      setUserList(rows);
      console.log(userList)
    } catch (err) {
      console.log(err);
    }
  };

  const searchCompany = async (str) => {
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
      myOptions = [];
      let data = response.data.suggestions
      for (var i = 0; i < data.length; i++) {
        myOptions.push(data[i].name + ',' + data[i].email);
      }
      setMyOptions(myOptions);
    } catch (err) {
      console.log(err);
    }
  };
  const getSelctedCompany = async (value) => {
    debugger
    console.log(value)
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
     const companyList = response.data;
     rows = [];
     companyList.map((items) => {
       rows.push(
         createData(
           items.name,
           items.gst_number,
           items.phone,
           items.email,
           items.project_details,
           items.Is_active
         )
       );
     });
     setUserList(rows);
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

  const handleSubmit = async (e) => {
    const Login_Url = "/operations/employee-creation";
    e.preventDefault();
    try {
      const response = await axios.post(
        Login_Url,
        JSON.stringify({
            name: name,
            designation: designation,
            department: department,
            work_loaction: workLocation,
            address: address,
            bank_name: bankName,
            phone: phone,
            email: email,
            pf_no: pfNo,
            pf_uan: pfUan,
            esi_no: esiNo,
            pan: pan,
            basic_DA: basic_DA,
            hra: hra,
            special_allowance: special_allowance,
            lta: lta,
            pf: pf,
            profession_tax: professional_tax,
            earnings_total: earnings_total
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          withCredentials: true,
        }
      );
      // setOpen(false);
      toast.success("Invoice created successfully!")
      getCompanyList();
      handleClose();

      // navigate(from, { replace: true });
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
                <h5 className="account-role">Operation</h5>
              </div>
            </div>
          </div>

          <div className="mt-3 clients-list">
            <img
              src={employeeListLogo}
              alt="employeeListLogo"
              className="clientsListImage"
            />
            <p className="user-list-text">Employee List</p>
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
                style={{ width: "97%" }}
                freeSolo
                autoComplete
                autoHighlight
                options={myOptions}
                onChange={(e) => getSelctedCompany(e.target.value)}
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
            <button
              className=" add-new-client"
              style={{width:'126px'}}
              onClick={handleClickOpen("paper")}
            >
              <img className="add-new-icon" src={addNewIcon} alt="addNewIcon" />
              Add New
            </button>
            {/* <select
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
            </select> */}
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
                    <StyledTableCell align="center">
                      Email&nbsp;
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Phone&nbsp;
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Department&nbsp;
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Designation&nbsp;
                    </StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell align="center">
                      Action&nbsp;
                    </StyledTableCell>
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
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell sx={{ padding: "10px" }} align="center">{row.phone}</TableCell>
                      <TableCell sx={{ padding: "10px" }} align="center">{row.department}</TableCell>
                      <TableCell sx={{ padding: "10px" }} align="center">{row.designation}</TableCell>
                      <TableCell sx={{ padding: "10px" }} align="center">{row.Is_active}</TableCell>
                      <TableCell align="center">
                  <DeleteIcon
                    className="delete-icon"
                    onClick={(e) => {
                      handleDeleteEmployee(row.name);
                    }}
                  />
                </TableCell>
                      {/* <TableCell id={row.name} sx={{ padding: "10px" }} align="center">
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={openMenue ? "long-menu" : undefined}
                          aria-expanded={openMenue ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleClickMenue}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            "aria-labelledby": "long-button",
                          }}
                          anchorEl={anchorEl}
                          open={openMenue}
                          onClose={handleCloseMenue}
                          PaperProps={{
                            style: {
                              maxHeight: ITEM_HEIGHT * 4.5,
                              width: "20ch",
                            },
                          }}
                        >
                          {options.map((option) => (
                            <MenuItem
                              key={option}
                              id={row.name}
                              selected={option === "Pyxis"}
                              onClick={(e)=>{handleDeleteEmployee(e)}}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </Menu>
                      </TableCell> */}
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
                        <label className="mt-3">Name</label>
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
                        <label className="mt-3">Deparment</label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setDepartment(e.target.value)}
                          value={department}
                          required
                        />
                      </div>

                      <div className="item">
                        <label className="mt-3">Designation</label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setDesignation(e.target.value)}
                          value={designation}
                          required
                        />
                      </div>

                      <div className="item">
                        <label className="mt-3">Work Location</label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setWorkLocation(e.target.value)}
                          value={workLocation}
                          required
                        />
                      </div>

                      <div className="item">
                        <label className="mt-3">Address</label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setAddress(e.target.value)}
                          value={address}
                          required
                        />
                      </div>
                      <div className="item">
                        <label className="mt-3">Phone</label>
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
                        <label className="mt-3">Email</label>
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
                        <label className="mt-3">Bank Name</label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setBankName(e.target.value)}
                          value={bankName}
                          required
                        />
                      </div>
                      {/* <div className="item">
                        <label className="mt-3">Bank Account Number</label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setBankNo(e.target.value)}
                          value={bankNo}
                          required
                        />
                      </div> */}
                      <div className="item">
                        <label className="mt-3">Pf Number</label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setPfNO(e.target.value)}
                          value={pfNo}
                          required
                        />
                      </div>
                      <div className="item">
                        <label className="mt-3">Pf UAN</label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setPfUan(e.target.value)}
                          value={pfUan}
                          required
                        />
                      </div>

                      <div className="item">
                        <label className="mt-3">Esi Number</label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setEsiNo(e.target.value)}
                          value={esiNo}
                          required
                        />
                      </div>
                      <div className="item">
                        <label className="mt-3">Pan</label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setPan(e.target.value)}
                          value={pan}
                          required
                        />
                      </div>
                      <div className="item">
                        <label className="mt-3">Basic Da</label>
                        <input
                          className="mt-3"
                          type="number"
                          autoComplete="off"
                          onChange={(e) => setBasicDa(e.target.value)}
                          value={basic_DA}
                          required
                        />
                      </div>
                      <div className="item">
                        <label className="mt-3">HRA</label>
                        <input
                          className="mt-3"
                          type="number"
                          autoComplete="off"
                          onChange={(e) => setHra(e.target.value)}
                          value={hra}
                          required
                        />
                      </div>
                      <div className="item">
                        <label className="mt-3">Special Allowance</label>
                        <input
                          className="mt-3"
                          type="number"
                          autoComplete="off"
                          onChange={(e) => setSpecialAllowance(e.target.value)}
                          value={special_allowance}
                          required
                        />
                      </div>
                      <div className="item">
                        <label className="mt-3">LTA</label>
                        <input
                          className="mt-3"
                          type="number"
                          autoComplete="off"
                          onChange={(e) => setLta(e.target.value)}
                          value={lta}
                          required
                        />
                      </div>
                      <div className="item">
                        <label className="mt-3">Pf</label>
                        <input
                          className="mt-3"
                          type="number"
                          autoComplete="off"
                          onChange={(e) => setPf(e.target.value)}
                          value={pf}
                          required
                        />
                      </div>
                      <div className="item">
                        <label className="mt-3">Professional Tax</label>
                        <input
                          className="mt-3"
                          type="number"
                          autoComplete="off"
                          onChange={(e) => setProfessionalTax(e.target.value)}
                          value={professional_tax}
                          required
                        />
                      </div>
                      <div className="item" style={{textAlign:'left'}}>
                        <label className="mt-3">Total Earnings</label>
                        <input
                          className="mt-3"
                          style={{marginLeft:'29px'}}
                          type="number"
                          autoComplete="off"
                          onChange={(e) => setEarningsTotal(e.target.value)}
                          value={earnings_total}
                          required
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
                  >
                    Submit
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

export default Employee;
