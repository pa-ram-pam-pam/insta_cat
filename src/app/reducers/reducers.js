import {combineReducers} from 'redux';
import errMessage from './errMessage';
import pageY from './pageY';
import authorized from './authorized';
import photoMap from './photoMap';
import fromUrl from './fromURL';
import counter from './counter';

export default combineReducers({photoMap, pageY, fromUrl, counter, errMessage, authorized });
