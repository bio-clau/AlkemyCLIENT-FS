import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Container, Box, Typography, Button, Stack} from '@mui/material'

function Home() {
  const navigate = useNavigate()
  function handleLogin(){
    navigate('/login')
  }
  function handleRegister(){
    navigate('/register')
  }
  return (
    <Container maxWidth='lg' >
      <Box border={3} borderRadius={3} borderColor='primary.light' mt={8} boxShadow={8} bgcolor='white'>
        <Box>
      <Typography color='primary' variant='h2' pt={4}>
          Welcome to
        </Typography>
        <Typography color='primary' fontWeight={700} variant='h1' pb={4}>
          Appccounting
        </Typography>
        <Typography variant='h4' color='primary' p={4}>
          We help you manage your incomes an expenses
        </Typography>
        <Typography variant='h5' color='primary' pt={8}>
          To start the Appccounting experinece, please register or login!
        </Typography>
        </Box>
        <Stack direction='row' justifyContent='center' spacing={4} p={8}>
        <Button onClick={handleRegister} variant='contained' color='secondary'>
          Register
        </Button>
        <Button onClick={handleLogin} variant='contained' color='secondary'>
          Login
        </Button>
        </Stack>
      </Box>

    </Container>
  )
}

export default Home