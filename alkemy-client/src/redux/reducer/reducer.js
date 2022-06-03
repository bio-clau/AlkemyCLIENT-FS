import {ERROR} from '../actions/ctes'

const initialState = {
    allOp:[],
    error:''
};
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                error: action.payload
            }

    
        default:
            return {
                ...state
            }
    }
}