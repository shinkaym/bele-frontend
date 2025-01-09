import { IRate } from '@/models/interfaces/rate'
import { formatDate } from '@/utils'
import StarIcon from '../icons/StarIcon'

type ReplyModalProps = {
  data: IRate | null
  onCancel: () => void
  onSubmit: (reply: string) => void
  view?: boolean
}

const ReplyModal: React.FC<ReplyModalProps> = ({ data, onCancel, onSubmit, view = false }) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md'>
        <div className='flex justify-between items-center p-4 border-b'>
          <h2 className='text-xl font-semibold'>Reply to Comment</h2>
          <button onClick={onCancel} className='text-3xl text-gray-500 hover:text-gray-700'>
            &times;
          </button>
        </div>
        {data && (
          <div className='p-4 space-y-4'>
            <div>
              <h4 className='font-medium'>{data.name}</h4>
              <div className='flex text-yellow-400'>
                {[...Array(data.star)].map((_, i) => (
                  <StarIcon key={i} className='h-4 w-4 fill-current' />
                ))}
              </div>
              <div className='text-sm text-gray-500 mt-1'>{formatDate(data.createdAt)}</div>
            </div>

            <p>{data.content}</p>

            <div className='flex items-center gap-3 rounded-lg border p-3'>
              <img src={data.pImage} alt={data.pName} className='w-16 rounded-md object-cover' />
              <span className='font-medium'>{data.pName}</span>
            </div>

            <div className='space-y-4'>
              {view ? (
                <>
                  <h5 className='font-medium'>Rep Name: {data.rName}</h5>
                  <p>{data.reply}</p>
                </>
              ) : (
                <>
                  <textarea
                    id='replyTextarea'
                    placeholder='Write your reply...'
                    className='w-full p-2 border rounded min-h-[100px]'
                    defaultValue={data.reply ?? ''}
                  />
                  <button
                    type='button'
                    className='w-full bg-green-500 text-white px-4 py-2 rounded'
                    onClick={() => onSubmit((document.getElementById('replyTextarea') as HTMLTextAreaElement).value)}
                  >
                    Submit reply
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReplyModal
