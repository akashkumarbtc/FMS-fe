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

var rows = [];
const options = ["Update", "Delete"];
const ITEM_HEIGHT = 48;

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

function createData(username, email) {
  return {
    username,
    email,
  };
}

const User = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [userList, setUserList] = useState([]);
  const data = localStorage.getItem("auth");
  const token = JSON.parse(data).accessToken;
  var [myOptions, setMyOptions] = useState([]);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenue = Boolean(anchorEl);
  const handleClickMenue = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenue = () => {
    setAnchorEl(null);
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
  }, []);

  const getCompanyList = async () => {
    const url = "/admin/user-list";
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        withCredentials: true,
      });
      const companyList = response.data;
      console.log(companyList);
      console.log(rows);
      rows = [];
      companyList.map((items) => {
        rows.push(createData(items.username, items.email));
      });
      setUserList(rows);
    } catch (err) {
      console.log(err);
    }
  };

  const searchCompany = async (str) => {
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
      myOptions = [];
      let data = response.data.users
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

  const handleSubmit = async (e) => {
    const Login_Url = "/admin/create";
    e.preventDefault();
    try {
      const response = await axios.post(
        Login_Url,
        JSON.stringify({
          username: name,
          deparatment: department,
          email: email,
          password: pwd,
          designation: designation,
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

          <div className="mt-3 clients-list">
            <img
              src={adminList}
              alt="clientsListIcon"
              className="clientsListImage"
            />
            <p className="user-list-text">List of Users</p>
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
              onClick={handleClickOpen("paper")}
            >
              <img className="add-new-icon" src={addNewIcon} alt="addNewIcon" />
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
                    <StyledTableCell align="center">
                      Email&nbsp;
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Actions&nbsp;
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
                        {row.username}
                      </TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell sx={{ padding: "10px" }} align="center">
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
                              selected={option === "Pyxis"}
                              onClick={handleCloseMenue}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </Menu>
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
                        <label className="mt-3">Department</label>
                        {/* <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setDepartment(e.target.value)}
                          value={department}
                          required
                        /> */}
                        <select name="department" id="department" className="department-select" onChange={(e) => setDepartment(e.target.value)} required>
                          <option value="select">Select</option>
                          <option value="admin">Admin</option>
                          <option value="accounts">Accounts</option>
                          <option value="operations">Operations</option>
                        </select>
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

                      {/* <div className="item">
                        <label className="mt-3">Contact</label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setContact(e.target.value)}
                          value={contact}
                          required
                        />
                      </div> */}

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
                      </div>

                      {/* <div className="item">
                        <label className="mt-3">Work Location</label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setWorkLocation(e.target.value)}
                          value={workLocation}
                          required
                        />
                      </div> */}

                      <div className="item" style={{textAlign:'left'}}>
                        <label className="mt-3">Set New Password</label>
                        <input
                          className="mt-3 designation-input"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                          required
                        />
                      </div>

                      {/* <div className="item">
                        <label className="mt-3">Re-enter Password</label>
                        <input
                          className="mt-3"
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setMatchPwd(e.target.value)}
                          value={matchPwd}
                          required
                        />
                      </div> */}
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
    </div>
  );
};

export default User;
