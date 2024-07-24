import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Referral } from '../../interfaces/referrals.type'
import axios from '../../config/axios.config'
import { RootState } from '../store'

interface FriendState {
  friends: Referral[] | null
  totalFriend: number
  loading: boolean
  error: string | null
}

const initialState: FriendState = {
  friends: null,
  totalFriend: 0,
  loading: false,
  error: null,
}

export const fetchFriendById = createAsyncThunk(
  'friend/fetchFriendById',
  async (userId: number) => {
    const response = await axios.get(`/referral/id/${userId}`)
    return response.data
  },
)

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFriendById.pending, (state) => {
        ;(state.loading = true), (state.error = null)
      })
      .addCase(fetchFriendById.fulfilled, (state, action) => {
        state.loading = false
        state.friends = action.payload
        state.totalFriend = action.payload.length
      })
      .addCase(fetchFriendById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error fetching friends'
      })
  },
})

export const selectFriends = (state: RootState) => state.friend.friends
export const selectCountFriend = (state: RootState) => state.friend.totalFriend
export default friendSlice.reducer
