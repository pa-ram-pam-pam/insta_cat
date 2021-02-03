import { ACCESS_KEY, SECRET_KEY, CALLBACK_URL } from './constants/constants'
import Unsplash from 'unsplash-js'


export const unsplash = new Unsplash({
  accessKey: ACCESS_KEY,
  secret: SECRET_KEY,
  callbackUrl: CALLBACK_URL,

});
