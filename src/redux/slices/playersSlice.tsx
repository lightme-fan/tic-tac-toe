import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface PropType {
  first_player: string
  second_player: string
  buttonLabel: string
  status: 'idle' | 'loading' | 'failed'
}

const initialState: PropType = {
  first_player: '',
  second_player: '',
  buttonLabel: 'Start',
  status: 'idle',
}

export function fetchPlayers(name = '') {
  return new Promise<{ data: string }>((resolve) =>
    setTimeout(() => resolve({ data: name }), 500)
  )
}

export const getPLayersAsync = createAsyncThunk(
  'players/fetchPlayers',
  async (name: string) => {
    const response = await fetchPlayers(name)
    return response.data
  }
)

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    getFirstPlayers: (state, action: PayloadAction<string>) => {
      state.first_player = action?.payload
    },
    getSecondPlayer: (state, action: PayloadAction<string>) => {
      state.second_player = action?.payload
    },
    getButtonLabel: (state, action: PayloadAction<string>) => {
      state.buttonLabel = action.payload
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
        state.buttonLabel = action.payload
      })
  },
})

export const { getFirstPlayers, getSecondPlayer, getButtonLabel } =
  playersSlice.actions
export const selectPlayers = (state: RootState) => state.players

export default playersSlice.reducer
