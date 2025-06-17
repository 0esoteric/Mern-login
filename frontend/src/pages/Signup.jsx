import React, { useState } from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils';
import { Link as RouterLink, useNavigate } from 'react-router-dom';



const Signup = () => {

  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

  }

  //Handle Submit
  const handleSignup = async (e) => {
    e.preventDefault()

    //client side validation
    const { name, email, password } = signupInfo
    if (!name || !email || !password) {
      return handleError("Name, Email and Password are required!")
    }

    try {
      const url = "https://mern-login-backend-rouge.vercel.app/auth/signup"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      })
      const result = await response.json()
      const { success, message, error } = result
      if (success) {
        handleSuccess(message)
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      } else if (error) {
        const details = error?.details[0].message
        handleError(details)
      } else if (!success) {
        handleError(message)
      }

    } catch (err) {
      handleError(err)
    }
  }
  return (
    <>
      <h1>SignUp</h1>
      <form action="" onSubmit={handleSignup}>
        <div className='form-container'>
        <FormControl>
          <FormLabel >Name</FormLabel>
          <Input
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="John Doe"
            value={signupInfo.name}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="johndoe@email.com"
            value={signupInfo.email}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            value={signupInfo.password}
          />
        </FormControl>
        <Button
          type='submit'
          sx={{ mt: 1 /* margin top */ }}>
          Sign Up
        </Button>
        <Typography
          endDecorator={<Link component={RouterLink} to="/login">Log In</Link>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Already have an account?
        </Typography>
        </div>
      </form>
      <ToastContainer />
      
    </>
  )
}

export default Signup
