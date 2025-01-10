// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { IApiResponse } from '@/models/interfaces/api'
import { IAreaChart, IBarChart, ICardDataStats } from '@/models/interfaces/dashboard'
import axiosPublic from '../client/public.client'



const dashboardApi = {
  cards():Promise<IApiResponse<ICardDataStats[]>>{
    return axiosPublic.get('Dashboard/Cards')
  },
  areaChart(year:number):Promise<IApiResponse<IAreaChart>>{
    return axiosPublic.get('Dashboard/Revenue/' + year)
  },
  barChart(type:'week' | 'month' | 'year'):Promise<IApiResponse<IBarChart>>{
    return axiosPublic.get('Dashboard/Purchase/' + type)
  },
}

export default dashboardApi
