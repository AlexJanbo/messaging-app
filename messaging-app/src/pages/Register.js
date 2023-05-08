import { Container, Paper } from '@mui/material'
import React from 'react'
import RegistrationForm from '../components/RegistrationForm'

function Register() {
  return (
        <>
            <Paper square sx={{ backgroundColor: "#f9f8fa", height: "100vh"}} >
                <Container >
                    <RegistrationForm />
                </Container>
            </Paper>
        </>
    )
}   

export default Register