import axios from 'axios';
import {formatDate} from '../../helpers/date'
import {GET_ALL_OP, ERROR, DATA_CHART} from './ctes'

export function getAllOp(id, token) {
    return async function(dispatch) {
        try {
            const rta = await axios.get(`/api/op/allOp/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            });
            const data = {
                labels: rta.data.data.map(d=>formatDate(d.createdAt)),
                datasets:[{
                    label: 'Subtotal',
                    data: rta.data.data.map(d=>d.subtotal),
                    backgroundColor:['#9683bc'],
                    borderColor:['#9683bc']
                }]
            }
            dispatch({type:DATA_CHART, payload:data})
            dispatch({type: GET_ALL_OP, payload:rta.data.data})
        } catch (err) {
            dispatch({type: ERROR, payload: err.response.data.msg})
        }
    }
}