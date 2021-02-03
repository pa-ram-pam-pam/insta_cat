import actionTypes from '../actionTypes/actionTypes';

const initialState = null
export default function errMessage(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_ERROR:
            return action.payload
        case actionTypes.CLEAR_ERROR:
            return initialState

        default:
            return state
    }
}