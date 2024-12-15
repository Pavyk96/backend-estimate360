import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quizReducer";
import { thunk } from "redux-thunk";
import employeesReducer from "./employeesReducer";
import tokenReducer from "./tokenReducer";

let reducers = combineReducers({
    quiz: quizReducer,
    employee: employeesReducer,
    token: tokenReducer
});

let store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;