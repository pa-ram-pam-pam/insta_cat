import actionTypes from '../actionTypes/actionTypes';

const initialState = ``
export default function fromUrl(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FROM_URL:
            return action.payload
        default:
            return state
    }
}