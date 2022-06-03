import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {useAuth} from '../context/auth'
import {
  Container,
  Box,
  Typography,
  FormControl,
  FormGroup,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Stack,
  Input,
} from "@mui/material";
import {FormHelperText} from '@mui/material';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import LoadingButton from "@mui/lab/LoadingButton";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Mail from "@mui/icons-material/Mail";
import { Snackbar } from "@mui/material";
import { SnackbarAlert } from "../middlewares/alert";
import Person from "@mui/icons-material/Person";
import { setError, delError } from "../redux/actions/a.global";

function Register() {
    const navigate = useNavigate()
    const {register} = useAuth();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    image: "",
    showPassword: false,
    showPasswordConfirm: false,
  });

  const error = useSelector((state) => state.error);

  function handleImageChange(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setValues({ ...values, image: reader.result });
    };
  }

  const handleChange = (prop) => (event) => {
    console.log('aca entro');
    if((prop === 'firstName' || prop === 'lastName') && /\d/gi.test(event.target.value)){
      setErrors({...errors, [prop]:'Can not have numbers'})
    } else {
      setErrors({...errors, [prop]:''})
    }
    if(prop === 'email' && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(event.target.value)){
      setErrors({...errors, email:'Invalid email'})
    } else {
      setErrors({...errors, email:''})
    }
    if((prop === 'password' || prop==='passwordConfirm') && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(event.target.value)){
      setErrors({...errors, [prop]:'Minimum eight characters, at least one letter and one number'})
    } else {
      setErrors({...errors, [prop]:''})
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowPasswordConfirm = () => {
    setValues({
      ...values,
      showPasswordConfirm: !values.showPasswordConfirm,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleClose() {
    dispatch(delError());
  }

  async function handleSubmit(e){
    e.preventDefault();
    if(!values.firstName || !values.lastName || !values.email || !values.password) {
        dispatch(setError('Complete required information'));
    }else if(values.password===values.passwordConfirm){

        setLoading(true)
        const dir = await register(values.email,values.firstName, values.lastName, values.password, values.image);
        if(dir){
          navigate('/profile')
        } else {
          dispatch(setError('Register Failed'));
          setValues({
            firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        image: "",
        showPassword: false,
        showPasswordConfirm: false,
        })
        setLoading(false)
        }
    } else {
        dispatch(setError('Passwords do not match'));
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography mr={4} fontWeight="bold" variant="h4">
            REGISTER
          </Typography>
          <AccountBalanceIcon fontSize="large" />
          <Box ml={4} component="form">
            <FormGroup>
              <FormControl
                sx={{ m: 1, width: "25ch" }}
                variant="outlined"
                color="primary"
                required
                
                >
                <InputLabel htmlFor="outlined-adornment-firstName">
                  First Name
                </InputLabel>
                <OutlinedInput
                  error={Boolean(errors.firstName)}
                  id="outlined-adornment-firstName"
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  endAdornment={
                    <InputAdornment position="end">
                      <Person />
                    </InputAdornment>
                  }
                  label="firstName"
                />
                {errors.firstName && <FormHelperText error >{errors.firstName}</FormHelperText>}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "25ch" }}
                variant="outlined"
                color="primary"
                required
              >
                <InputLabel htmlFor="outlined-adornment-lastName">
                  Last Name
                </InputLabel>
                <OutlinedInput
                error={Boolean(errors.lastName)}
                  id="outlined-adornment-lastName"
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  endAdornment={
                    <InputAdornment position="end">
                      <Person />
                    </InputAdornment>
                  }
                  label="lastName"
                />
                {errors.lastName && <FormHelperText error >{errors.lastName}</FormHelperText>}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "25ch" }}
                variant="outlined"
                color="primary"
                required
              >
                <InputLabel htmlFor="outlined-adornment-email">
                  Email
                </InputLabel>
                <OutlinedInput
                error={Boolean(errors.email)}
                  id="outlined-adornment-email"
                  type='email'
                  value={values.email}
                  onChange={handleChange("email")}
                  endAdornment={
                    <InputAdornment position="end">
                      <Mail />
                    </InputAdornment>
                  }
                  label="email"
                />
                {errors.email && <FormHelperText error >{errors.email}</FormHelperText>}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "25ch" }}
                variant="outlined"
                color="primary"
                required
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                error={Boolean(errors.password)}
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
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {errors.password && <FormHelperText error >{errors.password}</FormHelperText>}
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "25ch" }}
                variant="outlined"
                color="primary"
                required
              >
                <InputLabel htmlFor="outlined-adornment-passwordConfirm">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                error={Boolean(errors.passwordConfirm)}
                  id="outlined-adornment-passwordConfirm"
                  type={values.showPasswordConfirm ? "text" : "password"}
                  value={values.passwordConfirm}
                  onChange={handleChange("passwordConfirm")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordConfirm}
                          onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPasswordConfirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="PasswordConfirm"
                />
                {errors.passwordConfirm && <FormHelperText error >{errors.passwordConfirm}</FormHelperText>}
              </FormControl>
              <FormControl>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <label htmlFor="icon-button-file">
                    <Input
                      sx={{ display: "none" }}
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera fontSize="large" />
                    </IconButton>
                  </label>
                </Stack>
              </FormControl>
            </FormGroup>
          </Box>
        </Box>
        <Box m={2} mt={6}>
          <LoadingButton
            loading={loading}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            REGISTER
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

export default Register;
