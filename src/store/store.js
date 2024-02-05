import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSlice";
import dbSlice from "./dbSlice";

const store = configureStore({
    reducer : {
        auth: authSlice,
        db : dbSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // for console error : non-serializable value was detected 
    })
})

export default store;