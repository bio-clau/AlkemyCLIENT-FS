import axios from 'axios';
import {dateMini} from '../../helpers/date'
import {GET_ALL_OP, ERROR, DATA_CHART, MSG, ADD_OP, DEL_OP, UPDATE_OP, UPDATE_USER} from './ctes'

export function getAllOp(id, token) {
    return async function(dispatch) {
        try {
            const rta = await axios.get(`/api/op/allOp/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            });
            const newData = rta.data.data.filter((o,i)=> i<10)
            const data = {
                labels: newData.map(d=>dateMini(d.createdAt)),
                datasets:[{
                    label: 'TimeLine',
                    data: newData.map(d=>d.subtotal),
                    backgroundColor:['#9683bc'],
                    borderColor:['#9683bc']
                }]
            }
            dispatch({type:DATA_CHART, payload:data})
            dispatch({type: GET_ALL_OP, payload:rta.data.data})
        } catch (err) {
            dispatch({type: ERROR, payload: err.response.data.msg})
            dispatch({type: UPDATE_USER, payload: null})

        }
    }
}

export function addOp(type, amount, concept, date, category, userId, token) {
    return async function(dispatch) {
        try {
            const rta = await axios.post(`/api/op/addOp/${userId}`,{
                typeOp:type,
                amount,
                concept,
                date,
                category
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            })
            dispatch({type:MSG, payload: rta.data.msg})
            dispatch({type:ADD_OP, payload:rta.data.data})
            
        } catch (err) {
            dispatch({type: ERROR, payload: err.response.data.msg})
            dispatch({type: UPDATE_USER, payload: null})
        }
    }
}

export function delOp(opId, token) {
    return async function(dispatch) {
        try {
            const rta = await axios.delete(`/api/op/deleteOp/${opId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            })
            dispatch({type:MSG, payload: rta.data.msg})
            dispatch({type:DEL_OP, payload:opId})
            
        } catch (err) {
            dispatch({type: ERROR, payload: err.response.data.msg})
            dispatch({type: UPDATE_USER, payload: null})
        }
    }
}

export function updateOp(concept, category, opId, token) {
    return async function(dispatch) {
        try {
            const rta = await axios.put(`/api/op/updateOp/${opId}`,{
                concept,
                category
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            })
            dispatch({type:MSG, payload: rta.data.msg})
            dispatch({type:UPDATE_OP, payload:rta.data.data})
            
        } catch (err) {
            dispatch({type: ERROR, payload: err.response.data.msg})
            dispatch({type: UPDATE_USER, payload: null})
        }
    }
}