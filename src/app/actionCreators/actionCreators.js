import actionTypes from '../actionTypes/actionTypes';
import {toJson} from 'unsplash-js';
import {INDEX_OF_LOAD_PHOTOS, NUMBER_OF_UPLOADED_PHOTOS, PHOTO_THEME} from '../constants/constants';
import {unsplash} from '../unsplash';

const {
    LOAD_PHOTOS,
    SET_ERROR,
    CLEAR_ERROR,
    SHOW_BIG_PHOTO,
    TOGGLE_LIKE_PHOTO,
    TOGGLE_AUTHORIZATION,
    FROM_URL
} = actionTypes;

export const toggleLikePhoto = (id) => {
    return function (dispatch, getState) {
        const photo = getState().photoMap.get(id)
        if (photo.liked_by_user) {
            unsplash.photos.unlikePhoto(id)
                .then(toJson)
                .then(() => {
                    dispatch(createActionToggleLikePhoto(id))
                }).catch(function () {
                dispatch(createActionSetError('С анлайком что-то пошло не так'));
            });
        } else {
            unsplash.photos.likePhoto(id)
                .then(toJson)
                .then(() => {
                    dispatch(createActionToggleLikePhoto(id))
                }).catch(function () {
                dispatch(createActionSetError('С лайком что-то пошло не так'));
            });
        }
    };
}

export const loadPhotos = (id) => {
    if (!id) {
        return function (dispatch, getState) {
            const counter = ++getState().counter;
            unsplash.search
                .photos(PHOTO_THEME, counter, NUMBER_OF_UPLOADED_PHOTOS)
                .then(toJson)
                .then((json) => {
                    dispatch(createActionLoadPhotos(json));
                })
                .catch(function () {
                    dispatch(createActionSetError('Фотографии не были загружены'));
                });
        };
    } else {
        return function (dispatch) {
            unsplash.photos.getPhoto(id)
                .then(toJson)
                .then((json) => {
                    const onePhoto = json
                    if (!onePhoto.errors) {
                        unsplash.search
                            .photos(PHOTO_THEME, INDEX_OF_LOAD_PHOTOS, NUMBER_OF_UPLOADED_PHOTOS).catch(function () {
                            // dispatch(createActionSetError('Фотографии не были загружены'));
                        })
                            .then(toJson)
                            .then((json) => {
                                json.results.unshift(onePhoto)
                                dispatch(createActionLoadPhotos(json));
                            })
                    } else {
                        //это на случай если введен в строке браузера имя несуществующей фотографии, например /view/null
                        dispatch(createActionSetError('Фотография не была загружена'));
                    }
                })
                .catch(function () {
                    dispatch(createActionSetError('Фотография не была загружена'));
                });
        };
    }
};

export const createActionShowMeBigPhoto = (pageY) => {
    return {
        type: SHOW_BIG_PHOTO,
        pageY,
    };
};

export const createActionToggleLikePhoto = (id) => {
    return {
        type: TOGGLE_LIKE_PHOTO,
        payload: id,
    };
};

export const createActionToggleAuthorization = (fromUrl) => {
    return {
        type: TOGGLE_AUTHORIZATION,
        payload: fromUrl,
    };
};

export const createActionFromUrl = (fromUrl) => {
    return {
        type: FROM_URL,
        payload: fromUrl,
    };
};
const createActionLoadPhotos = (json) => {
    return {
        type: LOAD_PHOTOS,
        payload: json.results,
    };
};

export const createActionSetError = (err) => {
    return {
        type: SET_ERROR,
        payload: err,
    };
};

export const createActionClearError = (err) => {
    return {
        type: CLEAR_ERROR,
    };
};