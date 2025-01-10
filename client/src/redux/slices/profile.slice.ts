import { EMenuProfileItemId } from '@/models/enum'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ProfileState {
  activeComponent: EMenuProfileItemId
}

const initialState: ProfileState = {
  activeComponent: EMenuProfileItemId.AccountInfo
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setActiveComponent: (state, action: PayloadAction<ProfileState['activeComponent']>) => {
      state.activeComponent = action.payload
    }
  }
})

export const { setActiveComponent } = profileSlice.actions
export default profileSlice.reducer
