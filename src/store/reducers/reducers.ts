import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import selects from "./selects";
import version from "./versionCheck";

export default combineReducers({
  auth,
  selects,
  version,
});
