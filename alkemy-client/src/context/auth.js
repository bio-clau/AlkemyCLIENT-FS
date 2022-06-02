import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {setToken, deleteToken, getToken} from '../helpers/authHelpers'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadUser(){
            if(!getToken()) {
                setLoading(false);
                return;
            }
            try {
                const {data} = await axios.get('/api/user/whoami',{
                    headers:{
                        Authorization: `Bearer ${getToken()}`
                    }
                })
                setCurrentUser(data.data);
                setLoading(false);
            } catch (err) {
                console.log(err)
            }
        }
        loadUser()
    }, [])

    async function login(email, password) {
        try {
            const {data} = await axios.post('http://localhost:4000/api/auth/login', {
            email,
            password
        });
        setCurrentUser(data.data);
        setToken(data.token)
        return 'profile'
        } catch (err) {
            return 'home'
        }
    }
    async function register (email, firstName, lastName, password) {
        const {data} = await axios.post('/api/auth/register', {
            email,
            firstName,
            lastName,
            password
        });
        setCurrentUser(data.data);
        setToken(data.token);
    }

    function logout() {
        setCurrentUser(null);
        deleteToken()
    }
    const value={
        currentUser,
        login,
        register,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}