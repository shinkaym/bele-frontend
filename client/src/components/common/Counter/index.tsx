import React, { useState } from "react";
import "./index.css";
const Counter = ({ onValueChange }) => {
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onValueChange(newCount);
  };

  const handleDecrement = () => {
    const newCount = count > 1 ? count - 1 : 1;
    setCount(newCount);
    onValueChange(newCount);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setCount(value);
      onValueChange(value);
    } else if (e.target.value === "") {
      setCount(1);
      onValueChange(1);
    }
  };

  return (
    <div  style={{borderColor:"black"}}className="flex items-center border rounded-full w-24 h-10 justify-between px-2">
      <button className="text-lg font-bold" onClick={handleDecrement}>
        -
      </button>
      <input
        type="number"
        value={count}
        onChange={handleInputChange}
        className="w-12 text-center border-none focus:outline-none appearance-none"
      />
      <button className="text-lg font-bold" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

export default Counter;
