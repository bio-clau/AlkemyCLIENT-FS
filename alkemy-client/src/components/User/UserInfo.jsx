import React, { useState } from "react";
import { useAuth } from "../../context/auth";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";
import { SnackbarAlert } from "../../middlewares/alert";
import {
  delError,
  delMessage,
} from "../../redux/actions/a.global";
import ChangePass from './modals/ChangePass';
import EditInfo from './modals/EditInfo';

import {
  Box,
  Typography,
  Avatar,
  Container,
  Button,
} from "@mui/material";


function UserInfo() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const msg = useSelector((state) => state.msg);
  const { currentUser} = useAuth();
  const [openPass, setOpenPass] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  function handleClosePass() {
    setOpenPass(false);
  }

  function handleCloseEdit() {
    setOpenEdit(false);
  }

  function handleCloseAlert() {
    dispatch(delError());
    dispatch(delMessage());
  }

  function handleOpen(prop) {
    prop === "pass" && setOpenPass(true);
    prop === "edit" && setOpenEdit(true);
  }

  return (
    <div>
      <Container maxWidth="lg">
        <Box
          mt={6}
          border={2}
          borderColor="secondary.main"
          borderRadius={3}
          p={5}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          boxShadow={4}
        >
          <Box>
            <Avatar src={currentUser?.image} sx={{ width: 150, height: 150 }} />
          </Box>
          <Box
            width="50%"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Box display="flex" alignItems="center">
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary.main"
                p={2}
              >{`NAME:`}</Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary.main"
                py={2}
                pr={2}
              >{`${currentUser?.firstName} ${currentUser?.lastName}`}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary.main"
                p={2}
              >{`EMAIL:`}</Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary.main"
                py={2}
                pr={2}
              >{`${currentUser?.email}`}</Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              p={2}
            >
              <Button
                onClick={() => handleOpen("edit")}
                variant="contained"
                color="primary"
                sx={{ margin: 2 }}
              >
                Edit Information
              </Button>
              <Button
                onClick={() => handleOpen("pass")}
                variant="contained"
                color="primary"
                sx={{ margin: 2 }}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <ChangePass handleClosePass={handleClosePass} openPass={openPass} />
      <EditInfo handleCloseEdit={handleCloseEdit} openEdit={openEdit} />
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <SnackbarAlert
          onClose={handleCloseAlert}
          color="error"
          variant="filled"
          severity="error"
        >
          {error}
        </SnackbarAlert>
      </Snackbar>
      <Snackbar
        open={!!msg}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <SnackbarAlert
          onClose={handleCloseAlert}
          color="success"
          variant="filled"
          severity="success"
        >
          {msg}
        </SnackbarAlert>
      </Snackbar>
    </div>
  );
}

export default UserInfo;
