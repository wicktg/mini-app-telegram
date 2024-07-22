import { configureStore } from '@reduxjs/toolkit'
import rankingReducer from './slice/rankingSlice'

const store = configureStore({
  reducer: {
    ranking: rankingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
