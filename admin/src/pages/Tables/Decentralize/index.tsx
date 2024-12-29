import permissionRoleApi from '@/apis/modules/permissonRole.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Loader from '@/components/common/Loader'
import DecentralizeTable from '@/components/common/Tables/DencentralizeTable'
import { IPermission, IPermissionRoles, IRole } from '@/models/interfaces/permissionRole'
import { useEffect, useState } from 'react'

type Props = {}

function Decentralize({}: Props) {
  const [loading, setLoading] = useState(false)
  const [permissionsData, setPermissionsData] = useState<IPermission[]>([])
  const [rolesData, setRolesData] = useState<IRole[]>([])

  const handleSearch = (query: string) => {
    console.log(query)
  }

  const handleSubmit = (payload: IPermissionRoles[]) => {
    console.log(payload);
  }

  useEffect(() => {
    const handleGetDecentralizeList = async () => {
      setLoading(true) // Bật trạng thái loading
      try {
        const permisisons = await permissionRoleApi.getPermissionList()
        const roles = await permissionRoleApi.getRoleList()
        setPermissionsData(permisisons)
        setRolesData(roles)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching categories:', error)
        setLoading(false)
      }
    }
    handleGetDecentralizeList()
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        permissionsData.length > 0 &&
        rolesData.length > 0 && (
          <>
            <Breadcrumb pageName='Decentralize' />

            <div className='flex flex-col gap-10'>
              <DecentralizeTable roles={rolesData} permissions={permissionsData} onSubmit={handleSubmit} />
            </div>
          </>
        )
      )}
    </>
  )
}

export default Decentralize
