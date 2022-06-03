import {ERROR, MSG} from './ctes';

export function setError(error){
    return ({type: ERROR, payload: error})
}

export function delError() {
    return ({type: ERROR, payload: ''})
}

export function setMessage(msg){
    return ({type: MSG, payload: msg})
}

export function delMessage() {
    return ({type: MSG, payload: ''})
}