import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface PropType {
  isHorizontal: boolean
  isVertical: boolean
  isDiagonal: boolean
  status: 'idle' | 'loading' | 'failed'
}

const initialState: PropType = {
  isHorizontal: false,
  isVertical: false,
  isDiagonal: false,
  status: 'idle',
}

export function fetchCrossBar(name = false) {
  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: name }), 500)
  )
}

export const getCrossBarAsync = createAsyncThunk(
  'crossBar/fetchCrossBar',
  async (name: boolean) => {
    const response = await fetchCrossBar(name)
    return response.data
  }
)

const crossBarSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    getHorizontal: (state) => {
      state.isHorizontal = !state.isHorizontal
    },
    getVertical: (state) => {
      state.isVertical = !state.isVertical
    },
    getDiagonal: (state) => {
      state.isDiagonal = !state.isDiagonal
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCrossBarAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCrossBarAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.isHorizontal = !state.isHorizontal
        state.isVertical = !state.isVertical
        state.isDiagonal = !state.isDiagonal
      })
  },
})

export const { getHorizontal, getVertical, getDiagonal } = crossBarSlice.actions
export const selectCrossBars = (state: RootState) => state.crossBars

export default crossBarSlice.reducer
