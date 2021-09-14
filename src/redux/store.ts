import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import boardsSlice from './slices/boardsSlice'
import playersSlice from './slices/playersSlice'
import winnerSlice from './slices/winnerSlice'

export const store = configureStore({
  reducer: {
    boards: boardsSlice,
    players: playersSlice,
    winner: winnerSlice,
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
