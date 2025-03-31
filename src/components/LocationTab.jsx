import React from "react";

function LocationTab(props) {
  const handleClick = () => {
    props.onClick(props.name);
  };

  return (
    <button
      className={`
        px-3 py-2 
        text-sm font-medium 
        transition-all duration-200 
        rounded-full 
        flex items-center justify-center 
        min-w-16
        ${
          props.selectedLocation === props.name
            ? "bg-blue-500 text-white shadow-sm"
            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
        }
      `}
      onClick={handleClick}
      aria-pressed={props.selectedLocation === props.name}
    >
      {props.name}
    </button>
  );
}

export default LocationTab;