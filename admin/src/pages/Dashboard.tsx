import dashboardApi from '@/apis/modules/dashboard'
import CardDataStats from '@/components/common/CardDataStats'
import AreaChart from '@/components/common/Charts/AreaChart'
import BarChart from '@/components/common/Charts/BarChart'
import { cardsDataIcon } from '@/models/data/dashboard'
import { IApiResponse } from '@/models/interfaces/api'
import { IAreaChart, IBarChart, ICardDataStats } from '@/models/interfaces/dashboard'
import React, { useEffect, useState } from 'react'

const Dashboard: React.FC = () => {
  const [cards, setCards] = useState<ICardDataStats[]>([])
  const [areaChart, setAreaChart] = useState<IAreaChart>(Object)
  const [barChart, setBarChart] = useState<IBarChart>(Object)
  const [type, setType] = useState<'week' | 'month' | 'year'>('week')
  const [year, setYear] = useState<number>(new Date().getFullYear())


  const handleClickBarChart = (value: 'week' | 'month' | 'year') => {
    // console.log(value);
    setType(value)
  }

  const handleClickAreaChart = (value: string) => {
    setYear(Number(value))
  }

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res: IApiResponse<ICardDataStats[]> = await dashboardApi.cards()
        if (res.status === 200 && res.data) {
          setCards(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchApi()
  }, [])

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res: IApiResponse<IAreaChart> = await dashboardApi.areaChart(year)
        if (res.status === 200 && res.data) {
          console.log('AreaChart',res.data);
          setAreaChart(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchApi()
  }, [year])

  
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res: IApiResponse<IBarChart> = await dashboardApi.barChart(type)
        if (res.status === 200 && res.data) {
          console.log('Barchart',res.data);
          setBarChart(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchApi()
  }, [type])

  return (
    <>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        {cards.length > 0 &&
          cards.map((card, i) => (
            <CardDataStats key={i} title={card.title} total={card.total.toString()}>
              {cardsDataIcon[i].icon}
            </CardDataStats>
          ))}
      </div>

      <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
        {Object.keys(areaChart).length > 0 && <AreaChart data={areaChart} onClick={handleClickAreaChart} />}
        {Object.keys(barChart).length > 0 &&  <BarChart data={barChart} onClick={handleClickBarChart}/>}
      </div>
    </>
  )
}

export default Dashboard
