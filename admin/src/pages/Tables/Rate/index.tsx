import rateApi from '@/apis/modules/rate.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import RateTable from '@/components/common/Tables/RateTable'

type Props = {}

const index = ({}: Props) => {
  const rates = rateApi.getAll().data.rates
  const handleSearch = (query: string) => {
    console.log(query)
  }
  return (
    <>
      <Breadcrumb pageName='Rate' />
      <div className='flex flex-col gap-10'>
        <RateTable rates={rates} onSearch={handleSearch} />
      </div>
    </>
  )
}

export default index
