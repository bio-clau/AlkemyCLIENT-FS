import React from "react";
import { Modal, Box, Backdrop, Fade, Button, Typography } from "@mui/material";
import {formatDate} from '../../../helpers/date'

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
function MoreInfo({ open, handleClose, id, date, type, amount, concept, category }) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={()=>handleClose('openMI')}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          border={2}
          borderColor="secondary.main"
          borderRadius={3}
          sx={style}
        >
          <Box
            component="form"
            display="flex"
            alignItems="center"
          >
              <Typography p={1} color='primary' fontWeight='bold'>Date: </Typography>
              <Typography>{` ${formatDate(date)}`}</Typography>
          </Box>
          <Box
            component="form"
            display="flex"
            alignItems="center"
          >
              <Typography p={1} color='primary' fontWeight='bold'>Type of operation: </Typography>
              <Typography>{` ${type.toUpperCase()}`}</Typography>
          </Box>
          <Box
            component="form"
            display="flex"
            alignItems="center"
          >
              <Typography p={1} color='primary' fontWeight='bold'>Amount: </Typography>
              <Typography>{` $${amount}`}</Typography>
          </Box>
          <Box
            component="form"
            display="flex"
            alignItems="center"
          >
              <Typography p={1} color='primary' fontWeight='bold'>Concept: </Typography>
              <Typography>{` ${concept}`}</Typography>
          </Box>
          <Box
            component="form"
            display="flex"
            alignItems="center"
          >
              <Typography p={1} color='primary' fontWeight='bold'>Category: </Typography>
              <Typography>{` ${category.toUpperCase()}`}</Typography>
          </Box>
          <Box m={2} mt={6}>
            <Button onClick={()=>handleClose('openMI')} variant="contained" color="primary">
              CLOSE
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default MoreInfo;
