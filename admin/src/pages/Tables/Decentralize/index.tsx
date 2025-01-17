import permissionRoleApi from '@/apis/modules/permissonRole.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Loader from '@/components/common/Loader'
import DecentralizeTable from '@/components/common/Tables/DencentralizeTable'
import { EToastOption } from '@/models/enums/option'
import { IPermission, IPermissionRoles, IRole } from '@/models/interfaces/permissionRole'
import { UToast } from '@/utils/swal'
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
    const fetchApi = async (data: IPermissionRoles) => {
      setLoading(true)
      try {
        const res = await permissionRoleApi.decentralize(data)
        if (res.data && res.status === 200) {
          
          setRolesData(res.data.roles)
          UToast(EToastOption.SUCCESS, 'Phân quyền thành công!')
        }
      } catch (error) {
        console.log(error)
        UToast(EToastOption.ERROR, 'Phân quyền thất bại!')
      } finally {
        setLoading(false)
      }
    }
    payload.forEach((data) => fetchApi(data))
  }

  useEffect(() => {
    const handleGetDecentralizeList = async () => {
      setLoading(true) // Bật trạng thái loading
      try {
        const resPermissions = await permissionRoleApi.getPermissionList()
        const resRoles = await permissionRoleApi.getRoleList()
        if (resPermissions.data && resRoles.data) {
          setPermissionsData(resPermissions.data)
          setRolesData(resRoles.data.roles)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
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
