import VariantApi from '@/apis/modules/variant.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Loader from '@/components/common/Loader'
import VariantTable from '@/components/common/Tables/VariantTable'
import { IVariant } from '@/models/interfaces/variant'
import { useEffect, useState } from 'react'

type Props = {}

function Variant({}: Props) {
  const [loading, setLoading] = useState(false)
  const [VariantList, setVariantList] = useState<IVariant[]>([])
  const handleSearch = (query: string) => {
    console.log(query)
  }

  useEffect(() => {
    const handleGetVariantList = async () => {
      setLoading(true) // Bật trạng thái loading
      try {
        const data = await VariantApi.getList();
        setVariantList(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching categories:', error)
        setLoading(false)
      }
    }
    handleGetVariantList()
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumb pageName='Variant' />

          <div className='flex flex-col gap-10'>
            <VariantTable variants={VariantList} onSearch={handleSearch} />
          </div>
        </>
      )}
    </>
  )
}

export default Variant
