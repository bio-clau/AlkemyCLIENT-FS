import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import {useAuth} from '../context/auth';
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Mail from '@mui/icons-material/Mail'


function Login() {
  const {login} = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

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

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true)
    const dir = await login(values.email, values.password);
    navigate(`/${dir}`)
  }
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:'center'
      }}
    >
      <Box border={3} borderColor='secondary.main' borderRadius={3} boxShadow={8}
        sx={{ display: "flex", flexDirection:'column', justifyContent:'center', alignItems: "center" }}
        maxWidth="50%"
        bgcolor="white"
        p={4}
        m={10}
        color="secondary.contrastText">
      <Box
        sx={{ display: "flex", justifyContent:'center', alignItems: "center" }}
      >
        <Typography mr={4} fontWeight="bold" variant="h4">
          LOGIN
        </Typography>
        <AccountBalanceIcon fontSize="large" />
        <Box  component="form">
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" color='primary'>
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            value={values.email}
            onChange={handleChange('email')}
            endAdornment={
              <InputAdornment position="end">
                
                  <Mail />
                
              </InputAdornment>
            }
            label="email"
          />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" color='primary'>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
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
      </Box >
      <Box m={2} mt={6} >
      <LoadingButton loading={loading} onClick={handleSubmit} variant='contained' color='primary'>
        LOGIN
      </LoadingButton>
      </Box>
      </Box>
    </Container>
  );
}

export default Login;
