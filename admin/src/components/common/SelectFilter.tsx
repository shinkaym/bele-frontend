// components/common/SelectFilter.tsx

import React from 'react';

type Option = {
  value: number | string;
  title: string;
};

type SelectFilterProps = {
  label: string;
  value: number | string | null;
  options: Option[];
  onChange: (value: number | string) => void;
};

const SelectFilter: React.FC<SelectFilterProps> = ({ label, value, options, onChange }) => {
  return (
    <div>
      <label>{label}: </label>
      <select
        value={value ?? ''}
        onChange={(e) => {
          const n = e.target.value ? (typeof value === 'number' ? parseInt(e.target.value) : e.target.value) : '';
          if (n !== '') {
            onChange(n);
          }
        }}
      >
        <option value=''>
            All
          </option>
        {options.map((s) => (
          <option key={s.value} value={s.value}>
            {s.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
