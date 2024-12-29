import { IDiscount } from '@/models/interfaces/discount';
import { DeleteIcon, EditIcon } from '@/components/icons';
import { Link } from 'react-router-dom';
import { discountStatus, discountTableHeaders } from '@/constants';
import { EDiscountStatus } from '@/models/enums/status';
import { formatDate } from '@/utils';
import { useState } from 'react';
import discountApi from '@/apis/modules/discount.api';
import Swal from 'sweetalert2';
import ReCAPCHAModal from '../ReCAPCHAModal';
import ConfirmationModal from '../ConfirmationModal';
import StatusModal from '../StatusModal';
import StatusBadge from '../StatusBadge';

type DiscountTableProps = {
  discounts: IDiscount[];
  onRefresh: () => void;
};

const DiscountTable = ({ discounts, onRefresh }: DiscountTableProps) => {
  const [selectedId, setSelectedId] = useState<number | string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<number | string | null>(null);
  const [current, setCurrent] = useState<IDiscount | null>(null);
  const [isOpenDeleteReCaptchaModal, setIsOpenDeleteReCaptchaModal] = useState(false);
  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] = useState(false);
  const [isOpenStatusListModal, setIsOpenStatusListModal] = useState(false);
  const [isOpenConfirmStatusChangeModal, setIsOpenConfirmStatusChangeModal] = useState(false);

  const handleDeleteClick = (id: number | string) => {
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
        const response = await discountApi.delete({ id: selectedId });

        if (response.status === 200) {
          onRefresh();
          Swal.fire('Deleted!', response.message, 'success');
        } else {
          Swal.fire('Error!', response.message, 'error');
        }
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

  const handleStatusClick = (discount: IDiscount) => {
    setCurrent(discount);
    setIsOpenStatusListModal(true);
  };

  const handleUpdateStatus = (status: number | string) => {
    setSelectedStatus(status);
    setIsOpenStatusListModal(false);
    setIsOpenConfirmStatusChangeModal(true);
  };

  const handleConfirmStatusChange = async () => {
    if (current && selectedStatus !== null) {
      try {
        const response = await discountApi.updateStatus({
          id: current.id,
          status: selectedStatus,
        });

        if (response.status === 200) {
          onRefresh();
          Swal.fire('Success!', 'Discount status updated successfully', 'success');
        } else {
          Swal.fire('Error!', response.message, 'error');
        }
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

  const getStatusName = (status: number | string | null): string => {
    const s = discountStatus.find((s) => s.value === status);
    return s ? s.title : EDiscountStatus.UNKNOWN;
  };

  return (
    <div className="max-w-full overflow-x-auto mb-6 scrollbar-thin dark:scrollbar-thumb-boxdark dark:scrollbar-track-gray-3 scrollbar-thumb-white scrollbar-track-boxdark">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            {discountTableHeaders.map((h) => (
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
          {discounts.map((discount) => (
            <tr key={discount.id}>
              <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark text-center">{discount.id}</td>
              <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">{discount.name}</td>
              <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">{discount.discount}%</td>
              <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">{discount.expireDate}</td>
              <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                <StatusBadge
                  status={Number(discount.status)}
                  statusList={discountStatus}
                  onClick={() => handleStatusClick(discount)}
                />
              </td>
              <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">{discount.createdAt}</td>
              <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">{discount.updatedAt}</td>
              <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <Link to={`/discounts/edit/${discount.id}`} className="hover:text-primary">
                    <EditIcon width={24} height={24} />
                  </Link>
                  <button
                    type="button"
                    className="hover:text-primary"
                    onClick={() => handleDeleteClick(discount.id)}
                  >
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
          title="Are you sure you want to delete this discount?"
          className="bg-red-500"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {isOpenStatusListModal && current && (
        <StatusModal
          status={Number(current.status)}
          onUpdateStatus={handleUpdateStatus}
          onCancel={handleCancelStatusChange}
          statusList={discountStatus}
          modalTitle="Discount"
        />
      )}

      {isOpenConfirmStatusChangeModal && (
        <ConfirmationModal
          title={`Are you sure you want to change the status to ${getStatusName(selectedStatus)}?`}
          className="bg-blue-500"
          onConfirm={handleConfirmStatusChange}
          onCancel={handleCancelStatusChange}
        />
      )}
    </div>
  );
};

export default DiscountTable;
