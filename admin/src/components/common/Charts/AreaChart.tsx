import { ApexOptions } from 'apexcharts'
import React, { useState, useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left'
  },
  colors: ['#3C50E0'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1
    },
    toolbar: {
      show: false
    }
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300
        }
      }
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350
        }
      }
    }
  ],
  stroke: {
    width: [2],
    curve: 'straight'
  },
  grid: {
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1
  },
  xaxis: {
    type: 'category',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  }
}

interface AreaChartProps {
  data: {
    year: number
    name: string
    figures: number[]
  },
  onClick:(value:string) => void
}

const AreaChart: React.FC<AreaChartProps> = ({ data,onClick }) => {
  const [inputYear, setInputYear] = useState<string>(data.year.toString()) // Giá trị nhập từ input

  // Tự động tính min và max dựa trên dữ liệu
  const calculatedMin = useMemo(() => Math.min(...data.figures) - 5, [data.figures]) // Giảm 5 để tạo khoảng trống dưới
  const calculatedMax = useMemo(() => Math.max(...data.figures) + 5, [data.figures]) // Tăng 5 để tạo khoảng trống trên


  return (
    <div className='col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8'>
      <div className='flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap'>
        <div className='flex w-full flex-wrap gap-3 sm:gap-5'>
          <div className='flex min-w-47.5'>
            <span className='mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary'>
              <span className='block h-2.5 w-full max-w-2.5 rounded-full bg-primary'></span>
            </span>
            <div className='w-full'>
              <p className='font-semibold text-primary'>{data.name}</p>
              <p className='text-sm font-medium'>Year: {data.year}</p>
            </div>
          </div>
        </div>
        <div className='flex w-full max-w-45 justify-end'>
          <input
            type='text'
            value={inputYear}
            onChange={(e) => setInputYear(e.target.value)}
            placeholder='Enter year'
            className='border p-2 rounded-md mr-2'
          />
          <button onClick={()=>onClick(inputYear)} className='bg-blue-500 text-white py-1 px-4 rounded-md'>
            Update
          </button>
        </div>
      </div>

      <div>
        <div id='AreaChart' className='-ml-5'>
          <ReactApexChart
            options={{
              ...options,
              yaxis: { ...options.yaxis, min: calculatedMin, max: calculatedMax } // Sử dụng min/max được tính tự động
            }}
            series={[
              {
                data: data.figures // Dữ liệu được truyền từ ngoài
              }
            ]}
            type='area'
            height={350}
          />
        </div>
      </div>
    </div>
  )
}

export default AreaChart
