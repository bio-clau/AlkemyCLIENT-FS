import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useAuth} from '../context/auth';
import {getAllOp} from '../redux/actions/a.operations';
import {Container} from '@mui/material'
import Display from '../components/Records/Display';
import Add from '../components/Records/Add';

function Records() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {currentUser} = useAuth();

  useEffect(()=>{
    if(!currentUser){
      navigate('/')
    } else {
      dispatch(getAllOp(currentUser.id, localStorage.getItem('USER_TOKEN')))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <Container sx={{display:'flex', justifyContent:'space-around', padding:4}} maxWidth="xl">
        <Display />
        <Add/>
    </Container>
  )
}

export default Records