import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegEye, FaLayerGroup, FaThLarge } from "react-icons/fa";
import { TbView360Number } from "react-icons/tb";
import { FiLayers } from "react-icons/fi";

const NavigationBar = () => {
  const location = useLocation(); // Get current URL location

  // Determine the active tab based on the current URL path
  const getActiveTab = () => {
    if (location.pathname.includes("3d-view")) return "3d";
    if (location.pathname.includes("2d-view")) return "2d";
    if (location.pathname.includes("floors")) return "floors";
    return "3d"; // Default tab if none of the above match
  };

  const activeTab = getActiveTab(); // Set active tab based on URL

  return (
    <div className="fixed top-8 right-11 border z-50 rounded-lg overflow-hidden">
      <div className="flex justify-center ">
        {/* 3D View */}
        <Link
          to="/3d-view"
          className={`flex items-center px-4 py-3 rounded-l-md ${
            activeTab === "3d"
              ? "bg-gray-700 text-white"
              : "bg-white text-gray-900 hover:bg-gray-100"
          } transition`}
        >
          <TbView360Number className="w-5 h-5 mr-2" />
          3D View
        </Link>

        {/* 2D View */}

        {/* Floors */}
        <Link
          to="/floors"
          className={`flex items-center px-4 py-3 border-x  ${
            activeTab === "floors"
              ? "bg-gray-700 text-white"
              : "bg-white text-gray-900 hover:bg-gray-100"
          } transition`}
        >
          <FiLayers className="w-5 h-5 mr-2" />
          Floors
        </Link>

        <Link
          to="/2d-view"
          className={`flex items-center px-4 py-3 ${
            activeTab === "2d"
              ? "bg-gray-700 text-white"
              : "bg-white text-gray-900 hover:bg-gray-100"
          } transition`}
        >
          <FaThLarge className="w-5 h-5 mr-2" />
          2D View
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
