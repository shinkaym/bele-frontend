import React, { useState } from "react";
import clsx from "clsx";
import SearchIcon from "@/components/icons/SearchIcon";

interface SearchProps {
  onSearch: (query: string) => void;
  size?: "sm" | "md" | "lg"; // Kích thước ô tìm kiếm
  radius?: "none" | "sm" | "md" | "lg" | "full"; // Độ bo góc ô tìm kiếm
  color?: string; // Màu tùy chỉnh
}

const Search: React.FC<SearchProps> = ({ onSearch, size = "md", radius = "md", color = "primary" }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  // Các lớp CSS cho ô tìm kiếm
  const inputStyles = clsx(
    "flex-grow px-4 py-2 text-gray-700 bg-transparent border-none focus:outline-none", 
    {
      "text-sm": size === "sm",  // Kích thước nhỏ
      "text-base": size === "md", // Kích thước vừa
      "text-lg": size === "lg", // Kích thước lớn
      "rounded-none": radius === "none", // Không bo góc
      "rounded-sm": radius === "sm", // Bo góc nhỏ
      "rounded-md": radius === "md", // Bo góc vừa
      "rounded-lg": radius === "lg", // Bo góc lớn
      "rounded-full": radius === "full", // Bo góc đầy
    }
  );

  // Các lớp CSS cho nút tìm kiếm
  const buttonStyles = clsx(
    "px-4 py-2 text-white hover:bg-opacity-90 focus:outline-none", 
    
    {
      "rounded-e-none": radius === "none", // Không bo góc
      "rounded-e-sm": radius === "sm", // Bo góc nhỏ
      "rounded-e-md": radius === "md", // Bo góc vừa
      "rounded-e-lg": radius === "lg", // Bo góc lớn
      "rounded-e-full": radius === "full", // Bo góc đầy
      [`bg-${color}`]: color, // Nền tùy chỉnh màu
    }
  );

  return (
    <div className="flex items-center w-full max-w-md bg-white rounded-lg shadow-md">
      {/* Search Input */}
      <input
        type="search"
        className={inputStyles}
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      {/* Search Button */}
      <button
        onClick={handleSearch}
        className={buttonStyles}
      >
        <SearchIcon className='w-6 h-6'/>
      </button>
    </div>
  );
};

export default Search;
