import React from 'react'
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


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

const ClientTable = ({userList, setUserList, getCompanyList}) => {

    useEffect(() => {
        getCompanyList();
      }, []);



  return (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  )
}

export default ClientTable