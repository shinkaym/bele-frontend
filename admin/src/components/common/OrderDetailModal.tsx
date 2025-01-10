import { orderStatus } from '@/constants'
import { IOrder } from '@/models/interfaces/order'
import { calculateTotalDiscount, formatDate } from '@/utils'
import Overlay from './Overlay'

type OrderDetailModalProps = {
  current: IOrder | null
  onCancel: () => void
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ current, onCancel }) => {
  
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <Overlay onClose={onCancel} className='z-40' />
        <div className='bg-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-screen overflow-y-auto z-50'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-bold'>Order Details</h2>
            <button onClick={onCancel} className='text-gray-500 text-3xl hover:text-gray-700'>
              &times;
            </button>
          </div>

          {/* Order info */}
          <div className='mb-6'>
            <div className='flex gap-4'>
              <div className='w-1/3 md:w-1/4'>
                <p>
                  <strong>Email:</strong>
                </p>
                <p>
                  <strong>Name:</strong>
                </p>
                <p>
                  <strong>Phone Number:</strong>
                </p>
                <p>
                  <strong>Address:</strong>
                </p>
                <p>
                  <strong>Note:</strong>
                </p>
                <p>
                  <strong>Payment Method:</strong>
                </p>
                <p>
                  <strong>Ship Date:</strong>
                </p>
                <p>
                  <strong>Receive Date:</strong>
                </p>
                <p>
                  <strong>Status:</strong>
                </p>
              </div>
              <div className='w-1/3 md:w-1/4'>
                {current ? (
                  <>
                    <p className='whitespace-nowrap'>{current.email || '\u00A0'}</p>
                    <p className='whitespace-nowrap'>{current.name || '\u00A0'}</p>
                    <p className='whitespace-nowrap'>{current.phoneNumber || '\u00A0'}</p>
                    <p className='whitespace-nowrap'>{current.address || '\u00A0'}</p>
                    <p className='whitespace-nowrap'>{current.note || '\u00A0'}</p>
                    <p className='whitespace-nowrap'>{current.payMethod || '\u00A0'}</p>
                    <p className='whitespace-nowrap'>{formatDate(current.shipDate) || '\u00A0'}</p>
                    <p className='whitespace-nowrap'>{formatDate(current.receiveDate) || '\u00A0'}</p>
                    <p className='whitespace-nowrap'>
                      {orderStatus.find((e) => e.value === current.status)?.title || '\u00A0'}
                    </p>
                  </>
                ) : (
                  <p>No order details available.</p>
                )}
              </div>
            </div>
          </div>

          {/* Product list */}
          <div className='mb-6'>
            <div className='flex mb-2 px-6'>
              <div className='w-2/4 md:w-1/3'>
                <div className='flex items-center mb-2'>
                  <label htmlFor='selectAll' className='cursor-pointer'>
                    PRODUCT
                  </label>
                </div>
              </div>
              <div className='w-1/4 md:w-1/3 text-center'>
                <p>QUANTITY</p>
              </div>
              <div className='w-1/4 md:w-1/3 text-right'>
                <p>PRICE</p>
              </div>
            </div>
            <div className='bg-gray-100 p-4 rounded shadow overflow-y-auto max-h-64'>
              {current?.variants &&
                current.variants.map((product: any) => (
                  <div key={product.id} className='flex items-center justify-between p-2 mb-2 border-b'>
                    <div className='w-2/4 md:w-1/3 flex items-center gap-3'>
                      <img src={product.thumbnail} alt={product.name} className='bg-boxdark object-cover w-18' />
                      <div>
                        <p className='font-bold text-black truncate max-w-50'>{product.name}</p>
                        <p className='italic'>
                          {product.attribute[0].Color}/{product.attribute[1].Size}
                        </p>
                      </div>
                    </div>
                    <div className='w-1/4 md:w-1/3 flex justify-center'>
                      <div className='w-fit flex items-center justify-center rounded-full'>{product.quantity}</div>
                    </div>
                    <div className='w-1/4 md:w-1/3 text-right'>
                      <p className='mt-1'>
                        {product.finalPrice}VND <span className='line-through'>{product.originalPrice}VND</span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Total */}
          <div className='mt-4 w-1/3 ml-auto mr-6'>
            <div className='flex justify-between border-y-2 py-4 mb-4'>
              <div className='flex flex-col gap-1'>
                <p>
                  <strong>Subtotal</strong>
                </p>
                <p>
                  <strong>Discount</strong>
                </p>
                <p>
                  <strong>Shipping Fee</strong>
                </p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-right'>{current ? current.totalMoney + calculateTotalDiscount(current) : 0}VND</p>
                <p className='text-right'>{current ? calculateTotalDiscount(current) : 0}VND</p>
                <p className='text-right'>0VND</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <p>
                <strong>Total</strong>
              </p>
              <p className='text-right'>{current?.totalMoney}$</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default OrderDetailModal
