import { User } from '../../interfaces/users.type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../config/axios.config'
import { RootState } from '../store'

interface UserState {
  user: User | null
  users: User[] | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
  users: null,
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
  },
})

export const selectUserById = (state: RootState) => state.user.user
export const selectUsers = (state: RootState) => state.user.users

export default userSlice.reducer
