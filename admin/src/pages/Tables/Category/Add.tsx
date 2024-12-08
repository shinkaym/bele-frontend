import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {};

interface CategoryFormData {
  name: string;
}

function Add({}: Props) {
  // Cấu hình Zod schema
  const categorySchema = z.object({
    name: z.string().min(1, { message: 'Category name is required' }), // Bắt buộc nhập tên
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = (data: CategoryFormData) => {
    console.log(data); // Dữ liệu khi submit
  };

  return (
    <>
      <Breadcrumb pageName="Add Category" parentPageName="Category" parentTo="/tables/category" />

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        {/* Category Name */}
        <div>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                error={errors.name?.message}
                {...field} // Truyền tất cả props từ field vào Input
                placeholder="Enter Category Name"
                className="border border-gray-300"
              />
            )}
          />
        </div>

        <div className="grid grid-cols-6">
          <Button type="button" className="max-h-12">
            Add
          </Button>
        </div>
      </form>
    </>
  );
}

export default Add;
