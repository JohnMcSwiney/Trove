import {useAuthContext} from './useAuthContext';
import React from 'react';
export const useSignup = ()=> {
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(null);

    const {dispatch} = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);


        const res = await fetch('api/user/signup', {
            method:'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({email, password})
        })

        const json = await res.json();

        if(!res.ok){
            setIsLoading(false);
            setError(json.error);
        }

        if(res.ok){
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            //update authcontext
            dispatch({type:'LOGIN', payload:json})
            setIsLoading(false);
        }
    }
    return {signup,isLoading,error};
}