import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quizReducer";
import { thunk } from "redux-thunk";
import employeesReducer from "./employeesReducer";

let reducers = combineReducers({
    quiz: quizReducer,
    employee: employeesReducer
});

let store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;