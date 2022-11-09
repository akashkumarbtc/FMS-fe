import * as React from 'react';
import "../css/accounts.css"
import wavingHand from "../assets/wavingHand.png"
import accountsSettings from "../assets/accountsSettings.png"
import totalClients from "../assets/totalClients.png"
import activeClients from "../assets/activeClients.png"
import clientsListIcon from "../assets/clientsListIcon.png"
import addNewIcon from "../assets/addNewIcon.png"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#051134',
    color: theme.palette.common.white,
    padding:'0px',
    paddingBottom:'16px',
    paddingTop:'16px'
    
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  }
}));

function createData(title, companyName, companyCode, streetAdress, city, postalCode, state, country, email) {
  return { title, companyName, companyCode, streetAdress, city, postalCode, state, country, email};
}

const rows = [
  createData('Bt Consultants', 'Bluetick Consultants', 336, 'Sbis Sarah Trail', 'Bangalore', 560012, 'Karnataka', 'India', 'ABC@gmail.com'),
  createData('Bt Consultants', 'Bluetick Consultants', 336, 'Sbis Sarah Trail', 'Bangalore', 560012, 'Karnataka', 'India', 'ABC@gmail.com'),
  createData('Bt Consultants', 'Bluetick Consultants', 336, 'Sbis Sarah Trail', 'Bangalore', 560012, 'Karnataka', 'India', 'ABC@gmail.com'),
  createData('Bt Consultants', 'Bluetick Consultants', 336, 'Sbis Sarah Trail', 'Bangalore', 560012, 'Karnataka', 'India', 'ABC@gmail.com'),
  createData('Bt Consultants', 'Bluetick Consultants', 336, 'Sbis Sarah Trail', 'Bangalore', 560012, 'Karnataka', 'India', 'ABC@gmail.com'),
];

const Accounts = () => {
  return <div style={{ width: "100%", height: "100vh" }}>
    <div className="wrapper" style={{ padding: '17px',height:'100vh', background: "#F5F5F5" }}>
      <div className="container-fluid" style={{ height: '100vh' }}>
        <div className="main-header">
          <div className="admin-header">
            <div>
              <h3 className="welcome-name">Hi, Ankur</h3>
              <h2 className="welcome-text">Welcome back!</h2>
            </div>
            <img className="waving" src={wavingHand} alt="wavingHand" />
          </div>
          <div className="userSetting">
            <img className="user-image" src={accountsSettings} alt="accountsSettings" />
            <div>
              <h3 className="account-name">Ankur Gupta</h3>
              <h5 className="account-role">Accounts</h5>
            </div>
          </div>
        </div>
        <div className='row mt-5' style={{ width: '100px !important', backgroundColor: '#F5F5F5', height: 'auto', display: 'flex', justifyContent: 'left', paddingLeft: '9px' }}>
          <div className="col-sm-4 total-clients">
            <img className="total-clients-image" src={totalClients} alt="totalClients" />
            <div>
              <h3 className="total-clients-text">Total Clients</h3>
              <h1 className="total-clients-no">65</h1>
            </div>
          </div>
          <div className="col-sm-4 active-clients">
            <img className="total-clients-image" src={activeClients} alt="activeClients" />
            <div>
              <h3 className="total-clients-text">Total Active Clients</h3>
              <h1 className="total-clients-no">50</h1>
            </div>
          </div>
        </div>
        <div className="mt-3 clients-list">
          <img src={clientsListIcon} alt="clientsListIcon" />
          <p className="clients-list-text">Client's List</p>
        </div>
        <div className="mt-3 client-search">
            <div class="client-search-container search">
              <i class="fa fa-search"></i>
              <input className="client-search-field form-control" type="text" placeholder="Type something here!" />
            </div>
            <button className=" add-new-client"><img className="add-new-icon" src={addNewIcon} alt="addNewIcon" />Add New</button>
        </div>
        <div className="row mt-3">
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, maxHeight:300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{lineHeight:'20px', padding:'5px'}} align="center">Title</StyledTableCell >
            <StyledTableCell  align="center">Company Name</StyledTableCell >
            <StyledTableCell  align="center">Company Code&nbsp;</StyledTableCell >
            <StyledTableCell  align="center">Street Address&nbsp;</StyledTableCell >
            <StyledTableCell  align="center">City&nbsp;</StyledTableCell >
            <StyledTableCell  align="center">Postal Code&nbsp;</StyledTableCell >
            <StyledTableCell  align="center">State&nbsp;</StyledTableCell >
            <StyledTableCell  align="center">Country&nbsp;</StyledTableCell >
            <StyledTableCell  align="center">Email&nbsp;</StyledTableCell >
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ padding:'10px'}} align="center">{row.title}</TableCell>
              <TableCell align="center">{row.companyName}</TableCell>
              <TableCell align="center">{row.companyCode}</TableCell>
              <TableCell align="center">{row.streetAdress}</TableCell>
              <TableCell align="center">{row.city}</TableCell>
              <TableCell align="center">{row.postalCode}</TableCell>
              <TableCell align="center">{row.state}</TableCell>
              <TableCell align="center">{row.country}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
      </div>
    </div>
  </div>;
};

export default Accounts;
