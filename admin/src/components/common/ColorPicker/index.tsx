import { forwardRef } from 'react';
import { Control, Controller } from 'react-hook-form';

interface ColorOption {
  value: string;
  label: string;
}

interface ColorPickerProps {
  options: ColorOption[];
  control: Control<any>;
  name: string;
  type?: 'radio' | 'checkbox';
  layout?: 'vertical' | 'horizontal';
  label?: string;
  isDisabled?:boolean
}

const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ options, control, name, type = 'radio', layout = 'horizontal', label , isDisabled = false }, ref) => {
    return (
      <div ref={ref}  className={`color-picker ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {label && <label className='mb-2 block text-black dark:text-white'>{label}</label>}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className={`flex ${layout === 'horizontal' ? 'flex-wrap' : 'flex-col'}`}>
              {options.map((option) => (
                <label
                  key={option.value}
                  htmlFor={option.value}
                  className='relative cursor-pointer m-2 flex items-center'
                >
                  <input
                    type={type}
                    id={option.value}
                    value={option.value}
                    checked={
                      type === 'checkbox'
                        ? field.value?.includes(option.value)
                        : field.value === option.value
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      if (type === 'checkbox') {
                        const updatedValue = field.value?.includes(value)
                          ? field.value.filter((v: string) => v !== value)
                          : [...(field.value || []), value];
                        field.onChange(updatedValue);
                      } else {
                        field.onChange(value);
                      }
                    }}
                    className='sr-only'
                  />
                  <div
                    className={`h-8 w-8 rounded-full border-2 flex items-center justify-center ${
                      field.value?.includes(option.value) || field.value === option.value
                        ? 'border-primary'
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: option.value }}
                  ></div>
                  <span className='ml-2'>{option.label}</span>
                </label>
              ))}
            </div>
          )}
        />
      </div>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
