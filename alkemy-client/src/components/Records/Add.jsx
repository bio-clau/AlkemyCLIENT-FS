import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setError, delError, delMessage } from "../../redux/actions/a.global";
import { addOp } from "../../redux/actions/a.operations";
import {
  Box,
  Container,
  Select,
  FormGroup,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  TextField,
} from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Snackbar } from "@mui/material";
import { SnackbarAlert } from "../../middlewares/alert";
import LoadingButton from "@mui/lab/LoadingButton";

function Add() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    type: "",
    amount: "",
    concept: "",
    category: "",
    date:''
  });
  const [values, setValues] = useState({
    type: "",
    amount: "",
    concept: "",
    date: "",
    category: "",
  });

  const error = useSelector((state) => state.error);
  const msg = useSelector((state) => state.msg);
  const currentUser = useSelector((state) => state.user);

  function handleClose() {
    dispatch(delError());
    dispatch(delMessage());
  }

  const handleChange = (prop) => (event) => {
    console.log(event.target.value)
    if (prop === "amount" && !/^[0-9]+$/.test(event.target.value)) {
      setErrors({ ...errors, amount: "Must only be numbers" });
    } else {
      setErrors({ ...errors, amount: "" });
    }

    setValues({ ...values, [prop]: event.target.value });
  };

  async function handleSubmit() {
    setLoading(true);
    if (!values.type || !values.amount || !values.concept) {
      dispatch(setError("Must complete all fields"));
    } else if (errors.amount) {
      dispatch(setError(`Amount ${errors.amount}`));
    } else {
      await dispatch(
        addOp(
          values.type,
          values.amount,
          values.concept,
          values.date,
          values.category,
          currentUser.id,
          localStorage.getItem("USER_TOKEN")
        )
      );
      // dispatch(setMessage(`Added Successfully`))
      setValues({
        amount: "",
        type: "",
        concept: "",
        category: "",
        date:''
      });
    }
    setLoading(false);
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        border={3}
        borderColor="secondary.main"
        borderRadius={3}
        boxShadow={8}
        maxWidth="50%"
        bgcolor="white"
        p={4}
        m={10}
        color="secondary.contrastText"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box ml={4} component="form">
          <FormGroup>
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
              color="primary"
              required
            >
              <InputLabel htmlFor="outlined-type">Type</InputLabel>
              <Select
                labelId="outlined-type"
                id="outlined-type"
                value={values.type}
                label="Type"
                onChange={handleChange("type")}
              >
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expenses">Expenses</MenuItem>
              </Select>
              {errors.type && (
                <FormHelperText error>{errors.type}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
              color="primary"
              required
            >
              <InputLabel htmlFor="outlined-amount">Amount</InputLabel>
              <OutlinedInput
                error={Boolean(errors.amount)}
                id="outlined-amount"
                value={values.amount}
                onChange={handleChange("amount")}
                label="amount"
              />
              {errors.amount && (
                <FormHelperText error>{errors.amount}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
              color="primary"
              required
            >
              <InputLabel htmlFor="outlined-concept">Concept</InputLabel>
              <OutlinedInput
                error={Boolean(errors.concept)}
                id="outlined-adornment-email"
                type="text"
                value={values.concept}
                onChange={handleChange("concept")}
                label="concept"
              />
              {errors.concept && (
                <FormHelperText error>{errors.concept}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
              color="primary"
              required
            >
              <TextField
                id="date"
                label="Date"
                type="date"
                value={values.date}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange("date")}
              />
            </FormControl>
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
              color="primary"
              required
            >
              <InputLabel htmlFor="outlined-category">Category</InputLabel>
              <Select
                labelId="outlined-category"
                id="outlined-category"
                value={values.category}
                label="Category"
                onChange={handleChange("category")}
              >
                <MenuItem value="food">Food</MenuItem>
                <MenuItem value="clothes">Clothes</MenuItem>
                <MenuItem value="perfumery">Perfumery</MenuItem>
                <MenuItem value="farmacy">Farmacy</MenuItem>
                <MenuItem value="technology">Technology</MenuItem>
                <MenuItem value="bills">Bills</MenuItem>
                <MenuItem value="fee">Fee</MenuItem>
                <MenuItem value="freelancer">Freelancer</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              {errors.category && (
                <FormHelperText error>{errors.category}</FormHelperText>
              )}
            </FormControl>
          </FormGroup>
        </Box>
        <Box m={2} mt={6}>
          <LoadingButton
            loading={loading}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            ADD OPERATION
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
      <Snackbar
        open={!!msg}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <SnackbarAlert
          onClose={handleClose}
          color="primary"
          variant="filled"
          severity="success"
        >
          {msg}
        </SnackbarAlert>
      </Snackbar>
    </Container>
  );
}

export default Add;
