import React, {useState} from "react";
import { ListItem, ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import {formatDate} from '../../helpers/date';
import PaidIcon from '@mui/icons-material/Paid';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import MoreInfo from './modals/MoreInfo';
import DeleteOp from './modals/DeleteOp'
import EditOp from './modals/EditOp'

function Items({ id, date, type, amount, concept, category }) {

    const [modals, setModals] = useState({
      openMI: false,
      openDel: false,
      openEdit:false
    });

    function handleClose(prop) {
        setModals({...modals, [prop]:false});
      }
    function handleOpen(prop){
        setModals({...modals, [prop]: true});
    }

  return (
      <ul>
        <ListItem>
          <ListItemIcon><PaidIcon color={type==='income'?'success':'error'}/></ListItemIcon>
          <ListItemText primary={`Date`} secondary={formatDate(date)} />
          <ListItemText primary={`Amount`} secondary={amount} />
          <ListItemButton onClick={()=>handleOpen('openEdit')}><Edit color='primary'/></ListItemButton>
          <ListItemButton onClick={()=>handleOpen('openDel')}><Delete color='primary'/></ListItemButton>
          <ListItemButton onClick={()=>handleOpen('openMI')}><MoreHoriz color='primary'/></ListItemButton>
        </ListItem>
        <MoreInfo open={modals.openMI} handleClose={handleClose} id={id} date={date} type={type} amount={amount} concept={concept} category={category} />
        <DeleteOp open={modals.openDel} handleClose={handleClose} id={id} />
        <EditOp open={modals.openEdit} handleClose={handleClose} id={id} concept={concept} category={category} />
      </ul>
  );
}

export default Items;
