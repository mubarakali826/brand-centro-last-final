import React from "react";
import placeholder from "../asset/placeholder.jpg"; // Update the correct path

const Building3D = () => {
  return (
    <div>
      <img
        src={placeholder}
        alt="Building View"
        className="w-full h-64 object-cover"
      />
    </div>
  );
};

export default Building3D;
