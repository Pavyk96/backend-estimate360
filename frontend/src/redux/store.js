import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quizReducer";

let reducers = combineReducers({
    quiz: quizReducer
});

let store = configureStore({reducer: reducers});

export default store;