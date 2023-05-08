import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import React from 'react'

function RegisterForm() {

  const handleRegister = (e) => {
    e.preventDefault()
  }

  return (
    
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
          <Typography variant="h2" color="#323232">
              Messaging App
          </Typography>
          <FormControl variant="standard">
              <TextField
              id="username"
              type="text"
              label="Username"
              />

              <TextField
              id="email"
              type="text"
              label="Email"
              />

              <TextField
              id="password"
              type="password"
              label="Password"
              />
              <Button type="submit" onClick={handleRegister}>
                  Register
              </Button>
              <Button href="/">
                  Back to login
              </Button>
          </FormControl>
      </Box>
  )
}

export default RegisterForm