import IconPlay from '@/components/icons/IconPlay';
import { EOrderStatus, ERateStatus, EEmployeeStatus } from '@/models/enums/status'
import { TMenuItem } from '@/models/types/brand';

export const menuItems: TMenuItem[] = [
  {
    url: '/',
    title: 'Trang chủ',
    icon: <IconPlay className='size-5' />
  }
]

export const rateStatusLabels: Record<number, string> = {
  0: ERateStatus.INACTIVE,   
  1: ERateStatus.ACTIVE, 
};

export const orderStatusLabels: Record<number, string> = {
  0: EOrderStatus.PENDING,   
  1: EOrderStatus.COMPLETED,   
  2: EOrderStatus.CANCELED  
};

export const employeeStatusLabels: Record<number, string> = {
  0: EEmployeeStatus.UNKNOWN,   
  1: EEmployeeStatus.ACTIVE,
  2: EEmployeeStatus.INACTIVE,
  3: EEmployeeStatus.BANNED  
};

