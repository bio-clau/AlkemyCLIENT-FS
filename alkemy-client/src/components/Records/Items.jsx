import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { formatDate, dateMini } from "../../helpers/date";
import PaidIcon from "@mui/icons-material/Paid";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MoreInfo from "./modals/MoreInfo";
import DeleteOp from "./modals/DeleteOp";
import EditOp from "./modals/EditOp";

function Items({ id, date, type, amount, concept, category }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [modals, setModals] = useState({
    openMI: false,
    openDel: false,
    openEdit: false,
  });

  function handleClose(prop) {
    setModals({ ...modals, [prop]: false });
  }
  function handleOpen(prop) {
    setModals({ ...modals, [prop]: true });
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <>
      <ListItem>
        <ListItemIcon>
          <PaidIcon color={type === "income" ? "success" : "error"} />
        </ListItemIcon>
        <ListItemText
          sx={{ display: { xs: "none", md: "block" }, minWidth: 200 }}
          primary={`Date`}
          secondary={formatDate(date)}
        />
        <ListItemText
          sx={{ display: { xs: "block", md: "none" }, minWidth: 90 }}
          primary={`Date`}
          secondary={dateMini(date)}
        />
        <ListItemText
          sx={{ minWidth: 70 }}
          primary={`Amount`}
          secondary={amount}
        />
        <ListItemButton
          sx={{ display: { xs: "none", sm: "block" } }}
          onClick={() => handleOpen("openEdit")}
        >
          <Edit color="primary" />
        </ListItemButton>
        <ListItemButton
          sx={{ display: { xs: "none", sm: "block" } }}
          onClick={() => handleOpen("openDel")}
        >
          <Delete color="primary" />
        </ListItemButton>
        <ListItemButton
          sx={{ display: { xs: "none", sm: "block" } }}
          onClick={() => handleOpen("openMI")}
        >
          <MoreHoriz color="primary" />
        </ListItemButton>
        <ListItemButton
          sx={{ display: { xs: "block", sm: "none" } }}
          oaria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
        >
          <ExpandMore color="primary" />
        </ListItemButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          <MenuItem key="home">
            <ListItemButton onClick={() => handleOpen("openEdit")}>
              <Edit color="primary" />
            </ListItemButton>
          </MenuItem>
          <MenuItem key="login">
            <ListItemButton
              sx={{ width: "fit-content" }}
              onClick={() => handleOpen("openDel")}
            >
              <Delete color="primary" />
            </ListItemButton>
          </MenuItem>
          <MenuItem key="register">
            <ListItemButton onClick={() => handleOpen("openMI")}>
              <MoreHoriz color="primary" />
            </ListItemButton>
          </MenuItem>
        </Menu>
      </ListItem>
      <MoreInfo
        open={modals.openMI}
        handleClose={handleClose}
        id={id}
        date={date}
        type={type}
        amount={amount}
        concept={concept}
        category={category}
      />
      <DeleteOp open={modals.openDel} handleClose={handleClose} id={id} />
      <EditOp
        open={modals.openEdit}
        handleClose={handleClose}
        id={id}
        concept={concept}
        category={category}
      />
    </>
  );
}

export default Items;
