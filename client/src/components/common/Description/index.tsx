import React, { useState } from 'react';

interface HiddenDescriptionProps {
  htmlContent: string; // Accepts HTML content as a string
  maxHeight?: string; // Tailwind max height class (default: 'max-h-16')
  showMoreText?: string; // Text for "show more" button (default: 'Xem thêm')
  showLessText?: string; // Text for "show less" button (default: 'Ẩn bớt')
}

const Description: React.FC<HiddenDescriptionProps> = ({
  htmlContent,
  maxHeight = 'max-h-16',
  showMoreText = 'Xem thêm',
  showLessText = 'Ẩn bớt',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-full text-justify' : maxHeight
        }`}
        dangerouslySetInnerHTML={{ __html: htmlContent }} // Render HTML content
      >
      </div>
      <div className='text-center my-3'>
      <button
        onClick={toggleDescription}
        className="hover:bg-gray-400 hover:text-white border border-gray-400 px-24 py-2 rounded-full text-black font-semibold"
      >
        {isExpanded ? showLessText : showMoreText}
      </button>
      </div>
    </div>
  );
};

export default Description;
