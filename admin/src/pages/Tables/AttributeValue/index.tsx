import AttributeValueApi from '@/apis/modules/attribute.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Loader from '@/components/common/Loader'
import AttributeValueTable from '@/components/common/Tables/AttributeValueTable'
import { IAttributeValue } from '@/models/interfaces/attribute'
import { useEffect, useState } from 'react'

type Props = {}

function AttributeValue({}: Props) {
  const [loading, setLoading] = useState(false)
  const [AttributeValueList, setAttributeValueList] = useState<IAttributeValue[]>([])
  const handleSearch = (query: string) => {
    console.log(query)
  }

  useEffect(() => {
    const handleGetAttributeValueList = async () => {
      setLoading(true) // Bật trạng thái loading
      try {
        const data = await AttributeValueApi.getList();
        setAttributeValueList(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching categories:', error)
        setLoading(false)
      }
    }
    handleGetAttributeValueList()
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumb pageName='AttributeValue' />

          <div className='flex flex-col gap-10'>
            <AttributeValueTable attributeValues={AttributeValueList} onSearch={handleSearch} />
          </div>
        </>
      )}
    </>
  )
}

export default AttributeValue
