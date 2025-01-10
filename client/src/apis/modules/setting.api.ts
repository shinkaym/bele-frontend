// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { IApiResponse, ISettingResponse } from '@/models/interfaces'
import axiosPublic from '../client/public.client'

const settingApi = {
  all(): Promise<IApiResponse<{ setting: ISettingResponse }>> {
    return axiosPublic.get('Setting')
  }
}

export default settingApi
