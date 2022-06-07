import React from "react";
import {useDispatch} from 'react-redux'
import { Modal, Fade, Box, Typography, Button, Backdrop, Stack } from "@mui/material";
import {delOp} from '../../../redux/actions/a.operations'
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

function DeleteOp({ open, handleClose, id }) {
    const dispatch = useDispatch();
    function handleDelete(){
        dispatch(delOp(id, localStorage.getItem('USER_TOKEN')))
        handleClose("openDel")
    }
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => handleClose("openDel")}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          border={2}
          borderColor="secondary.main"
          borderRadius={3}
          sx={style}
        >
          <Box component="form" display="flex" alignItems="center">
            <Typography p={1} color="primary" fontWeight="bold" variant='h5'>
              Are you sure?
            </Typography>
          </Box>
          <Box m={2} mt={6}>
            <Stack direction='row' justifyContent='center' spacing={4} >
              <Button
                onClick={() => handleDelete()}
                variant="contained"
                color="primary"
              >
                DELETE
              </Button>
              <Button
                onClick={() => handleClose("openDel")}
                variant="contained"
                color="primary"
              >
                CLOSE
              </Button>
            </Stack>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default DeleteOp;
