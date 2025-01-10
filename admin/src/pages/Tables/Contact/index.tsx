<<<<<<< Updated upstream
import contactApi from '@/apis/modules/contact.api';
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb';
import Button from '@/components/common/Button';
import Search from '@/components/common/Forms/Search';
import Loader from '@/components/common/Loader';
import Pagination from '@/components/common/Pagination';
import SelectFilter from '@/components/common/SelectFilter';
import SelectSort from '@/components/common/SelectSort';
import SelectStatusFilter from '@/components/common/SelectStatusFilter';
import ContactTable from '@/components/common/Tables/ContactTable';
import { contactFieldOptions, contactStatus, sortByOptions, sortOrderOptions } from '@/constants';
import { EFieldByValue, ESortOrderValue } from '@/models/enums/option';
import { IContact, IContactListResponse } from '@/models/interfaces/contact';
import { IPagination } from '@/models/interfaces/pagination';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
=======
import contactApi from '@/apis/modules/contact.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Search from '@/components/common/Forms/Search'
import Loader from '@/components/common/Loader'
import ContactTable from '@/components/common/Tables/ContactTable'
import { IContact, IContactListResponse } from '@/models/interfaces/contact'
import { IPagination } from '@/models/interfaces/pagination'
import { useEffect, useState } from 'react'
import {
  contactFieldOptions,
  contactSortByOptions,
  contactStatus,
  PAGINATION_CONFIG,
  sortOrderOptions
} from '@/constants'
import { EFieldByValue, ESortOrderValue, EToastOption } from '@/models/enums/option'
import Pagination from '@/components/common/Pagination'
import SelectFilter from '@/components/common/SelectFilter'
import SelectSort from '@/components/common/SelectSort'
import { EContactStatus } from '@/models/enums/status'
import SelectStatusFilter from '@/components/common/SelectStatusFilter'
import { UToast } from '@/utils/swal'
import { IApiResponse } from '@/models/interfaces/api'
>>>>>>> Stashed changes

type Props = {};

const index = ({}: Props) => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
<<<<<<< Updated upstream
    currentPage: 1,
    totalPages: 0,
    totalRecords: 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedField, setSelectedField] = useState<EFieldByValue>(EFieldByValue.ID);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<EFieldByValue>(EFieldByValue.CREATED_AT);
  const [sortOrder, setSortOrder] = useState<ESortOrderValue>(ESortOrderValue.ASC);
=======
    currentPage: PAGINATION_CONFIG.DEFAULT_PAGE,
    totalPage: 0
  })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedField, setSelectedField] = useState<EFieldByValue>(EFieldByValue.FULLNAME)
  const [selectedStatus, setSelectedStatus] = useState<EContactStatus | null>(null)
  const [sortBy, setSortBy] = useState<EFieldByValue>(EFieldByValue.CREATED_AT)
  const [sortOrder, setSortOrder] = useState<ESortOrderValue>(ESortOrderValue.ASC)
>>>>>>> Stashed changes

  const fetchData = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        query: searchQuery,
        field: selectedField,
        status: selectedStatus,
        sort: sortBy,
<<<<<<< Updated upstream
        order: sortOrder,
      };

      // const data: IContactListResponse = await contactApi.getAll(params)
      const data: IContactListResponse = contactApi.list();
      setContacts(data.data.contacts);
      setPagination(data.data.pagination);
=======
        order: sortOrder
      }

      const res: IApiResponse<IContactListResponse> = await contactApi.list(params)

      if (res.status === 200 && res.data) {
        const { contacts, pagination } = res.data.data
        setContacts(contacts)
        setPagination(pagination)
      } else {
        UToast(EToastOption.ERROR, res.message)
      }
>>>>>>> Stashed changes
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce((query: string) => {
    setSearchQuery(query);
  }, 500);

  useEffect(() => {
    fetchData(pagination.currentPage, 5);
  }, [searchQuery, selectedField, selectedStatus, sortBy, sortOrder, pagination.currentPage]);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  return (
    <>
<<<<<<< Updated upstream
      <Breadcrumb pageName="Contact" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border bg-white px-5 pt-6 pb-2.5 shadow-default dark:bg-boxdark">
          <div className="flex items-center justify-between gap-5 mb-6">
            <Search onSearch={debouncedSearch} />
            <div className="flex items-center justify-between gap-5">
              <SelectFilter
                label="Field"
                value={selectedField}
                options={contactFieldOptions}
                onChange={(value) => setSelectedField(value as EFieldByValue)}
              />
              <SelectStatusFilter
                label="Status"
                value={selectedStatus}
                options={contactStatus}
                onChange={(value) => setSelectedStatus(value as number | null)}
              />
              <SelectSort
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={(by, order) => {
                  setSortBy(by);
                  setSortOrder(order);
                }}
                sortByOptions={sortByOptions}
                sortOrderOptions={sortOrderOptions}
              />
            </div>
            <Button type="link" to="/tables/contact/add" size="sm">
              Add
            </Button>
=======
      <Breadcrumb pageName='Contact' />
      <div className='flex flex-col gap-10'>
        <div className='rounded-sm border bg-white px-5 pt-6 pb-2.5 shadow-default dark:bg-boxdark'>
          <div className='flex items-center justify-start gap-5 mb-6'>
            <Search onSearch={setSearchQuery} onSubmit={handleSearchSubmit} />
            <SelectFilter
              label='Field'
              value={selectedField}
              options={contactFieldOptions}
              onChange={(value) => setSelectedField(value as EFieldByValue)}
            />
            <SelectStatusFilter
              label='Status'
              value={selectedStatus}
              options={contactStatus}
              onChange={(value) => setSelectedStatus(value as EContactStatus | null)}
            />
            <SelectSort
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={(by, order) => {
                setSortBy(by)
                setSortOrder(order)
              }}
              sortByOptions={contactSortByOptions}
              sortOrderOptions={sortOrderOptions}
            />
>>>>>>> Stashed changes
          </div>
          {loading ? (
            <Loader />
          ) : (
<<<<<<< Updated upstream
            <ContactTable contacts={contacts} onRefresh={() => fetchData(pagination.currentPage, 5)} />
=======
            <ContactTable
              contacts={contacts}
              onRefresh={() => fetchData(pagination.currentPage, PAGINATION_CONFIG.DEFAULT_LIMIT)}
            />
>>>>>>> Stashed changes
          )}
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default index;
