import React, {useContext, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
import {UPDATE_USER} from '../redux/actions/ctes'
import {setToken, deleteToken, getToken} from '../helpers/authHelpers'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({children}) {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user)
    // const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadUser(){
            if(!getToken()) {
                setLoading(false);
                return;
            }
            try {
                const {data} = await axios.get('http://localhost:4000/api/user/whoami',{
                    headers:{
                        Authorization: `Bearer ${getToken()}`
                    }
                })
                dispatch({type: UPDATE_USER, payload: data.data})
                // setCurrentUser(data.data);
                setLoading(false);
            } catch (err) {
                deleteToken()
            }
        }
        loadUser()
    }, [dispatch])

    async function login(email, password) {
        try {
            const {data} = await axios.post('http://localhost:4000/api/auth/login', {
            email,
            password
        });
        dispatch({type: UPDATE_USER, payload: data.data})
        // setCurrentUser(data.data);
        setToken(data.token)
        return true
        } catch (err) {
            return false
        }
    }
    async function register (email, firstName, lastName, password, image) {
        try {
            const {data} = await axios.post('/api/auth/register', {
                email,
                firstName,
                lastName,
                password,
                image
            });
            dispatch({type: UPDATE_USER, payload: data.data})
            // setCurrentUser(data.data);
            setToken(data.token);
            return true
        } catch (err) {
            return false
        }
    }



    function logout() {
        dispatch({type: UPDATE_USER, payload: null})
        // setCurrentUser(null);
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