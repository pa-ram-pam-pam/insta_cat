import actionTypes from '../actionTypes/actionTypes';

const initialState = []

export default function photoMap(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOAD_PHOTOS:
            const newMap = action.payload.map((elem) => {
                return [elem.id, elem]
            })
            const merged = new Map([...state, ...newMap])
            return merged
        case actionTypes.TOGGLE_LIKE_PHOTO:
            const newArr = new Map(state)
            const elem = newArr.get(action.payload)
            if (!elem.liked_by_user) elem.likes = ++elem.likes; else elem.likes = --elem.likes;
            elem.liked_by_user = !elem.liked_by_user;
            return newArr

        default:
            return state
    }
}