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
        }
    }
}