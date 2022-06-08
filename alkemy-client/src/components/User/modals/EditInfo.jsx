import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setError } from "../../../redux/actions/a.global";
import { useAuth } from "../../../context/auth";
import { updateUser } from "../../../redux/actions/a.user";
import {
  Modal,
  Fade,
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Backdrop,
  Stack,
  Input,
  IconButton,
} from "@mui/material";
import { FormHelperText } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Person from "@mui/icons-material/Person";
import Mail from "@mui/icons-material/Mail";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 250, sm: 400 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function EditInfo({ handleCloseEdit, openEdit }) {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    image: currentUser.image,
    uploadImg: false,
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (prop) => (event) => {
    if (
      (prop === "firstName" || prop === "lastName") &&
      /\d/gi.test(event.target.value)
    ) {
      setErrors({ ...errors, [prop]: "Can not have numbers" });
    } else {
      setErrors({ ...errors, [prop]: "" });
    }
    if (
      prop === "email" &&
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(event.target.value)
    ) {
      setErrors({ ...errors, email: "Invalid email" });
    } else {
      setErrors({ ...errors, email: "" });
    }
    setValues({ ...values, [prop]: event.target.value });
  };
  async function handleSubmitUpdate(e) {
    e.preventDefault();
    if (!values.firstName || !values.lastName || !values.email) {
      dispatch(setError("Complete required information"));
    } else {
      setLoading(true);
      await dispatch(
        updateUser(
          values.firstName,
          values.lastName,
          values.email,
          currentUser.id,
          values.image,
          values.uploadImg,
          localStorage.getItem("USER_TOKEN")
        )
      );
      //   if (dir) {
      //     dispatch(setMessage("Information updated successfully"));
      //   } else {
      //     dispatch(setError("Information update failed"));
      //   }
      handleCloseEdit();
      setLoading(false);
    }
  }

  function handleImageChange(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setValues({ ...values, image: reader.result, uploadImg: true });
    };
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openEdit}
      onClose={handleCloseEdit}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openEdit}>
        <Box
          border={2}
          borderColor="secondary.main"
          borderRadius={3}
          sx={style}
        >
          <Typography
            id="transition-modal-title"
            variant="h5"
            fontWeight="bold"
            color="primary.main"
          >
            EDIT INFORMATION
          </Typography>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
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
              {errors.firstName && (
                <FormHelperText error>{errors.firstName}</FormHelperText>
              )}
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
              {errors.lastName && (
                <FormHelperText error>{errors.lastName}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
              color="primary"
              required
            >
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                error={Boolean(errors.email)}
                id="outlined-adornment-email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                endAdornment={
                  <InputAdornment position="end">
                    <Mail />
                  </InputAdornment>
                }
                label="email"
              />
              {errors.email && (
                <FormHelperText error>{errors.email}</FormHelperText>
              )}
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
          </Box>
          <Box m={2} mt={6}>
            <LoadingButton
              loading={loading}
              onClick={handleSubmitUpdate}
              variant="contained"
              color="primary"
            >
              EDIT INFORMATION
            </LoadingButton>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditInfo;
