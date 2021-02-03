import { createSelector } from 'reselect';

export const getPhotoMap = (state) => state.photoMap;

const getPageY = (state) => state.pageY;

const getAuthorized = (state) => state.authorized;

const getFromUrl = (state) => state.fromUrl;

const getErrMessage = (state) => state.errMessage;


export const getPageYReselected = createSelector (getPageY, pageY => pageY)

export const getMapReselected = createSelector (getPhotoMap, photoMap => photoMap)

export const getAuthorizedReselected = createSelector (getAuthorized, authorized => authorized)

export const getFromUrlReselected = createSelector (getFromUrl, fromUrl => fromUrl)

export const getErrMessageReselected = createSelector (getErrMessage, errMessage => errMessage)