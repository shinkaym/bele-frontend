// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { ISetting } from '@/models/interfaces/setting'
import axiosPublic from '../client/public.client'


const settingApi = {
  all():Promise<ISetting>{
    return axiosPublic.get('Setting')
  }
}

export default settingApi
