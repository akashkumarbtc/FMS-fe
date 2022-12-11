import React from 'react'
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import clientsListIcon from "../../assets/clientsListIcon.png";
import Autocomplete from "@material-ui/lab/Autocomplete";
import addNewIcon from "../../assets/addNewIcon.png";
import TextField from "@material-ui/core/TextField";

var rows = [];
const Clients = ({setOpen, setScroll, setUserList}) => {

var [myOptions, setMyOptions] = useState([]);
const data = localStorage.getItem("auth");
const token = JSON.parse(data).accessToken;

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  function createData(name, gst_number, phone, email, project_details) {
    return {
      name,
      gst_number,
      phone,
      email,
      project_details,
    };
  }

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
           items.project_details
         )
       );
     });
     setUserList(rows);
   } catch (err) {
     console.log(err);
   }
 }

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
      myOptions = [];
      let data = response.data
      for (var i = 0; i < data.length; i++) {
        myOptions.push(data[i]);
      }
      setMyOptions(myOptions);
      console.log(myOptions)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className="mt-3 clients-list">
            <img src={clientsListIcon} alt="clientsListIcon" />
            <p className="clients-list-text">Client's List</p>
    </div>
    <div className="mt-4 client-search">
    <div class="client-search-container search">
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
      className=" add-new-client"
      onClick={handleClickOpen("paper")}
    >
      <img className="add-new-icon" src={addNewIcon} alt="addNewIcon" />
      Add New
    </button>
  </div>
  </>
  )
}

export default Clients