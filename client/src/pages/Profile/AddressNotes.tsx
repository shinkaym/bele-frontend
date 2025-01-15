import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import ButtonCustom from '../../components/common/ButtonCustom'
import { IAddress, IAddressFormData } from '@/models/interfaces'
import { addAddress, deleteAddress, fetchAddresses, updateAddress } from '@/redux/slices/address.slice'
import { IconStar } from '@/components/icons'
import AddAddressModal from '@/components/common/AddAddressModal'
import UpdateAddressModal from '@/components/common/UpdateAddressModal'

const AddressNotes = () => {
  const dispatch = useDispatch<AppDispatch>()
  const addresses = useSelector((state: RootState) => state.address.addresses)
  const loading = useSelector((state: RootState) => state.address.loading)
  const error = useSelector((state: RootState) => state.address.error)

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null)

  useEffect(() => {
    dispatch(fetchAddresses())
  }, [dispatch])

  const handleAddAddress = async (data: IAddressFormData) => {
    await dispatch(addAddress(data))
    setIsAddModalOpen(false)
  }

  const handleUpdateAddress = async (data: IAddressFormData) => {
    if (selectedAddress) {
      await dispatch(updateAddress({ id: selectedAddress.id, data }))
      setIsUpdateModalOpen(false)
    }
  }

  const handleDeleteAddress = async (id: number) => {
    await dispatch(deleteAddress(id))
  }

  const handleSetDefaultAddress = async (id: number) => {
    const addressToUpdate = addresses.find((address) => address.id === id)

    if (addressToUpdate) {
      const updatedData: IAddressFormData = {
        ...addressToUpdate,
        isDefault: true
      }

      await dispatch(updateAddress({ id, data: updatedData }))
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='md:w-2/3 lg:w-full md:mx-auto lg:mx-0'>
      <div className='flex items-center justify-between pb-8 border-b'>
        <h3 className='font-medium text-3xl tracking-wider'>Địa chỉ của tôi</h3>
        <ButtonCustom onClick={() => setIsAddModalOpen(true)} inverted>
          THÊM ĐỊA CHỈ MỚI
        </ButtonCustom>
      </div>
      <h4 className='py-5 text-2xl'>Sổ địa chỉ</h4>
      <div>
        {addresses.map((address) => (
          <div key={address.id} className='flex justify-between mb-6 pb-6 border-b'>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-2'>
                {address.name}
                {address.isDefault && (
                  <div className='text-xs border border-black px-2 py-1 rounded-full flex items-center gap-1'>
                    <IconStar className='w-3 h-3' />
                    Mặc định
                  </div>
                )}
              </div>
              <div className='text-gray-500 text-md'>
                {address.phoneNumber}
                <br />
                {address.address}
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='flex items-start justify-end flex-1'>
                <button
                  className='text-[#2f5acf] hover:text-black'
                  onClick={() => {
                    setSelectedAddress(address)
                    setIsUpdateModalOpen(true)
                  }}
                >
                  Cập nhật
                </button>
                <button
                  className='text-[#2f5acf] hover:text-black ml-4 pl-4 border-l'
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  Xoá
                </button>
              </div>
              {!address.isDefault && (
                <ButtonCustom
                  className='h-[34px] font-normal lg:text-sm'
                  onClick={() => handleSetDefaultAddress(address.id)}
                >
                  Đặt làm mặc định
                </ButtonCustom>
              )}
            </div>
          </div>
        ))}
      </div>
      {isAddModalOpen && <AddAddressModal onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddAddress} />}
      {isUpdateModalOpen && selectedAddress && (
        <UpdateAddressModal
          onClose={() => setIsUpdateModalOpen(false)}
          onSubmit={handleUpdateAddress}
          initialData={selectedAddress}
        />
      )}
    </div>
  )
}

export default AddressNotes
