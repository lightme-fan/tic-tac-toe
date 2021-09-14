import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface PropType {
  winner: string
  winPosition: number[][]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: PropType = {
  winner: '',
  winPosition: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  status: 'idle',
}

export function fetchWinner(name = '') {
  return new Promise<{ data: string }>((resolve) =>
    setTimeout(() => resolve({ data: name }), 500)
  )
}

export function fetchWinPosition(item = []) {
  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: item }), 500)
  )
}

export const getWinnerAsync = createAsyncThunk(
  'winner/fetchWinner',
  async (name: string) => {
    const response = await fetchWinner(name)
    return response.data
  }
)

export const getWinPositionAsync = createAsyncThunk(
  'winner/fetchWinPosition',
  async (name: any) => {
    const response = await fetchWinPosition(name)
    return response.data
  }
)

const winnerSlice = createSlice({
  name: 'winner',
  initialState,
  reducers: {
    getWinner: (state, action: PayloadAction<string>) => {
      state.winner = action?.payload
    },
    getWinPosition: (state, action: PayloadAction<number[][]>) => {
      state.winPosition = action?.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWinnerAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getWinnerAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.winner = action.payload
      })
      .addCase(getWinPositionAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getWinPositionAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.winPosition = action.payload
      })
  },
})

export const { getWinner, getWinPosition } = winnerSlice.actions
export const selectWinner = (state: RootState) => state.winner

export default winnerSlice.reducer
