import orderApi from '@/apis/modules/order.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import OrderTable from '@/components/common/Tables/OrderTable'

type Props = {}

const index = ({}: Props) => {
  const orders = orderApi.getAll().data.orders
  const handleSearch = (query: string) => {
    console.log(query)
  }
  return (
    <>
      <Breadcrumb pageName='Order' />
      <div className='flex flex-col gap-10'>
        <OrderTable orders={orders} onSearch={handleSearch} />
      </div>
    </>
  )
}

export default index
