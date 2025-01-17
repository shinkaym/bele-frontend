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

  async updateSettings(data: ISetting | FormData): Promise<IApiResponse<ISetting>> {
    try {
      const config = {
        headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
      };
      const response = await axiosPrivate.put<IApiResponse<ISetting>>('Setting', data, config);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error('Server error:', error.response.data);
      } else if (error.request) {
        console.error('Network error:', error.message);
      } else {
        console.error('Unexpected error:', error.message);
      }
      throw error;
    }
  },
  
};

export default settingApi;
