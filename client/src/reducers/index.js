import listReducer from "./reducer";
import { combineReducers } from "redux";

// The key of this object will be the name of the store
const rootReducers = combineReducers({ userData: listReducer });

export default rootReducers;