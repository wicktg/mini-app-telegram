import { configureStore } from '@reduxjs/toolkit'
import rankingReducer from './slice/rankingSlice'
import userReducer from './slice/userSlice'

const store = configureStore({
  reducer: {
    ranking: rankingReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
