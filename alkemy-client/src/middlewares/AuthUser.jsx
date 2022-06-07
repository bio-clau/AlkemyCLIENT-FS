import React from 'react';
import {useDispatch} from 'react-redux';
import {setError} from '../redux/actions/a.global';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/auth';

export default function AuthUser ({children}) {
    const dispatch = useDispatch()
    
    const { currentUser } = useAuth();
    if(!currentUser?.id){
        dispatch(setError('Must Login'))
        return <Navigate to='/' replace />;
    }

    return children;
}