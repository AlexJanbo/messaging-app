import * as React from 'react';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress, FormControl, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  
    const dispatch = useDispatch() 
    const navigate = useNavigate()
  
    
    const [ formData, setFormData ] = useState({
      email: '',
      password: ''
    })

    const { email, password } = formData

    const { user, isSuccess, isLoading, message, isError } = useSelector((state) => state.auth)
    console.log(isError)

    useEffect(() => {
      if(isError) {
        console.error(message)
      }
      if(isSuccess || user) {
        navigate('/dashboard')
      }
    })

    const handleInputChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        
        dispatch(LoginUser({ email: email, password: password }))
        dispatch(reset())
    }

    if(isLoading) {
      return <CircularProgress />
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
          <FormControl variant="standard">
              <TextField
              id="email"
              label="Email"
              type="text"
              name="email"
              value={email}
              onChange={handleInputChange}
              error={isError}
              />
              <TextField
              id="password"
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              error={isError}
              helperText={isError ? "Invalid login credentials" : null}
              />
              <Button type="submit" onClick={handleLogin}>
                Login
              </Button>
          </FormControl>
      </Box>
    );
}