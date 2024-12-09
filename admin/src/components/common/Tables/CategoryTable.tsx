import { ICategory } from '@/models/interfaces/'
import Button from '../Button'
import Search from '../Forms/Search'
import EditIcon from '@/components/icons/Crud/EditIcon'
import { Link } from 'react-router-dom'
import DeleteIcon from '@/components/icons/Crud/DeleteIcon'

type Props = {
  categories: ICategory[]
  onSearch: (query: string) => void
}

function CategoryTable({ categories, onSearch }: Props) {
  return (
    <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
      <div className='flex items-center justify-between mb-6'>
        <Search onSearch={(query: string) => onSearch(query)} />
        <Button type='link' to='/tables/category/add' size='sm'>
          Add
        </Button>
      </div>
      <div className='max-w-full overflow-x-auto'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
              <th className='min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11'>Id</th>
              <th className='min-w-[220px] py-4 px-4 font-medium text-black dark:text-white'>Name</th>
              <th className='min-w-[150px] py-4 px-4 font-medium text-black dark:text-white'>Parent Name</th>
              <th className='min-w-[120px] py-4 px-4 font-medium text-black dark:text-white'>Created At</th>
              <th className='min-w-[120px] py-4 px-4 font-medium text-black dark:text-white '>Status</th>
              <th className='py-4 px-4 font-medium text-black dark:text-white'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, key) => (
              <tr key={key}>
                <td className='border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11'>
                  <h5 className='font-medium text-black dark:text-white'>{cat.id}</h5>
                </td>
                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                  <h5 className='text-black dark:text-white'>{cat.name}</h5>
                </td>
                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                  <p className='text-black dark:text-white'>{cat.parentName}</p>
                </td>
                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                  <p className='text-black dark:text-white'>{new Date(cat.createdAt).toLocaleDateString()}</p>
                </td>
                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      cat.status === 1 ? 'bg-success text-success' : 'bg-danger text-danger'
                    }`}
                  >
                    {cat.status === 1 ? 'Active' : 'Unactive'}
                  </p>
                </td>
                <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                  <div className='flex items-center space-x-3.5'>
                    <Link to={`/tables/category/edit/${cat.id}`} className='hover:text-primary'>
                      <EditIcon />
                    </Link>
                    <button type='button' className='hover:text-primary'>
                      <DeleteIcon />
                    </button> 
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CategoryTable
