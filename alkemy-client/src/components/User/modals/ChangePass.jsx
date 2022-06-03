import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {setError} from '../../../redux/actions/a.global';
import {updatePass} from '../../../redux/actions/a.user';
import {useAuth} from '../../../context/auth'
import {Modal, Fade, Box, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Backdrop} from '@mui/material';
import { FormHelperText } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const style = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

function ChangePass({handleClosePass, openPass}) {
    const dispatch=useDispatch()
    const {currentUser} = useAuth()
    const [values, setValues] = useState({
        password: "",
        passwordConfirm: "",
        showPassword: false,
        showPasswordConfirm: false,
      });
      const [errors, setErrors] = useState({
        password: "",
        passwordConfirm: "",
      });
      const [loading, setLoading] = useState(false);
    
    const handleChange = (prop) => (event) => {
        if (
          (prop === "password" || prop === "passwordConfirm") &&
          !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(event.target.value)
        ) {
          setErrors({
            ...errors,
            [prop]: "Minimum eight characters, at least one letter and one number",
          });
        } else {
          setErrors({ ...errors, [prop]: "" });
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

      async function handleSubmitPass(e) {
        e.preventDefault();
        if (!values.password) {
          dispatch(setError("Complete required information"));
        } else if (values.password === values.passwordConfirm) {
          setLoading(true);
          await dispatch(updatePass(currentUser.id, values.password,localStorage.getItem('USER_TOKEN')));
          handleClosePass();
          setLoading(false);
        } else {
          dispatch(setError("Passwords do not match"));
        }
      }
  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openPass}
        onClose={handleClosePass}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openPass}>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            border={2}
            borderColor="secondary.main"
            borderRadius={3}
            sx={style}
          >
            <Typography
              id="transition-modal-title"
              variant="h5"
              m={2}
              fontWeight="bold"
              color="primary.main"
            >
              CHANGE PASSWORD
            </Typography>
            <Box component="form" display='flex'
            flexDirection='column'
            alignItems='center'>
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
                {errors.password && (
                  <FormHelperText error>{errors.password}</FormHelperText>
                )}
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
                {errors.passwordConfirm && (
                  <FormHelperText error>
                    {errors.passwordConfirm}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box m={2} mt={6}>
              <LoadingButton
                loading={loading}
                onClick={handleSubmitPass}
                variant="contained"
                color="primary"
              >
                CHANGE PASSWORD
              </LoadingButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
  )
}

export default ChangePass