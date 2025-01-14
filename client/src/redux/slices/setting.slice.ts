import settingApi from '@/apis/modules/setting.api'
import { IApiResponse, ISetting, ISettingResponse } from '@/models/interfaces'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Trạng thái khởi tạo
const initialState: {
  loading: boolean
  error: string | null
  data: ISetting | null
} = {
  loading: false,
  error: null,
  data: null
}

// Tạo async thunk để gọi API
export const fetchSettings = createAsyncThunk('settings/fetchSettings', async (_, { rejectWithValue }) => {
  try {
    const res: IApiResponse<{ setting: ISettingResponse }> = await settingApi.all()
    if (res.status === 200 && res.data) {
      const data = res.data.setting
      return {
        banner: {
          mainBanner: data.mainBanner,
          subBanner1: data.subBanner1,
          subBanner2: data.subBanner2
        },
        slideShow: {
          slideshowBanner1: data.slideshowBanner1,
          slideshowBanner2: data.slideshowBanner2,
          slideshowBanner3: data.slideshowBanner3
        },
        logo: {
          mainLogo: data.mainLogo,
          sloganLogo: data.sloganLogo
        },
        service: {
          serviceTitle1: data.serviceTitle1,
          serviceInfo1: data.serviceInfo1,
          serviceTitle2: data.serviceTitle2,
          serviceInfo2: data.serviceInfo2,
          serviceTitle3: data.serviceTitle3,
          serviceInfo3: data.serviceInfo3,
          serviceTitle4: data.serviceTitle4,
          serviceInfo4: data.serviceInfo4
        },
        address: {
          branchName1: data.branchName1,
          branchAddress1: data.branchAddress1,
          branchName2: data.branchName2,
          branchAddress2: data.branchAddress2
        },
        info: {
          slogan: data.slogan,
          hotline: data.hotline,
          email: data.email,
          description: data.description
        },
        social: {
          facebookLink: data.facebookLink,
          instagramLink: data.instagramLink,
          youtubeLink: data.youtubeLink
        }
      }
    } else {
      return rejectWithValue('Không tìm thấy dữ liệu settings.')
    }
  } catch (error) {
    console.error('Lỗi khi gọi API settings:', error)
    return rejectWithValue('Lỗi khi gọi API.')
  }
})

// Tạo slice
const settingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSettings.fulfilled, (state, action: PayloadAction<ISetting>) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export default settingSlice.reducer
