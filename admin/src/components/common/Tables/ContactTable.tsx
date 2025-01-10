import { IContact } from '@/models/interfaces/contact';
import { DeleteIcon } from '@/components/icons';
import { Link } from 'react-router-dom';
import XCircleIcon from '@/components/icons/XCircleIcon';
import CheckCircle from '@/components/icons/CheckCircle';
import { contactStatus, contactTableHeaders } from '@/constants';
import Swal from 'sweetalert2';
import ReCAPCHAModal from '../ReCAPCHAModal';
import ConfirmationModal from '../ConfirmationModal';
import StatusModal from '../StatusModal';
import StatusBadge from '../StatusBadge';
import { useState } from 'react';

type ContactTableProps = {
  contacts: IContact[];
  onRefresh: () => void;
};

const ContactTable = ({ contacts, onRefresh }: ContactTableProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [current, setCurrent] = useState<IContact | null>(null);
  const [isOpenDeleteReCaptchaModal, setIsOpenDeleteReCaptchaModal] = useState(false);
  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] = useState(false);
  const [isOpenStatusListModal, setIsOpenStatusListModal] = useState(false);
  const [isOpenConfirmStatusChangeModal, setIsOpenConfirmStatusChangeModal] = useState(false);

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setIsOpenDeleteReCaptchaModal(true);
  };

  const handleDeleteReCaptchaChange = async (token: string | null) => {
    if (token && selectedId) {
      setIsOpenConfirmDeleteModal(true);
      setIsOpenDeleteReCaptchaModal(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedId) {
      try {
        // Call delete API for contact
        await Swal.fire('Deleted!', 'Contact has been deleted successfully.', 'success');
        onRefresh();
      } catch (error) {
        Swal.fire('Error!', 'An unexpected error occurred.', 'error');
      } finally {
        setIsOpenConfirmDeleteModal(false);
        setSelectedId(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsOpenDeleteReCaptchaModal(false);
    setIsOpenConfirmDeleteModal(false);
    setSelectedId(null);
  };

  const handleStatusClick = (contact: IContact) => {
    setCurrent(contact);
    setIsOpenStatusListModal(true);
  };

  const handleUpdateStatus = (status: number) => {
    setSelectedStatus(status);
    setIsOpenStatusListModal(false);
    setIsOpenConfirmStatusChangeModal(true);
  };

  const handleConfirmStatusChange = async () => {
    if (current && selectedStatus !== null) {
      try {
        // Call update status API for contact
        await Swal.fire('Success!', 'Contact status updated successfully', 'success');
        onRefresh();
      } catch (error) {
        Swal.fire('Error!', 'An unexpected error occurred.', 'error');
      } finally {
        setIsOpenConfirmStatusChangeModal(false);
        setSelectedStatus(null);
        setCurrent(null);
      }
    }
  };

  const handleCancelStatusChange = () => {
    setIsOpenConfirmStatusChangeModal(false);
    setIsOpenStatusListModal(false);
    setSelectedStatus(null);
    setCurrent(null);
  };

  return (
    <div className='max-w-full overflow-x-auto mb-6 scrollbar-thin dark:scrollbar-thumb-boxdark dark:scrollbar-track-gray-3 scrollbar-thumb-white scrollbar-track-boxdark'>
      <table className='w-full table-auto'>
        <thead>
          <tr className='bg-gray-2 text-left dark:bg-meta-4'>
            {contactTableHeaders.map((h) => (
              <th
                key={h.value}
                className={`${h.className} py-4 px-4 font-medium text-black dark:text-white text-sm whitespace-nowrap`}
              >
                {h.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, key) => (
            <tr key={key}>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>{contact.id}</td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>{contact.title}</td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>{contact.message}</td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>{contact.fullName}</td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>{contact.email}</td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>{contact.phoneNumber}</td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <StatusBadge
                  status={contact.status}
                  statusList={contactStatus}
                  onClick={() => handleStatusClick(contact)}
                />
              </td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>{contact.createdAt}</td>
              <td className='border-b border-[#eee] py-4 px-4 dark:border-strokedark'>
                <div className='flex justify-center space-x-3.5'>
                  <button type='button' className='hover:text-primary' onClick={() => handleDeleteClick(contact.id)}>
                    <DeleteIcon width={24} height={24} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpenDeleteReCaptchaModal && (
        <ReCAPCHAModal onChange={handleDeleteReCaptchaChange} onCancel={handleCancelDelete} />
      )}

      {isOpenConfirmDeleteModal && (
        <ConfirmationModal
          title='Are you sure you want to delete this contact?'
          className='bg-red-500'
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {isOpenStatusListModal && current && (
        <StatusModal
          status={current.status}
          onUpdateStatus={handleUpdateStatus}
          onCancel={handleCancelStatusChange}
          statusList={contactStatus}
          modalTitle='Contact'
        />
      )}

      {isOpenConfirmStatusChangeModal && (
        <ConfirmationModal
          title={`Are you sure you want to change the status to ${selectedStatus}?`}
          className='bg-blue-500'
          onConfirm={handleConfirmStatusChange}
          onCancel={handleCancelStatusChange}
        />
      )}
    </div>
  );
};

export default ContactTable;
