import { configureStore } from "@reduxjs/toolkit";
import  authSlice from './autSlice'

const Store = configureStore({
    reducer:{
        auth: authSlice,
    }
    
})

export default Store