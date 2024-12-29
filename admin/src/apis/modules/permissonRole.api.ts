// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { permissionData } from '@/models/data/permissionData'
import { roleData } from '@/models/data/roleData'
import { IPermission, IRole } from '@/models/interfaces/permissionRole'
// import { IPermissionRole } from '@/models/interfaces/permissionRole'

const permissionRoleEndpoints = {
  list: 'permissionRole',
  detail: (id: string | number) => `permissionRole/${id}`
}

const permissionRoleApi = {
  getPermissionList(): IPermission[] {
    // getAll():Promise<IpermissionRoleTableResponse>{
    // return axiosPublic.get(permissionRoleEndpoints.list)
    return permissionData
  },
  getRoleList(): IRole[] {
    // getAll():Promise<IpermissionRoleTableResponse>{
    // return axiosPublic.get(permissionRoleEndpoints.list)
    return roleData
  }
  // getPermissionRoleList(): IPermissionRole[] {
  //   // getAll():Promise<IpermissionRoleTableResponse>{
  //   // return axiosPublic.get(permissionRoleEndpoints.list)
  //   return permissionRoleData
  // }
  // getId(id: number):Promise<IpermissionRole>{
  // return axiosPublic.get(permissionRoleEndpoints.detail(id))
  // }
}

export default permissionRoleApi
