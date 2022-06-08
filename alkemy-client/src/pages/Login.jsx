import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Box,
  Typography,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuth } from "../context/auth";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Mail from "@mui/icons-material/Mail";
import { Snackbar } from "@mui/material";
import { SnackbarAlert } from "../middlewares/alert";
import { setError, delError } from "../redux/actions/a.global";

function Login() {
  const { login } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const error = useSelector((state) => state.error);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleClose() {
    dispatch(delError());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const dir = await login(values.email, values.password);
    if (dir) {
      navigate("/profile");
    } else {
      dispatch(setError("Login Failed"));
      setValues({
        email: "",
        password: "",
        showPassword: false,
      });
      setLoading(false);
    }
  }
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        border={3}
        borderColor="secondary.main"
        borderRadius={3}
        boxShadow={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        maxWidth="50%"
        bgcolor="white"
        p={4}
        m={10}
        color="secondary.contrastText"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography mr={{ xs: 0, md: 4 }} fontWeight="bold" variant="h4">
            LOGIN
          </Typography>
          <AccountBalanceIcon fontSize="large" />
          <Box component="form">
            <FormControl
              sx={{ m: 1, width: { xs: "20ch", sm: "25ch" } }}
              variant="outlined"
              color="primary"
            >
              <InputLabel
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                htmlFor="outlined-adornment-email"
              >
                Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                value={values.email}
                onChange={handleChange("email")}
                endAdornment={
                  <InputAdornment position="end">
                    <Mail />
                  </InputAdornment>
                }
                label="email"
              />
            </FormControl>
            <FormControl
              sx={{ m: 1, width: { xs: "20ch", sm: "25ch" } }}
              variant="outlined"
              color="primary"
            >
              <InputLabel
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                htmlFor="outlined-adornment-password"
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Box>
        </Box>
        <Box m={2} mt={6}>
          <LoadingButton
            loading={loading}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            LOGIN
          </LoadingButton>
        </Box>
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <SnackbarAlert
          onClose={handleClose}
          color="error"
          variant="filled"
          severity="error"
        >
          {error}
        </SnackbarAlert>
      </Snackbar>
    </Container>
  );
}

export default Login;
