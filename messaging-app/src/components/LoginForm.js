import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, Typography } from '@mui/material';

export default function LoginForm() {
  
    const handleLogin = (e) => {
        e.preventDefault()

        console.log("Logging")
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
              id="email"
              label="Email"
              type="text"
              />
              <TextField
              id="password"
              label="Password"
              type="password"
              />
              <Button type="submit" onClick={handleLogin}>
                Login
              </Button>
              <Button href="/register" >
                Sign Up
              </Button>
          </FormControl>
      </Box>
    );
}