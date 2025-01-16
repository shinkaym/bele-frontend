import React, { useState } from 'react';

interface DropdownProps {
  onSelect: (value: number) => void;
}

const RatingDropdown: React.FC<DropdownProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (value: number) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <div className="relative w-60 mb-5">
      <select
        className="block w-full bg-white border border-gray-200 rounded-md shadow-sm py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        value={selected || ''}
        onChange={(e) => handleSelect(Number(e.target.value))}
      >
        <option value="">
          Rating
        </option>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RatingDropdown;
