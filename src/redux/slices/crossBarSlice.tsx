import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface PropType {
  isHorizontal: boolean
  isVertical: boolean
  isDiagonal: boolean
  position: any
  status: 'idle' | 'loading' | 'failed'
}

const initialState: PropType = {
  isHorizontal: false,
  isVertical: false,
  isDiagonal: false,
  position: '0%',
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
    getHorizontal: (state, action: PayloadAction<boolean>) => {
      state.isHorizontal = action?.payload
    },
    getVertical: (state, action: PayloadAction<boolean>) => {
      state.isVertical = action?.payload
    },
    getDiagonal: (state, action: PayloadAction<boolean>) => {
      state.isDiagonal = action?.payload
    },
    getPosition: (state, action: PayloadAction<any>) => {
      state.position = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCrossBarAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCrossBarAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.isHorizontal = action.payload
        state.isVertical = action.payload
        state.isDiagonal = action.payload
        state.position = action.payload
      })
  },
})

export const { getHorizontal, getVertical, getDiagonal, getPosition } =
  crossBarSlice.actions
export const selectCrossBars = (state: RootState) => state.crossBars

export default crossBarSlice.reducer
