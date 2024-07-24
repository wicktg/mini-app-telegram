import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/axios.config'
import { Ranking } from '../../interfaces/ranks.type'
import { RootState } from '../store'

interface RankingState {
  ranking: Ranking | null
  rankings: Ranking[] | null
  totalHolder: number
  loading: boolean
  error: string | null
}

const initialState: RankingState = {
  ranking: null,
  rankings: null,
  totalHolder: 0,
  loading: false,
  error: null,
}

export const fetchRankingById = createAsyncThunk(
  'ranking/fetchRankingById',
  async (userId: number) => {
    const response = await axios.get(`/ranking/id/${userId}`)
    return response.data
  },
)

export const fetchRankings = createAsyncThunk(
  'ranking/fetchRankings',
  async () => {
    const response = await axios.get('/ranking')
    return response.data
  },
)

export const rankingSlice = createSlice({
  name: 'ranking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRankingById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRankingById.fulfilled, (state, action) => {
        state.loading = false
        state.ranking = action.payload
      })
      .addCase(fetchRankingById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error fetching ranking'
      })
      .addCase(fetchRankings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRankings.fulfilled, (state, action) => {
        state.loading = false
        state.rankings = action.payload.ranks
        state.totalHolder = action.payload.totalHolder
      })
      .addCase(fetchRankings.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error fetching rankings'
      })
  },
})

export const selectRankIncludeUser = (state: RootState) => state.ranking
export const selectUserRank = (state: RootState) => state.ranking.ranking

export default rankingSlice.reducer
