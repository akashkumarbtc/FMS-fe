import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import "../css/accounts.css";
import wavingHand from "../assets/wavingHand.png";
import accountsSettings from "../assets/accountsSettings.png";
import invoiceimage from "../assets/invoiceimage.png";
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
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ToastContainer, toast } from 'react-toastify';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-toastify/dist/ReactToastify.css';

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

function createData(client, total_amount, Notes, terms) {
  return {
    client, total_amount, Notes, terms
  };
}

const Invoice = () => {
  const [itemList, setItemList] = useState([
    { item_name: "", quantity: "", rate: "", amount: "" },
  ]);
  const [companyClient, setCompanyClient] = useState("");
  const [value, setValue] = useState("");
  const [gst, setGst] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [balance_due, setBalance_due] = useState("");
  const [dueData, setDueData] = React.useState(null);
  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState("");
  const[invoiceFile, setInvoiceFile] = useState("");
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [userList, setUserList] = useState([]);
  const data = localStorage.getItem("auth");
  const token = JSON.parse(data).accessToken;
  var [myOptions, setMyOptions] = useState([]);

  console.log(itemList);

  const handleClickOpen = (scrollType) => () => {
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
  }, []);

  const getCompanyList = async () => {
    const url = "/accounts/invoice-list"
    try{
      const response = await axios.get(
        url,
        {
          headers: { "Content-Type": "application/json", 'Authorization': 'Bearer '+token },
          withCredentials: true,
        }
      );
      console.log(response.data.invoices)
      const invoiceList = response.data.invoices
      rows=[]
      invoiceList.map((items)=>{
         rows.push(createData(items.client, items.total_amount, items.Notes, items.terms))
      })
      setUserList(rows)

    }catch(err){
      console.log(err)
    }
  }

  const getSelctedInvoice = async (value) => {
    const url = "/accounts/invoice-filter";
    try {
     const response = await axios.post(url, 
       JSON.stringify({
        client: value,
       }),
       {
       headers: {
         "Content-Type": "application/json",
         Authorization: "Bearer " + token,
       },
     });
     const invoiceList = response.data
      rows=[]
      invoiceList.map((items)=>{
         rows.push(createData(items.client, items.total_amount, items.Notes, items.terms))
      })
      setUserList(rows)

   } catch (err) {
     console.log(err);
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
      let data = response.data.suggestions
      myOptions = [];
      for (var i = 0; i < data.length; i++) {
        myOptions.push(data[i]);
      }
      setMyOptions(myOptions);
    } catch (err) {
      console.log(err);
    }
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


  const handleSubmit = async (e) => {
    const Login_Url = "/accounts/invoice-creation";
    e.preventDefault();
    try {
        const response = await axios.post(
          Login_Url,
          JSON.stringify({
            "client": companyClient,
            "item_list": itemList,
            "value": parseFloat(value),
            "gst": parseFloat(gst),
            "total_value": parseFloat(totalValue),
            "due_date": dueData,
            "balance_due": parseFloat(balance_due),
            "notes": notes,
            "terms": terms
          }),
          {
            headers: { "Content-Type": "application/json", 'Authorization': 'Bearer '+token },
            withCredentials: true,
          }
        );
        // setOpen(false);
        toast.success("Invoice created successfully!")
        getCompanyList()
        handleClose()
    } catch (err) {
      
      // handleClose()
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
  const incrementItem = () => {
    setItemList([
      ...itemList,
      { item_name: "", quantity: "", rate: "", amount: "" },
    ]);
  };
  const deleteItem = (index) => {
    const list = [...itemList];
    list.splice(index, 1);
    setItemList(list);
  };
  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...itemList];
    if(name == 'rate' || name == 'amount'){
        list[index][name] = parseFloat(value);
    }else if(name == 'quantity'){
        list[index][name] = parseInt(value);
    }else{
        list[index][name] = value;
    }
    setItemList(list);
  };

  const handleFileUpload = async (e) => {
    debugger
    let file = e.target.files[0];
    let formdata = new FormData();
    formdata.append("files", file);

    // setInvoiceFile(file);
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = () => {
    //   setInvoiceFile(reader.result);
    // };
    for (var key of formdata.entries()) {
      console.log(key[0] + ', ' + key[1]);
  }
    const Login_Url = "/accounts/parse-past-invoices";
    e.preventDefault();
    try {
        const response = await axios.post(
          Login_Url,
          formdata,
          // JSON.stringify({
          //    files: formdata
          // }),
          {
            headers: {  'Content-type': 'multipart/form-data', 'Authorization': 'Bearer '+token },
            withCredentials: true,
          }
        );
        toast.success("Invoice uploaded successfully!")
        getCompanyList()
    } catch (err) {
      toast.error(err.response.data.detail)
  }
}
  const upload = () => {
    document.getElementById("primaryinvoiceupload").click();
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
          <div className="mt-3 clients-list">
            <img src={invoiceimage} alt="invoiceimage" />
            <p className="clients-list-text" style={{ marginLeft: "10px" }}>
              Invoice Details
            </p>
          </div>
          <div className="mt-3 client-search">
            <div class="invoice-search-container search">
               <Autocomplete
                style={{ width: '97%' }}
                freeSolo
                autoComplete
                autoHighlight
                options={myOptions}
                onChange={(e) => getSelctedInvoice(e.target.value)}
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
            <input type="file" id='primaryinvoiceupload' onChange={(e)=>handleFileUpload(e)}/>
            <button
              id='secondaryinvoiceupload'
              className=" add-previous-invoice"
              onClick={upload}
            >
              <img className="add-new-icon" src={addNewIcon} alt="addNewIcon" />
              Upload invoice
            </button>
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
                      Client
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Total Amount&nbsp;
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Notes&nbsp;
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Terms&nbsp;
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userList.map((row) => (
                    <TableRow
                      key={row.client}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={{ padding: "10px" }} align="center">
                        {row.client}
                      </TableCell>
                      <TableCell align="center">{row.total_amount}</TableCell>
                      <TableCell align="center">{row.Notes}</TableCell>
                      <TableCell align="center">{row.terms}</TableCell>
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
                  Add New Invoice
                </DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                  <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                  >
                    <form onSubmit={handleSubmit}>
                      <div style={{ display: "flex", width: "100%" }}>
                        <div style={{ width: "50%", textAlign: "left" }}>
                          {/* <label style={{ paddingLeft: "0px" }}>
                            Company/Client
                          </label> */}
                          {/* <input
                            style={{ width: "105%" }}
                            type="text"
                            value={companyClient}
                            onChange={(e) => setCompanyClient(e.target.value)}
                            required
                          /> */}
                           <Autocomplete
                style={{ width: '97%', marginTop:"24px"}}
                freeSolo
                autoComplete
                autoHighlight
                options={myOptions}
                onChange={(e) => setCompanyClient(e.target.value)}
                renderInput={(params) => (
                  <TextField style={{padding:"5px !important"}}
                    {...params}
                    label="Search company here!"
                    onChange={(e)=>handleControlSearch(
                     searchCompany(e.target.value)
                    ,2000)}
                    variant="outlined"
                  />
                )}
              />
                        </div>
                        <div style={{ width: "50%", textAlign: "right" }}>
                          <label style={{ paddingLeft: "64px" }}>Items</label>
                          <button
                            className=" add-item-button"
                            onClick={incrementItem}
                          >
                            + Add Item
                          </button>
                        </div>
                      </div>
                      {itemList.map((singleItem, index) => (
                        <div
                          key={index}
                          className="mt-3"
                          style={{ display: "flex", width: "100%" }}
                        >
                          <div style={{ width: "25%", textAlign: "left" }}>
                            <label style={{ paddingLeft: "0px" }}>Item</label>
                            <input
                              type="text"
                              style={{ width: "90%" }}
                              name="item_name"
                              value={singleItem.item_name}
                              onChange={(e) => handleItemChange(e, index)}
                              required
                            />
                          </div>
                          <div style={{ width: "25%", textAlign: "center" }}>
                            <label style={{ paddingLeft: "20px" }}>
                              Quantity
                            </label>
                            <input
                              type="number"
                              style={{ width: "90%" }}
                              name="quantity"
                              value={singleItem.quantity}
                              onChange={(e) => handleItemChange(e, index)}
                              required
                            />
                          </div>
                          <div style={{ width: "25%", textAlign: "center" }}>
                            <label style={{ paddingLeft: "17px" }}>Rate</label>
                            <input
                              type="number"
                              style={{ width: "90%" }}
                              name="rate"
                              value={singleItem.rate}
                              onChange={(e) => handleItemChange(e, index)}
                              required
                            />
                          </div>
                          <div style={{ width: "25%", textAlign: "right" }}>
                            <label style={{ paddingLeft: "17px" }}>
                              Amount
                            </label>
                            <input
                              type="number"
                              style={{ width: "90%" }}
                              name="amount"
                              value={singleItem.amount}
                              onChange={(e) => handleItemChange(e, index)}
                              required
                            />
                          </div>
                          {itemList.length > 1 && (
                            <RemoveCircleOutlineIcon
                              style={{
                                marginTop: "27px",
                                marginLeft: "5px",
                                cursor: "pointer",
                              }}
                              fontSize="large"
                              onClick={() => deleteItem(index)}
                            />
                          )}
                        </div>
                      ))}
                      <div
                        className="mt-3"
                        style={{ display: "flex", width: "100%" }}
                      >
                        <div style={{ width: "33.33%", textAlign: "left" }}>
                          <label style={{ paddingLeft: "0px" }}>value</label>
                          <input
                            type="number"
                            style={{ width: "90%" }}
                            value={value}
                            onChange={(e) => {
                              setValue(e.target.value)
                              setGst((18/100)*e.target.value)
                              setTotalValue(parseFloat(e.target.value) + parseFloat((18/100)*e.target.value))
                            }}
                            required
                          />
                        </div>
                        <div style={{ width: "33.33%", textAlign: "center" }}>
                          <label style={{ paddingLeft: "20px" }}>18% Gst</label>
                          <input
                            type="number"
                            style={{ width: "90%" }}
                            value={gst}
                            disabled
                            // onChange={(e) => setGst(e.target.value)}
                            required
                          />
                        </div>
                        <div style={{ width: "33.33%", textAlign: "right" }}>
                          <label style={{ paddingLeft: "17px" }}>
                            Total Value
                          </label>
                          <input
                            type="number"
                            style={{ width: "90%" }}
                            value={totalValue}
                            disabled
                            // onChange={(e) => setTotalValue(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-3" style={{display:'flex', width:'100%'}}>
                        <div style={{ width: "50%", textAlign: "left" }}>
                        <label style={{ paddingLeft: "0px" }}>
                            Balance Due
                          </label>
                          <input
                            type="number"
                            style={{ width: "90%" }}
                            value={balance_due}
                            onChange={(e) => setBalance_due(e.target.value)}
                            required
                          />
                          </div>
                          <div style={{ width: "50%", textAlign: "right", paddingTop:'15px' }}>
                          {/* <label style={{ paddingLeft: "20px" }}>
                            Balance Due
                          </label> */}
                          <LocalizationProvider dateAdapter={AdapterDayjs} style={{ width: '92% !important' }}>
                            <DatePicker
                            style={{ width: '92% !important' }}
                              label="Set DueDate"
                              value={dueData}
                              views={["year", "month", "day"]}
                              format="DD-MM-YYYY"
                              onChange={(newValue) => {
                                debugger
                                setDueData(newValue.$d.getFullYear() + '-' + newValue.$d.getMonth() + '-' + newValue.$d.getDate());
                              }}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                          </div>
                      </div>
                      <div
                        className="mt-3"
                        style={{ display: "flex", width: "100%" }}
                      >
                        <div style={{ width: "50%", textAlign: "left" }}>
                          <label style={{ paddingLeft: "0px" }}>Notes</label>
                          <textarea
                            className="description-text"
                            rows="2"
                            cols="28"
                            name="comment"
                            form="usrform"
                            autoComplete="off"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            required
                          />
                        </div>
                        <div style={{ width: "50%", textAlign: "right" }}>
                          <label style={{ paddingLeft: "20px" }}>Terms</label>
                          <textarea
                            className="description-text"
                            rows="2"
                            cols="28"
                            name="comment"
                            form="usrform"
                            autoComplete="off"
                            value={terms}
                            onChange={(e) => setTerms(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <button className="submitButton" id ="primarybutton" style={{display:'none'}}>Submit</button>
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

export default Invoice;
