import {ERROR} from './ctes';

export function setError(error){
    return ({type: ERROR, payload: error})
}

export function delError() {
    return ({type: ERROR, payload: ''})
}