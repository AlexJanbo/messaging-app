import * as React from 'react';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  
    const dispatch = useDispatch() 
    const navigate = useNavigate()
  
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    
    const [ formData, setFormData ] = useState({
      email: '',
      password: ''
    })

    const { email, password } = formData

    useEffect(() => {
      if(isError) {
        console.error(message)
      }

      dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const handleInputChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    }

    const handleLogin = (e) => {
        e.preventDefault()

        dispatch(LoginUser({ email, password }))
        if(isSuccess || user) {
          navigate('/dashboard')
        }
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
              name="email"
              value={email}
              onChange={handleInputChange}
              />
              <TextField
              id="password"
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
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