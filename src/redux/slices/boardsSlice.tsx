import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StyledInterface } from 'styled-components'
import { RootState } from '../store'

export interface StateType {
  boards: any
  first_player: string
  second_player: string
  timer: string
  turn: string
  isStart: boolean
  status: 'idle' | 'loading' | 'failed'
  winPosition: number[][]
  winner: string
  score: string
  drawGame: boolean
}

const initialState: StateType = {
  boards: Array(9).fill(''),
  first_player: '',
  second_player: '',
  timer: '0',
  turn: '',
  isStart: false,
  status: 'idle',
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
  winner: '',
  score: '0',
  drawGame: false,
}

export function fetchPlayers(name = '') {
  return new Promise<{ data: string }>((resolve) =>
    setTimeout(() => resolve({ data: name }), 500)
  )
}

export function fetchBoards(item = []) {
  return new Promise<{ data: string[][] }>((resolve) =>
    setTimeout(() => resolve({ data: item }), 500)
  )
}

export const getPLayersAsync = createAsyncThunk(
  'players/fetchPlayers',
  async (name: string) => {
    const response = await fetchPlayers(name)
    return response.data
  }
)

export const getBoardsAsync = createAsyncThunk(
  'boards/fetchBoards',
  async (item: any) => {
    const response = await fetchBoards(item)
    return response.data
  }
)

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    getBoards: (state, action: PayloadAction<any>) => {
      state.boards = action?.payload
    },
    getFirstPlayers: (state, action: PayloadAction<string>) => {
      state.first_player = action?.payload
    },
    getSecondPlayer: (state, action: PayloadAction<string>) => {
      state.second_player = action?.payload
    },
    getTimer: (state, action: PayloadAction<string>) => {
      state.timer = action?.payload
    },
    setStartGame: (state) => {
      state.isStart = !state.isStart
    },
    setTurn: (state, action: PayloadAction<string>) => {
      state.turn = action.payload
    },
    getWinner: (state, action: PayloadAction<string>) => {
      state.winner = action.payload
    },
    getScore: (state, action: PayloadAction<string>) => {
      state.score = action.payload
    },
    getDrawGame: (state) => {
      state.drawGame = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPLayersAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getPLayersAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.first_player = action.payload
        state.second_player = action.payload
        state.turn = action.payload
        state.winner = action.payload
        state.score = action.payload
      })
      .addCase(getBoardsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getBoardsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.boards = action.payload
      })
  },
})

export const {
  getFirstPlayers,
  getSecondPlayer,
  getTimer,
  setTurn,
  setStartGame,
  getBoards,
  getWinner,
  getScore,
  getDrawGame,
} = boardsSlice.actions
export const selectBoard = (state: RootState) => state.boards

export default boardsSlice.reducer
