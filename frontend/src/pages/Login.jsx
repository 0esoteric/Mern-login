import React, { useState } from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils';
import { Link as RouterLink, useNavigate } from 'react-router-dom';



const Login = () => {
  
const [loginInfo, setLoginInfo ] = useState({
  email: '',
  password: ''
})

const navigate = useNavigate()
const handleChange = (e) => {
  const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

}

//Handle Submit
const handleLogin = async (e) => {
  e.preventDefault()

  //client side validation
  const { email, password} = loginInfo
  if(!email || !password){
    return handleError("Email and Password are required!")
  }

  try {
    const url = "http://localhost:8080/auth/login"
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(loginInfo)
    })
    const result =  await response.json()
    const {success, message,jwtToken, name, error} = result
    if(success)  {
      handleSuccess(message)
      localStorage.setItem('token', jwtToken)
      localStorage.setItem('loggedInUser', name)
      setTimeout( () => {
        navigate('/home')
      }, 1000)
    } else if(error){
      const details = error?.details[0].message
      handleError(details)
    } else if(!success){
        handleError(message)
    }

  } catch (err) {
    handleError(err)
  }
}
  return (
    <>
    <h1>Login</h1>
    <form action="" onSubmit={handleLogin}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="johndoe@email.com"
          value={loginInfo.email}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
          value={loginInfo.password}
        />
      </FormControl>
      <Button 
      type='submit'
      sx={{ mt: 1 /* margin top */ }}>
        Login
      </Button>
      <Typography
        endDecorator={<Link component={RouterLink} to="/signup">SignUp</Link>}
        fontSize="sm"
        sx={{ alignSelf: 'center' }}
      >
        Don't have an account?
      </Typography>
      </form>
      <ToastContainer/>
    </>
  )
}

export default Login
