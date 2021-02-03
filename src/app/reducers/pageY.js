import actionTypes from '../actionTypes/actionTypes';
const initialState = 0
export default function pageY(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SHOW_BIG_PHOTO:
            return action.pageY

        default:
            return state
    }
}