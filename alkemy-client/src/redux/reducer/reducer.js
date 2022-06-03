import {ERROR, MSG, UPDATE_USER, GET_ALL_OP, DATA_CHART} from '../actions/ctes'

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
        default:
            return {
                ...state
            }
    }
}