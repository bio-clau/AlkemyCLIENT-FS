import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/auth';

export default function NotUser ({children}) {
    
    const { currentUser } = useAuth();
    if(currentUser?.id){
        return <Navigate to='/profile' replace />;
    }

    return children;
}