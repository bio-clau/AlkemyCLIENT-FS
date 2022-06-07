import axios from 'axios'
import { UPDATE_USER, MSG, ERROR } from "./ctes";

export function updateUser (firstName, lastName, email, id, image, uploadImg, token) {
    return async function (dispatch) {
        try {
            const rta = await axios.put(`/api/user/updateUser/${id}`,{firstName, lastName, email, image, uploadImg},{
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            })
            dispatch({type: UPDATE_USER, payload: rta.data.data})
            dispatch({type: MSG, payload: rta.data.msg})
        } catch (err) {
            dispatch({type: ERROR, payload: err.response.data.msg})
            dispatch({type: UPDATE_USER, payload: null})
        }
    }
}

export function updatePass ( id, newPass, token) {
    return async function (dispatch) {
        try {
            const rta = await axios.put(`/api/user/updatePass/${id}`,{newPass},{
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            })
            dispatch({type: MSG, payload: rta.data.msg})
        } catch (err) {
            dispatch({type: ERROR, payload: err.response.data.msg})
            dispatch({type: UPDATE_USER, payload: null})
        }
    }
}

export function whoami ( token) {
    return async function (dispatch) {
        try {
            const {data} = await axios.get('http://localhost:4000/api/user/whoami',{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                dispatch({type: UPDATE_USER, payload: data.data})
        } catch (err) {
            // dispatch({type: ERROR, payload: err.response.data.msg})
            localStorage.removeItem('USER_TOKEN')
            dispatch({type: UPDATE_USER, payload: null})
        }
    }
}