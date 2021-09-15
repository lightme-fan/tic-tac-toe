import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import boardsSlice from './slices/boardsSlice'
import crossBarSlice from './slices/crossBarSlice'
import playersSlice from './slices/playersSlice'
import winnerSlice from './slices/winnerSlice'

export const store = configureStore({
  reducer: {
    boards: boardsSlice,
    players: playersSlice,
    winner: winnerSlice,
    crossBars: crossBarSlice,
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
