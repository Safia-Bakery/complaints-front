import {combineReducers} from "@reduxjs/toolkit";
import auth from "./auth";
import selects from "./selects";
import version from "./versionCheck";
import getBranch from "./tg-get-branch";

export default combineReducers({
    auth,
    selects,
    version,
    getBranch
});
