import {configureStore} from '@reduxjs/toolkit'
import CategoryReducer from './CategorySlice'
export  const store = configureStore({
    reducer:CategoryReducer
})