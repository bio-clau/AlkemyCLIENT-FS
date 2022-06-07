import {ERROR, MSG, UPDATE_USER, GET_ALL_OP, DATA_CHART, ADD_OP, DEL_OP, UPDATE_OP} from '../actions/ctes'

const initialState = {
    allOp:[],
    dataChart:{},
    user:{},
    error:'',
    msg:''
};
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                error: action.payload
            }
        case MSG:
            return {
                ...state,
                msg: action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            }
        case GET_ALL_OP:
        return {
            ...state,
            allOp: action.payload
        }
        case DATA_CHART:
        return {
            ...state,
            dataChart: action.payload
        }
        case ADD_OP:
        return {
            ...state,
            allOp:  action.payload
        }
        case DEL_OP:
        return {
            ...state,
            allOp: state.allOp.filter(o=> o.id !== action.payload)
        }
        case UPDATE_OP:
        return {
            ...state,
            allOp: action.payload
        }
        default:
            return {
                ...state
            }
    }
}