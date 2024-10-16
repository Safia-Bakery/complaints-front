import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth';
import selects from './selects';
import version from './versionCheck';
import getBranch from './tg-get-titles.ts';
import images from './images';

export default combineReducers({
  auth,
  selects,
  version,
  getBranch,
  images,
});
