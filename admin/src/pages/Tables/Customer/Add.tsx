import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb';
import Input from '@/components/common/Forms/Input';
import SelectGroup from '@/components/common/Forms/SelectGroup';
import { IOptions } from '@/models/interfaces/options';
import Button from '@/components/common/Button';
import { UToast } from '@/utils/swal';
import { EToastOption } from '@/models/enums/option';
import customerApi from '@/apis/modules/customer.api';

const schema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  phoneNumber: z.string().min(10, 'Phone Number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  sex: z.number().min(0).max(1, 'Invalid value for Sex'), // 0: Female, 1: Male
  birthday: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date format'),
  status: z.number().min(0).max(1, 'Invalid status'), // 0: Inactive, 1: Active
});

type FormValues = z.infer<typeof schema>;

type Props = {};

function AddCustomer({}: Props) {
  const [statusOptions, setStatusOptions] = useState<IOptions[]>([]);
  const [sexOptions, setSexOptions] = useState<IOptions[]>([]);

  useEffect(() => {
    setStatusOptions([
      { value: 0, label: 'Inactive' },
      { value: 1, label: 'Active' },
    ]);

    setSexOptions([
      { value: 0, label: 'Female' },
      { value: 1, label: 'Male' },
    ]);
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const payload = {
        ...data,
        createdAt: new Date().toISOString(),
      };

      //await customerApi.add(payload); // Gọi API để thêm khách hàng
      UToast(EToastOption.SUCCESS, 'Customer added successfully!');
      reset(); // Reset form
    } catch (error) {
      UToast(EToastOption.WARNING, 'Failed to add customer!');
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <Breadcrumb pageName="Add Customer" parentPageName="Customers" parentTo="/tables/customers" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  label="Full Name"
                  error={errors.fullName?.message}
                  {...field}
                  {...register('fullName')}
                  placeholder="Enter full name"
                  className="border border-gray-300 mb-6"
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  label="Phone Number"
                  error={errors.phoneNumber?.message}
                  {...field}
                  {...register('phoneNumber')}
                  placeholder="Enter phone number"
                  className="border border-gray-300 mb-6"
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  label="Email"
                  error={errors.email?.message}
                  {...field}
                  {...register('email')}
                  placeholder="Enter email"
                  className="border border-gray-300 mb-6"
                />
              )}
            />
            <Controller
              name="sex"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <SelectGroup
                  {...register('sex')}
                  value={field.value ?? 0}
                  onChange={(value) => field.onChange(value)}
                  options={sexOptions}
                  label="Sex"
                  className="mb-6"
                />
              )}
            />
          </div>
        </div>
        <div>
          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <Input
                type="date"
                label="Birthday"
                error={errors.birthday?.message}
                {...field}
                {...register('birthday')}
                className="border border-gray-300 mb-6"
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <SelectGroup
                {...register('status')}
                value={field.value ?? 0}
                onChange={(value) => field.onChange(value)}
                options={statusOptions}
                label="Status"
                className="mb-6"
              />
            )}
          />
        </div>

        <div className="grid grid-cols-6">
          <Button type="button" className="max-h-12 mr-4">
            Add
          </Button>
          <Button type="link" to="/tables/customers" color="secondary" className="max-h-12">
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddCustomer;
