import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import Button from '@/components/common/Button';
import settingApi from '@/apis/modules/setting.api';
import { ISetting } from '@/models/interfaces/setting';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  hotline: string;
  email: string;
  slogan: string;
  description?: string;
  branchName1: string;
  branchAddress1: string;
  branchName2: string;
  branchAddress2: string;
  facebookLink: string;
  instagramLink: string;
  youtubeLink: string;
};

const Setting = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [existingSettings, setExistingSettings] = useState<ISetting | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await settingApi.fetchSettings();
      if (response) {
        setExistingSettings(response);
        reset(response); // Reset form với dữ liệu từ API
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      alert('Failed to fetch settings.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const updatedSettings: ISetting = {
        ...existingSettings!,
        ...data,
        id: existingSettings?.id ?? 0, // Đảm bảo `id` luôn có giá trị
      };

      await settingApi.updateSettings(updatedSettings);
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Failed to update settings:', error);
      alert('Failed to update settings.');
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="mx-auto max-w-270">
      <Breadcrumb pageName="Settings" />
      <div className="col-span-5 xl:col-span-3">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-sm border bg-white p-6 shadow-default dark:bg-boxdark">
          <h2 className="text-lg font-bold mb-6">General Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Hotline</label>
              <input
                {...register('hotline', {
                  required: 'Hotline is required',
                  minLength: { value: 8, message: 'Hotline must be at least 8 characters' },
                  maxLength: { value: 15, message: 'Hotline must not exceed 15 characters' },
                })}
                type="text"
                className={`w-full rounded border px-4 py-2 ${errors.hotline ? 'border-red-500' : ''}`}
              />
              {errors.hotline && <p className="text-red-500 text-sm mt-1">{errors.hotline.message}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: 'Invalid email format',
                  },
                })}
                type="email"
                className={`w-full rounded border px-4 py-2 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            {/* Các trường khác */}
          </div>

          <div className="flex justify-end mt-6">
            <Button type="button" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
