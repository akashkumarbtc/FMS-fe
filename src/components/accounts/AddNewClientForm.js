import React from 'react'
import { useState, useEffect, useRef } from "react";
import axios from "../../api/axios";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const AddNewClientForm = ( {open, setOpen, scroll, getCompanyList} ) => {
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
    const[validEmail, setValidEmail] = useState(false);

    const data = localStorage.getItem("auth");
    const token = JSON.parse(data).accessToken;

    const descriptionElementRef = React.useRef(null);

    const handleClose = () => {
        setOpen(false);
        };

    const secondaryClick = () => {
        document.getElementById("primarybutton").click();
        };

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
        }, [email]);

    
        const handleSubmit = async (e) => {
            const Login_Url = "/accounts/company-creation";
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

  return (
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
                Submit
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    </div>
  )
}

export default AddNewClientForm