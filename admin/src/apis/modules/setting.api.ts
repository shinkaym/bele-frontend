import { ISetting } from '@/models/interfaces/setting';
import { IApiResponse } from '@/models/interfaces/api';
import axiosPrivate from '../client/private.client';

const settingApi = {
  async fetchSettings(): Promise<IApiResponse<ISetting>> {
    try {
      const response = await axiosPrivate.get<IApiResponse<ISetting>>('Setting');
      return response.data; 
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      throw error; 
    }
  },

  async updateSettings(data: ISetting): Promise<IApiResponse<ISetting>> {
    try {
      const response = await axiosPrivate.put<IApiResponse<ISetting>>('Setting', data);
      return response.data;
    } catch (error) {
      console.error('Failed to update settings:', error);
      throw error;
    }
  },
};

export default settingApi;
