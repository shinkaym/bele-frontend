import employeeApi from '@/apis/modules/employee.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import EmployeeTable from '@/components/common/Tables/EmployeeTable'

type Props = {}

const index = ({}: Props) => {
  const employees = employeeApi.getAll().data.employees
  const handleSearch = (query: string) => {
    console.log(query)
  }
  return (
    <>
      <Breadcrumb pageName='Employee' />
      <div className='flex flex-col gap-10'>
        <EmployeeTable employees={employees} onSearch={handleSearch} />
      </div>
    </>
  )
}

export default index
