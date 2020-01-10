import {combineReducers} from "redux";
import {postReducer,filterReducer} from "./reducers"

export default combineReducers({
    postReducer,
    filterReducer
});