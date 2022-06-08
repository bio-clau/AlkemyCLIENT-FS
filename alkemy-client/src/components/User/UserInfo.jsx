import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";
import { SnackbarAlert } from "../../middlewares/alert";
import { delError, delMessage } from "../../redux/actions/a.global";
import { whoami } from "../../redux/actions/a.user";
import ChangePass from "./modals/ChangePass";
import EditInfo from "./modals/EditInfo";

import { Box, Typography, Avatar, Container, Button } from "@mui/material";

function UserInfo() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const msg = useSelector((state) => state.msg);
  const { currentUser } = useAuth();
  const [openPass, setOpenPass] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    dispatch(whoami(localStorage.getItem("USER_TOKEN")));
  }, [dispatch]);

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
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-around"
          alignItems="center"
          boxShadow={4}
        >
          <Box>
            <Avatar src={currentUser?.image} sx={{ width: 180, height: 180 }} />
          </Box>
          <Box
            width={{ xs: "95%", md: "50%" }}
            display="flex"
            flexDirection="column"
            alignItems={{ xs: "flex-start", sm: "center", md: "flex-start" }}
            justifyContent="center"
          >
            <Box display="flex" flexWrap="wrap" alignItems="center">
              <Typography
                variant="h5"
                fontSize={{ xs: "1.2rem", sm: "1.7rem", lg: "1.9rem" }}
                fontWeight="bold"
                color="primary.main"
                p={{ xs: 1, sm: 2 }}
              >{`NAME:`}</Typography>
              <Typography
                variant="h5"
                fontSize={{ xs: "1.2rem", sm: "1.3rem", lg: "1.5rem" }}
                fontWeight="bold"
                color="primary.main"
                py={{ xs: 1, sm: 2 }}
                pr={2}
              >{`${currentUser?.firstName} ${currentUser?.lastName}`}</Typography>
            </Box>
            <Box display="flex" flexWrap="wrap" alignItems="center">
              <Typography
                variant="h5"
                fontSize={{ xs: "1.2rem", sm: "1.7rem", lg: "1.9rem" }}
                fontWeight="bold"
                color="primary.main"
                p={{ xs: 1, sm: 2 }}
              >{`EMAIL:`}</Typography>
              <Typography
                variant="h5"
                fontSize={{ xs: "1.2rem", sm: "1.3rem", lg: "1.5rem" }}
                fontWeight="bold"
                color="primary.main"
                py={{ xs: 1, sm: 2 }}
                pr={2}
              >{`${currentUser?.email}`}</Typography>
            </Box>
            <Box display="flex" flexWrap="wrap" alignItems="center">
              <Typography
                variant="h5"
                fontSize={{ xs: "1.2rem", sm: "1.7rem", lg: "1.9rem" }}
                fontWeight="bold"
                color="primary.main"
                p={{ xs: 1, sm: 2 }}
              >{`TOTAL AMOUNT:`}</Typography>
              <Typography
                variant="h5"
                fontSize={{ xs: "1.2rem", sm: "1.3rem", lg: "1.5rem" }}
                fontWeight="bold"
                color="primary.main"
                py={{ xs: 1, sm: 2 }}
                pr={2}
              >{`$${currentUser?.total}`}</Typography>
            </Box>
            <Box
              display="flex"
              justifyContent={{ xs: "center", md: "space-around" }}
              flexDirection={{ xs: "column", md: "row" }}
              alignItems="center"
              p={2}
            >
              <Button
                onClick={() => handleOpen("edit")}
                variant="contained"
                color="primary"
                sx={{ margin: 2, fontSize: { md: "0.8rem", lg: "1rem" } }}
              >
                Edit Information
              </Button>
              <Button
                onClick={() => handleOpen("pass")}
                variant="contained"
                color="primary"
                sx={{ margin: 2, fontSize: { md: "0.8rem", lg: "1rem" } }}
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
