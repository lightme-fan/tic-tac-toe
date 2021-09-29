import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface PropType {
  winner: string
  winPosition: number[][]
  firstPlayerScore: number
  secondPlayerScore: number
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
  firstPlayerScore: 0,
  secondPlayerScore: 0,
  status: 'idle',
}
// fetch ? do not understand why we need those delays
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

export function fetchScore(score = 0) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: score }), 500)
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

export const getScore = createAsyncThunk(
  'score/fetchScore',
  async (score: number) => {
    const response = await fetchScore(score)
    return response.data
  }
)

const winnerSlice = createSlice({
  name: 'winner',
  initialState,
  reducers: {
    // those should be rather 'set' then 'get'
    getWinner: (state, action: PayloadAction<string>) => {
      state.winner = action?.payload
    },
    getWinPosition: (state, action: PayloadAction<number[][]>) => {
      state.winPosition = action?.payload
    },
    getFirstPlayerScore: (state, action: PayloadAction<number>) => {
      state.firstPlayerScore = action?.payload
    },
    getSecondPlayerScore: (state, action: PayloadAction<number>) => {
      state.secondPlayerScore = action?.payload
    },
  },
  // dont think this is necessary all actions could be synchronous
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
      .addCase(getScore.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getScore.fulfilled, (state, action) => {
        state.status = 'idle'
        state.firstPlayerScore = action?.payload
        state.secondPlayerScore = action?.payload
      })
  },
})

export const {
  getWinner,
  getWinPosition,
  getFirstPlayerScore,
  getSecondPlayerScore,
} = winnerSlice.actions
export const selectWinner = (state: RootState) => state.winner

export default winnerSlice.reducer
