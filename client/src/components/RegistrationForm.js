import { Box, Button, CircularProgress, FormControl, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { RegisterUser, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function RegistrationForm() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  const [ formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }) 

  const { username, email, password, confirmPassword } = formValues
  
  useEffect(() => {
    if(isError) {
      console.error(message)
    }
    
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError ] = useState(false)
  const [usernameError, setUsernameError] = useState(false)

  const passwordMatch = () => {
    if(password === confirmPassword) {
      setConfirmPasswordError(false)
      return true
    } else{
      setConfirmPasswordError(true)
      return false
    }
  }

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return false;
    } else {
      setEmailError(false);
      return true;
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
      return true;
    }
  };
  
  const validateUsername = () => {
    if (username.length < 3 || username.length > 25) {
      setUsernameError(true);
      return false;
    } else {
      setUsernameError(false);
      return true;
    }
  };
  
  const handleInputChange = (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  
  const handleRegistration = (e) => {
    e.preventDefault()

    if(passwordMatch() && validateEmail() && validatePassword() && validateUsername()) {

      dispatch(RegisterUser({username, email, password}))
      navigate('/dashboard')
      
    } 
  }
  
  if(isLoading) {
    <CircularProgress />
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
                name="username"
                value={username}
                onChange={handleInputChange}
                error={usernameError}
                helperText={usernameError ? "Please enter a valid username" : null}
              />

              <TextField
                id="email"
                type="text"
                label="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
                error={emailError}
                helperText={emailError ? "Please enter a valid email" : null}
              />

              <TextField
                id="password"
                type="password"
                label="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
                error={passwordError}
                helperText={passwordError ? "Password must contain at least 8 characters with at least one letter and one number" : null}
              />
              <TextField
                id="confirm password"
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
                error={confirmPasswordError}
                helperText={confirmPasswordError ? "Passwords do not match": null}

              />
              <Button type="submit" onClick={handleRegistration}>
                  Register
              </Button>
              <Button href="/">
                  Back to login
              </Button>
          </FormControl>
      </Box>
  )
}

export default RegistrationForm