import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const [isLogedIn, setIsLogedIn] = useState(null);
  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    setIsLogedIn(false)

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.err)
      setIsLogedIn(false)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      setIsLogedIn(true)
      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      //
      

      // update loading state
      setIsLoading(false)
     
    }
  }

  return { login, isLoading, error,isLogedIn }
}