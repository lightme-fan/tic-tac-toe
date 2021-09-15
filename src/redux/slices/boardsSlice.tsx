import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface StateType {
  boards: any
  timer: string
  turn: string
  isStart: boolean
  status: 'idle' | 'loading' | 'failed'
  drawGame: boolean
}

const initialState: StateType = {
  boards: Array(9).fill(''),
  timer: '5',
  turn: '',
  isStart: false,
  status: 'idle',
  drawGame: false,
}

export function fetchPropGame(name = '') {
  return new Promise<{ data: string }>((resolve) =>
    setTimeout(() => resolve({ data: name }), 500)
  )
}

export function fetchBoards(item = []) {
  return new Promise<{ data: string[][] }>((resolve) =>
    setTimeout(() => resolve({ data: item }), 500)
  )
}

export const getPropAsync = createAsyncThunk(
  'players/fetchPlayers',
  async (name: string) => {
    const response = await fetchPropGame(name)
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
    getTimer: (state, action: PayloadAction<string>) => {
      state.timer = action?.payload
    },
    setStartGame: (state) => {
      state.isStart = !state.isStart
    },
    setTurn: (state, action: PayloadAction<string>) => {
      state.turn = action.payload
    },
    getDrawGame: (state) => {
      state.drawGame = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPropAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getPropAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.turn = action.payload
        state.drawGame = true
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

export const { getTimer, setTurn, setStartGame, getBoards, getDrawGame } =
  boardsSlice.actions
export const selectBoard = (state: RootState) => state.boards

export default boardsSlice.reducer
