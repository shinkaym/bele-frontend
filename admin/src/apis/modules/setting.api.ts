// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { ISetting } from '@/models/interfaces/setting'
import axiosPrivate from '../client/private.client'


const settingApi = {
  all():Promise<ISetting>{
    return axiosPrivate.get('Setting')
  }
}

export default settingApi
