import actionTypes from '../actionTypes/actionTypes';

const initialState = false
export default function authorized(state = initialState, action) {
    switch (action.type) {
        case actionTypes.TOGGLE_AUTHORIZATION:
            if (state) localStorage.removeItem(`token`)
            return !state

        default:
            return state
    }
}