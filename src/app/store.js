import { configureStore } from '@reduxjs/toolkit'
import { FormReducer } from '../features'
export const store = configureStore({
  reducer: {
    form: FormReducer,
  },
})
