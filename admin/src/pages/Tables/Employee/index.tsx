import employeeApi from '@/apis/modules/employee.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import Search from '@/components/common/Forms/Search'
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
        <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
          <div className='flex items-center justify-between mb-6'>
            <Search onSearch={handleSearch} />
            <Button type='link' to='/tables/employee/add' size='sm'>
              Add
            </Button>
          </div>
          <EmployeeTable employees={employees} />
        </div>
      </div>
    </>
  )
}

export default index
