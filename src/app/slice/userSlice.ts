import { User } from '../../interfaces/users.type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../config/axios.config'
import { RootState } from '../store'

interface UserState {
  user: User | null
  users: User[] | null
  address: string | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
  users: null,
  address: null,
  loading: false,
  error: null,
}

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId: number) => {
    const response = await axios.get(`/user/id/${userId}`)
    return response.data
  },
)

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await axios.get('/user')
  return response.data
})

export const decodeAddress = createAsyncThunk(
  'address',
  async ({ hex }: { hex: string }) => {
    const response = await axios.post('/telegram/wallet', { hex })
    return response.data
  },
)

export const updateUserWallet = createAsyncThunk(
  'user/updateWallet',
  async ({
    telegramId,
    addressWallet,
  }: {
    telegramId: number
    addressWallet: string
  }) => {
    const response = await axios.post('/user/wallet', {
      telegramId,
      addressWallet,
    })
    return response.data
  },
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error fetching user'
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload.users
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error fetching users'
      })
      .addCase(updateUserWallet.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUserWallet.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(updateUserWallet.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error updating wallet'
      })

      .addCase(decodeAddress.fulfilled, (state, action) => {
        state.loading = false
        state.address = action.payload
      })
  },
})

export const selectUserById = (state: RootState) => state.user.user
export const selectUsers = (state: RootState) => state.user.users
export const selectAddress = (state: RootState) => state.user.address

export default userSlice.reducer
