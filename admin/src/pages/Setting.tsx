import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import Button from '@/components/common/Button';
import settingApi from '@/apis/modules/setting.api';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  mainLogo: string;
  sloganLogo: string;
  slogan: string;
  hotline: string;
  email: string;
  branchName1: string;
  branchAddress1: string;
  branchName2: string;
  branchAddress2: string;
  facebookLink: string;
  instagramLink: string;
  youtubeLink: string;
  mainBanner: string;
  subBanner1: string;
  subBanner2: string;
  slideshowBanner1: string;
  slideshowBanner2: string;
  slideshowBanner3: string;
  description: string;
  serviceTitle1: string;
  serviceInfo1: string;
  serviceTitle2: string;
  serviceInfo2: string;
  serviceTitle3: string;
  serviceInfo3: string;
  serviceTitle4: string;
  serviceInfo4: string;
};

const Setting = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<FormData | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({});
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>();

  // Fetch settings from API
  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await settingApi.fetchSettings();
      if (response && response.setting) {
        setInitialData(response.setting);
        reset(response.setting);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      alert('Failed to fetch settings.');
    } finally {
      setLoading(false);
    }
  };

  // Upload file to Cloudinary (or similar service)
  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch('https://your-upload-endpoint.com/upload', {
      method: 'POST',
      body: formData,
    });
  
    const result = await response.json();
    return result.fileUrl; // URL file sau khi upload
  };
  

  // Handle file upload and preview
  const handleFileChange = (field: keyof FormData, file: File | null) => {
    if (file) {
      setUploadedFiles((prev) => ({ ...prev, [field]: file }));
      const objectURL = URL.createObjectURL(file);
      setValue(field, objectURL); // Display preview
    }
  };

  // Submit handler
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Kiểm tra dữ liệu trước khi gửi
      const requiredFields = [
        'mainLogo', 'sloganLogo', 'slogan', 'hotline', 'email',
        'branchName1', 'branchAddress1', 'branchName2', 'branchAddress2',
        'facebookLink', 'instagramLink', 'youtubeLink', 'mainBanner',
        'subBanner1', 'subBanner2', 'slideshowBanner1', 'slideshowBanner2',
        'slideshowBanner3', 'description', 'serviceTitle1', 'serviceInfo1',
        'serviceTitle2', 'serviceInfo2', 'serviceTitle3', 'serviceInfo3',
        'serviceTitle4', 'serviceInfo4',
      ];
  
      const missingFields = requiredFields.filter((field) => !data[field as keyof FormData]);
  
      console.log('Missing fields:', missingFields.length);
      if (missingFields.length > 0) {
        alert(`Missing fields: ${missingFields.join(', ')}`);
        return;
      }
  
      const response = await settingApi.updateSettings(data);
  
      if (response && response.success) {
        alert('Settings updated successfully!');
      } else {
        alert('Failed to update settings.');
      }
    } catch (error) {
      console.error('Failed to update settings:', error);
      alert('An error occurred while updating settings.');
    }
  };
  

  // Reset form to initial data
  const handleReset = () => {
    if (initialData) {
      reset(initialData);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="mx-auto max-w-4xl">
      <Breadcrumb pageName="Settings" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-sm border bg-white p-6 shadow-default dark:bg-boxdark"
        encType="multipart/form-data"
      >
        <h2 className="text-lg font-bold mb-6">Settings</h2>

        {/* Logos */}
        <section className="mb-6">
          <h3 className="font-semibold mb-4">Logos</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {['mainLogo', 'sloganLogo'].map((field) => (
              <div key={field}>
                <label>{field.replace(/([A-Z])/g, ' $1')}</label>
                <img
                  src={initialData?.[field as keyof FormData]}
                  alt={field}
                  className="w-32 h-32 object-cover mb-4"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="w-full mb-2"
                  onChange={(e) => handleFileChange(field as keyof FormData, e.target.files?.[0] || null)}
                />
                <input
                  {...register(field as keyof FormData, { required: true })}
                  className="w-full rounded border px-4 py-2"
                  readOnly
                />
                {errors[field as keyof FormData] && (
                  <p className="text-red-500 text-sm mt-1">{`${field} is required.`}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* General Information */}
        <section className="mb-6">
          <h3 className="font-semibold mb-4">General Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {['hotline', 'email'].map((field) => (
              <div key={field}>
                <label>{field.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  {...register(field as keyof FormData, { required: true })}
                  className="w-full rounded border px-4 py-2"
                />
                {errors[field as keyof FormData] && (
                  <p className="text-red-500 text-sm mt-1">{`${field} is required.`}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label>Slogan</label>
            <input
              {...register('slogan', { required: true })}
              className="w-full rounded border px-4 py-2"
            />
            {errors.slogan && <p className="text-red-500 text-sm mt-1">Slogan is required.</p>}
          </div>
          <div className="mt-4">
            <label>Description</label>
            <textarea
              {...register('description')}
              className="w-full rounded border px-4 py-2"
              rows={4}
            ></textarea>
          </div>
        </section>

        {/* Services */}
        <section className="mb-6">
          <h3 className="font-semibold mb-4">Services</h3>
          {Array.from({ length: 4 }, (_, i) => i + 1).map((num) => (
            <div key={num} className="mb-6">
              <label>Service Title {num}</label>
              <input
                {...register(`serviceTitle${num}` as const, { required: true })}
                className="w-full rounded border px-4 py-2 mb-2"
              />
              <label>Service Info {num}</label>
              <input
                {...register(`serviceInfo${num}` as const, { required: true })}
                className="w-full rounded border px-4 py-2"
              />
            </div>
          ))}
        </section>

        {/* Buttons */}
        <div className="flex justify-between mt-10">
          <Button
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
