import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils'
import { ToastContainer } from 'react-toastify'
import Button from '@mui/joy/Button';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('')
  const navigate = useNavigate()
  const [products, setProducts] = useState('')
  useEffect(()=> {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  const handleLogout = ()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('loggedInUser')
      handleSuccess('User LoggedOut')
      setTimeout(()=> {
        navigate('/login')
      }, 1000)
  }
  const fetchProducts = async () => {
    try {
      const url = "https://mern-login-api-eight.vercel.app/products"
      const headers = {
        headers: {
          'Authorization' : localStorage.getItem('token')
        }
      }
      const response = await fetch(url, headers)
      const result = await response.json()
      setProducts(result)
    } catch (err) {
      handleError(err) 
    }
  }
  useEffect(()=>{
    fetchProducts()
  },[])
  return (
    <>
      <h1>Welcome {loggedInUser}</h1>
      <Button 
      onClick={handleLogout}
      sx={{ mt: 1 /* margin top */ }}>
        Logout
      </Button>
      <div>{
        products && products?.map((item, index) => (
        <ul key={index}>
          <span>{item.name} : {item.price}</span>
        </ul>
      ))
      }</div>
      <ToastContainer/>

    </>
  )
}

export default Home
