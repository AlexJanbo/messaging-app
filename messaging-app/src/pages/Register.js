import { Container, Paper } from '@mui/material'
import React from 'react'
import RegisterForm from '../components/RegisterForm'

function Register() {
  return (
        <>
            <Paper square sx={{ backgroundColor: "#f9f8fa", height: "100vh"}} >
                <Container >
                    <RegisterForm />
                </Container>
            </Paper>
        </>
    )
}   

export default Register