import React, { useEffect } from 'react'
import {Navigate, useSearchParams} from 'react-router-dom'
import Axios from 'axios';
import Cookies from 'universal-cookie'
const Auth = () => {
  const [searchParams] =useSearchParams();
  
  const cookie = new Cookies()

  useEffect(()=> {
    Axios.post('http://127.0.0.1:8080/api/user/auth', {token:searchParams.get("token")})
    .then((response)=> {
      cookie.set("sessionToken", response.data)
    })
  })

  return (
    <>
    <Navigate to ='/' replace/>
    </>
  )
}

export default Auth