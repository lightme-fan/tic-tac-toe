import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import boardsSlice from './slices/boardsSlice'

export const store = configureStore({
  reducer: {
    boards: boardsSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
