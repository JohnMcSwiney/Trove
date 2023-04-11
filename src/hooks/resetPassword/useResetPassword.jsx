import { useState } from "react";


export const useResetPassword = ()=> {

    const [passwordError, setPasswordError] = useState(null)
    const [resetPasswordIsloading, setResetPassworIsLoading] = useState(false)

    const resetPassword = async(email, password) => {
        setResetPassworIsLoading(true)
        const response = await fetch(`api/users/new-password`, { 
            method: "PATCH",
            body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
        })
     
        const data = await response.json()

        if(!response.ok){
            setPasswordError(data.error)
        }
        setResetPassworIsLoading(false)
    }

    return {resetPassword, passwordError, setResetPassworIsLoading}
}