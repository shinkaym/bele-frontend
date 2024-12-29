import { IPermission, IPermissionRoles, IRole } from '@/models/interfaces/permissionRole'

import { useState } from 'react'
import Button from '../Button'
type Decentralizes = {
  permissions: IPermission[]
  roles: IRole[]
  onSubmit: (payload: IPermissionRoles[]) => void
}

function DecentralizeTable({ permissions, roles, onSubmit }: Decentralizes) {
  const [permissionRoles, setPermissionRoles] = useState<IPermissionRoles[]>(
    roles.map((role) => ({
      roleId: role.id,
      permissions: role.permissions?.map((perm) => perm.id) ?? []
    }))
  )

  const isCheckPermissionRole = (roleId: number, permId: number) => {
    return permissionRoles.find((r) => r.roleId === roleId)?.permissions?.includes(permId)
  }

  const handleTogglePermission = (roleId: number, permissionId: number) => {
    setPermissionRoles((prev) =>
      prev.map((role) =>
        role.roleId === roleId
          ? {
              ...role,
              permissions: role.permissions?.includes(permissionId)
                ? role.permissions.filter((id) => id !== permissionId) // Bỏ quyền
                : [...role.permissions, permissionId] // Thêm quyền
            }
          : role
      )
    )
  }

  return (
    <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
      <div className='flex items-center justify-end mb-6'>
        <Button type='button' size='sm' onClick={() => onSubmit(permissionRoles)}>
          Save Changes
        </Button>
      </div>
      {/* Đảm bảo container bao quanh bảng có overflow */}
      <div className='max-w-full overflow-x-auto overflow-y-auto max-h-[500px] mb-6 scrollbar-thin dark:scrollbar-thumb-boxdark dark:scrollbar-track-gray-3 scrollbar-thumb-white scrollbar-track-boxdark scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
              <th className='min-w-[20px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap sticky top-0 bg-gray-2 dark:bg-meta-4 z-10'>
                Group Permissions
              </th>
              {roles.map((role) => (
                <th
                  key={role.id}
                  className='min-w-[100px] py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap sticky top-0 bg-gray-2 dark:bg-meta-4 z-10'
                >
                  {role.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm) => (
              <tr key={perm.id}>
                <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>{perm.name}</td>
                {roles.map((role) => (
                  <td key={`${role.id}-${perm.id}`} className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                    <label
                      htmlFor={`${role.id}-${perm.id}`}
                      className='flex cursor-pointer select-none items-center mb-2'
                    >
                      <div className='relative'>
                        <input
                          id={`${role.id}-${perm.id}`}
                          type='checkbox'
                          className='sr-only'
                          checked={isCheckPermissionRole(role.id, perm.id)}
                          onChange={() => handleTogglePermission(role.id, perm.id)}
                        />
                        <div
                          className={`mr-2 flex h-5 w-5 items-center justify-center border rounded ${
                            isCheckPermissionRole(role.id, perm.id) ? 'border-primary' : 'border-gray-300'
                          }`}
                        >
                          {isCheckPermissionRole(role.id, perm.id) && (
                            <span className='h-2.5 w-2.5 bg-primary rounded-sm'></span>
                          )}
                        </div>
                      </div>
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DecentralizeTable
