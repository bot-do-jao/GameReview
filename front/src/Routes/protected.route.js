import React, {useState, useEffect} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import api from '../services/api';

export const ProtectedRoute = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            
        const config = {
            headers: {
            Authorization: localStorage.getItem('token')
            }
        };

        async function handleUser(user_id){

            // Waits for the api to answer if user is logged in
            await api.get(`/auth/${user_id}`, config).then(res => {
            setLoggedIn(true);
            setLoading(false);
            }).catch(error => {
            setLoading(false)
            // Token or user is invalid
            })
        }

        if(localStorage.getItem('user') && !loggedIn) // If user exists in Browser but is not logged in it checks with the server
            {
            let user_id = localStorage.getItem('user');
            handleUser(user_id);
            }

    },[loggedIn]);

        // Only allows route to be accessed if user is logged in, else redirects user to Home page
  return loading ? (<div></div>)
            :
        (loggedIn ? <Outlet/> : <Navigate to="/" />)
}
