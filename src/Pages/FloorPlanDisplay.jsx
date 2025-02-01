import React, { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import data from "../components/floors_data.json";

const FloorPlanDisplay = () => {
  const [viewBy, setViewBy] = useState("unit");
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  const generateUnitNumber = (floor, unitIndex) => {
    return `${floor}0${unitIndex + 1}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-blue-500";
      case "reserved":
        return "bg-neutral-500";
      case "sold":
        return "bg-red-600";
      case "interest":
        return "bg-orange-500";
      case "resale":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-full h-full transition-all duration-300 p-4 md:p-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Select Dropdown */}
        <div className="mb-4">
          <label htmlFor="viewBy" className="text-sm text-gray-600">
            Show:
          </label>
          <select
            id="viewBy"
            value={viewBy}
            onChange={(e) => setViewBy(e.target.value)}
            className="text-gray-700 font-bold p-2 cursor-pointer rounded text-sm focus:outline-none focus:ring-0"
          >
            <option value="unit">by unit number</option>
            <option value="area">by area</option>
          </select>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 md:gap-3 mt-4 items-center justify-center text-gray-600">
          <div className="flex items-center text-xs md:text-sm justify-center gap-1 md:gap-2">
            <div className="w-4 h-4 md:w-5 md:h-5 bg-blue-400 rounded"></div>
            <span>available</span>
          </div>
          <div className="flex text-xs md:text-sm items-center gap-1 md:gap-2">
            <div className="w-4 h-4 md:w-5 md:h-5 bg-neutral-400 rounded"></div>
            <span>reserved</span>
          </div>
          <div className="flex text-xs md:text-sm items-center gap-1 md:gap-2">
            <div className="w-4 h-4 md:w-5 md:h-5 bg-red-600 rounded"></div>
            <span>sold</span>
          </div>
          <div className="flex text-xs md:text-sm items-center gap-1 md:gap-2">
            <div className="w-4 h-4 md:w-5 md:h-5 bg-orange-300 rounded"></div>
            <span>interest</span>
          </div>
          <div className="flex text-xs md:text-sm items-center gap-1 md:gap-2">
            <div className="w-4 h-4 md:w-5 md:h-5 bg-purple-400 rounded"></div>
            <span>resale</span>
          </div>
        </div>

        <div className="rounded-lg">
          <div className="origin-top-left h-[60vh] md:h-[70vh] duration-200 overflow-y-scroll mt-8 md:mt-14 mb-16">
            <div
              className="h-full mt-6 md:mt-10"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
                transition: "transform 0.3s ease",
              }}
            >
              {[...data].reverse().map((floor) => (
                <div key={floor.floor} className="flex rounded-lg mb-2">
                  <div className="w-8 md:w-10 flex items-center justify-center text-base md:text-xl bg-gray-100 border">
                    {floor.floor}
                  </div>
                  <div className="flex flex-wrap p-0.5 md:p-1 gap-0.5 md:gap-1 ml-2 md:ml-5">
                    {floor.units.map((unit, index) => (
                      <div
                        key={unit.unitNo}
                        className={`cursor-pointer text-white hover:shadow-md hover:scale-110 md:hover:scale-125 transition-all duration-200 rounded-md md:rounded-lg ${getStatusColor(
                          unit.status
                        )} p-1 md:p-2 min-w-[32px] md:min-w-[38px] text-center`}
                      >
                        <div className="text-xs md:text-sm font-bold">
                          {viewBy === "unit"
                            ? generateUnitNumber(floor.floor, index)
                            : Math.round(unit.totalAreaSqFt)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Controls */}
      {/* Zoom Controls */}
      <div className="fixed left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2 z-50 bottom-20 md:bottom-8 md:hidden">
        <button
          onClick={handleZoomOut}
          className="p-1 rounded-full"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5 text-gray-600" />
        </button>
        <div className="w-16 h-0.5 bg-gray-200 rounded-full">
          <div
            className="h-full bg-gray-400 rounded-full transition-all duration-200"
            style={{ width: `${((zoom - 0.5) * 100) / 1.5}%` }}
          />
        </div>
        <button
          onClick={handleZoomIn}
          className="p-1 rounded-full"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default FloorPlanDisplay;
