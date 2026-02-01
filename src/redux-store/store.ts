import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'


export const store = configureStore({
  reducer: rootReducer,
})

// Types for TypeScript
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

