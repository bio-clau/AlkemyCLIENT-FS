import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import {
  Modal,
  Fade,
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Backdrop,
  Select,
  MenuItem
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import {updateOp} from '../../../redux/actions/a.operations';

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

function EditOp({open, handleClose, id, concept, category}) {
    const [values, setValues] = useState({concept:concept, category:category})
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    function handleChange(e, prop){
        setValues ({...values, [prop]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        await dispatch(updateOp(values.concept, values.category, id, localStorage.getItem('USER_TOKEN')))
        setLoading(false)
        handleClose('openEdit')
    }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={()=>handleClose('openEdit')}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
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
            EDIT CONCEPT
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
              <InputLabel htmlFor="outlined-concept">
                Concept
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-firstName"
                value={values.concept}
                onChange={(e)=>handleChange(e, 'concept')}
                label="firstName"
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
                onChange={(e)=>handleChange(e, 'category')}
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
            </FormControl>
          </Box>
          <Box m={2} mt={6}>
            <LoadingButton
              loading={loading}
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              SUBMIT CHANGE
            </LoadingButton>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditOp;
