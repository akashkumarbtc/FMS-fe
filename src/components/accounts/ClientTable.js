import React from "react";
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
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

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

const ClientTable = ({ userList, setUserList, getCompanyList }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const data = localStorage.getItem("auth");
  const token = JSON.parse(data).accessToken;
  const openMenue = Boolean(anchorEl);
  const handleClickMenue = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenue = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getCompanyList();
  }, []);

  const handleCompanyDelete = async (e) => {
    debugger;
    const url = "/accounts/Company-delete";
    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        data: {
          name: e,
        },
      });
      getCompanyList();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCompanySelect = async (name) => {
    debugger;
    const url = "/accounts/company-select";
    try {
      const response = await axios.post(url, 
        JSON.stringify({
         name: name,
        }),
        {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="row mt-4">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, maxHeight: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                sx={{ lineHeight: "20px", padding: "5px" }}
                align="center"
              >
                Name
              </StyledTableCell>
              <StyledTableCell align="center">Gst No</StyledTableCell>
              <StyledTableCell align="center">Phone&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Email&nbsp;</StyledTableCell>
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
                <TableCell align="center">{row.project_details}</TableCell>
                <TableCell align="center">{row.is_active}</TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    className="delete-icon"
                    onClick={(e) => {
                      handleCompanyDelete(row.name);
                    }}
                  />
                  <BorderColorIcon
                    className="edit-icon"
                    onClick={(e) => {
                      handleCompanySelect(row.name);
                    }}
                  />
                </TableCell>
                {/* <TableCell sx={{ padding: "10px" }} align="center">
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
                              onClick={(e)=>{
                                handleCompanySelect(e)
                              }}
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
  );
};

export default ClientTable;
