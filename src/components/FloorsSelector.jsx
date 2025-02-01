import React, { useState, useRef } from "react";
import floorData from "../components/floors_data.json";
import original1 from "../assets/floor Plans/original1.png";
import original2 from "../assets/floor Plans/original2.png";
import hoverZones from "./hoverZones";

import R101 from "../assets/unit plans/Type B TWO BEDROOM TYPICAL FLAT-101.png";
import R102 from "../assets/unit plans/Type A TWO BEDROOM TYPICAL FLAT-102.png";
import R103 from "../assets/unit plans/Type A STUDIO TYPICAL FLAT-103.png";
import R104 from "../assets/unit plans/TypeB STUDIO TYPICAL FLAT-104.png";
import R105 from "../assets/unit plans/TYPICAL FLAT-105 Type C STUDIO.png";
import R106 from "../assets/unit plans/TYPICAL FLAT-106 Type B ONE BEDROOM.png";
import R107 from "../assets/unit plans/Type A ONE BEDROOM TYPICAL FLAT-107.png";

import R201_801 from "../assets/unit plans/TYPICAL FLAT-201 TO 801 Type B TWO BEDROOM.png";
import R202_802 from "../assets/unit plans/Type A TWO BEDROOM TYPICAL FLAT-202 TO 802.png";
import R203_803 from "../assets/unit plans/Type A STUDIO TYPICAL FLAT-203 TO 803.png";
import R204_804 from "../assets/unit plans/TypeB STUDIO TYPICAL FLAT-204 TO 804.png";
import R205_805 from "../assets/unit plans/TYPICAL FLAT-205 TO 805 Type C STUDIO.png";
import R206_806 from "../assets/unit plans/TYPICAL FLAT-206 TO 806 Type B ONE BEDROOM.png";
import R207_807 from "../assets/unit plans/Type A ONE BEDROOM TYPICAL FLAT-207 TO 807.png";

import image107 from "../assets/floor Plans/107.png";
import image106 from "../assets/floor Plans/106.png";
import image105 from "../assets/floor Plans/105.png";
import image104 from "../assets/floor Plans/104.png";
import image103 from "../assets/floor Plans/103.png";
import image102 from "../assets/floor Plans/102.png";
import image101 from "../assets/floor Plans/101.png";
import image207 from "../assets/floor Plans/207.png";
import image206 from "../assets/floor Plans/206.png";
import image205 from "../assets/floor Plans/205.png";
import image204 from "../assets/floor Plans/204.png";
import image203 from "../assets/floor Plans/203.png";
import image202 from "../assets/floor Plans/202.png";
import image201 from "../assets/floor Plans/201.png";
import { GiLift } from "react-icons/gi";

import "./popup.css";
import { TbRulerMeasure } from "react-icons/tb";

const FloorSelector = () => {
  const [selectedFloor, setSelectedFloor] = useState(floorData[0].floor);
  const [currentImage, setCurrentImage] = useState(original1);
  const [popupInfo, setPopupInfo] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1); // Keep track of zoom level
  const [isZooming, setIsZooming] = useState(false);

  const imageRef = useRef(null); // Reference for the image element

  const handleFloorSelect = (floor) => {
    setSelectedFloor(floor);
    setCurrentImage(floor === 1 ? original1 : original2);
  };

  const getImage = (image) => {
    if (image === "Type B TWO BEDROOM TYPICAL FLAT-101.png") {
      return R101;
    }
    if (image === "Type A TWO BEDROOM TYPICAL FLAT-102.png") {
      return R102;
    }
    if (image === "Type A STUDIO TYPICAL FLAT-103.png") {
      return R103;
    }
    if (image === "TypeB STUDIO TYPICAL FLAT-104.png") {
      return R104;
    }
    if (image === "TYPICAL FLAT-105 Type C STUDIO.png") {
      return R105;
    }
    if (image === "TYPICAL FLAT-106 Type B ONE BEDROOM.png") {
      return R106;
    }
    if (image === "Type A ONE BEDROOM TYPICAL FLAT-107.png") {
      return R107;
    }
    if (image === "TYPICAL FLAT-201 TO 801 Type B TWO BEDROOM.png") {
      return R201_801;
    }
    if (image === "TYPICAL FLAT-202 TO 802 Type B TWO BEDROOM.png") {
      return R202_802;
    }
    if (image === "Type A STUDIO TYPICAL FLAT-203 TO 803.png") {
      return R203_803;
    }
    if (image === "TypeB STUDIO TYPICAL FLAT-204 TO 804.png") {
      return R204_804;
    }
    if (image === "TYPICAL FLAT-205 TO 805 Type C STUDIO.png") {
      return R205_805;
    }
    if (image === "TYPICAL FLAT-206 TO 806 Type B ONE BEDROOM.png") {
      return R206_806;
    }
    if (image === "Type A ONE BEDROOM TYPICAL FLAT-207 TO 807.png") {
      return R207_807;
    }
    return null;
  };

  // Handle zoom with wheel event

  const handleHover = (corner, event) => {
    const currentFloor = floorData.find(
      (floor) => floor.floor === selectedFloor
    );
    const unit = currentFloor?.units.find((unit) => unit.unitNo === corner);

    // Calculate popup position dynamically
    const popupX =
      Math.min(Math.max(event.clientX + 20, 20), window.innerWidth - 320) - 200;
    const popupY =
      Math.min(Math.max(event.clientY - 10, 10), window.innerHeight - 400) + 50;

    setPopupPosition({ x: popupX, y: popupY });

    // Dynamically determine the image based on the floor number
    const currentImage = corner.startsWith(1)
      ? eval(`image${corner}`)
      : eval(`image2${corner.slice(1)}`);

    setCurrentImage(currentImage); // Set the selected image
    setPopupInfo(unit); // Set the popup info dynamically
  };

  const resetImage = () => {
    if (selectedFloor === 1) {
      setCurrentImage(original1);
      setPopupInfo(null); // Hide popup
    } else {
      setCurrentImage(original2);
      setPopupInfo(null); // Hide popup
    }
  };
  const handleZoom = (e) => {
    e.preventDefault();
    const rect = imageRef.current.getBoundingClientRect(); // Get the image's bounding rect
    const cursorX = e.clientX - rect.left; // Get X relative to the image
    const cursorY = e.clientY - rect.top; // Get Y relative to the image

    let newZoomLevel = zoomLevel;
    if (e.deltaY < 0) {
      newZoomLevel = Math.min(zoomLevel + 0.1, 2); // Limit max zoom
    } else if (e.deltaY > 0) {
      newZoomLevel = Math.max(zoomLevel - 0.1, 1); // Limit min zoom
    }

    setZoomLevel(newZoomLevel);

    // Update the zooming effect to center on the cursor position
    setIsZooming(newZoomLevel > 1); // Hide labels if zoomed in

    // Update the transformOrigin to zoom towards the cursor position
    const scaleFactor = newZoomLevel / zoomLevel; // Calculate scale factor
    const originX = ((cursorX / rect.width) * 100).toFixed(2);
    const originY = ((cursorY / rect.height) * 100).toFixed(2);
    imageRef.current.style.transformOrigin = `${originX}% ${originY}%`; // Set the zoom origin
  };
  const floorListRef = useRef(null);

  const handleArrowClick = (direction) => {
    const container = floorListRef.current;
    const scrollAmount = 3 * 40; // Adjust based on your floor height (40px for each floor)

    if (direction === 'up') {
      container.scrollBy({
        top: -scrollAmount,
        behavior: 'smooth',
      });
    } else if (direction === 'down') {
      container.scrollBy({
        top: scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div className="flex gap-6 max-w-6xl h-[90vh] items-center justify-center m-auto p-12">
      <div className="flex-1 h-full p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-10 text-gray-600">
          Floor {selectedFloor} Plan
        </h2>
        <div
          className={`flex justify-center items-center h-[25rem] w-[25rem] m-auto relative ${
            isZooming ? "overflow-hidden" : ""
          }`}
          onMouseLeave={resetImage}
          onWheel={handleZoom} // Add wheel event listener
        >
          <img
            ref={imageRef} // Add this ref
            src={currentImage}
            alt={`Floor ${selectedFloor} Plan`}
            className="w-full h-full rounded"
            style={{
              transform: `scale(${zoomLevel})`, // Apply zoom level
              transformOrigin: "center center", // Default transform origin
              padding: zoomLevel > 1 ? "20px" : "0", // Add padding when zoomed
            }}
          />

          {hoverZones[selectedFloor] &&
            Object.keys(hoverZones[selectedFloor]).map((corner) => {
              const { top, bottom, left, right, width, height } =
                hoverZones[selectedFloor][corner];
              const apartmentNumber = `${selectedFloor}${corner.slice(1)}`;
              if (isZooming) return null;

              // Mapping apartment types (to be used for floors 2-8)
              const apartmentTypeMap = {
                "01": "two bedrooms",
                "02": "two bedrooms",
                "03": "studio",
                "04": "studio",
                "05": "studio",
                "06": "one bedroom",
                "07": "one bedroom",
              };

              // Position map for first floor
              const firstFloorPositions = {
                101: { top: "10px", left: "-120px" },
                102: { top: "52px", left: "148px" },
                103: { top: "22px", left: "148px" },
                104: { top: "32px", left: "148px" },
                105: { top: "34px", left: "148px" },
                106: { top: "108px", left: "148px" },
                107: { top: "107px", left: "-115px" },
              };

              // Position map for floors 2-8 (same for all corresponding apartments)
              const otherFloorsPositions = {
                "01": { top: "8px", left: "-120px" },
                "02": { top: "46px", left: "90px" },
                "03": { top: "15px", left: "95px" },
                "04": { top: "15px", left: "95px" },
                "05": { top: "6px", left: "95px" },
                "06": { top: "43px", left: "90px" },
                "07": { top: "44px", left: "-112px" },
              };

              let adjustedTop, adjustedLeft;

              if (selectedFloor === 1) {
                adjustedTop = firstFloorPositions[apartmentNumber]?.top || top;
                adjustedLeft =
                  firstFloorPositions[apartmentNumber]?.left || left;
              } else {
                const apartmentType = apartmentNumber.slice(-2); // "01", "02", etc.
                adjustedTop = otherFloorsPositions[apartmentType]?.top || top;
                adjustedLeft =
                  otherFloorsPositions[apartmentType]?.left || left;
              }

              // Get the apartment type based on the last 2 digits (like "01", "02", etc.)
              const apartmentType =
                apartmentTypeMap[corner.slice(-2)] || "Unknown type";
              const apartmentLabel = `${selectedFloor}${corner.slice(
                1
              )} ${apartmentType}`;

              return (
                <div
                  key={corner}
                  onMouseEnter={(e) => handleHover(corner, e)}
                  style={{
                    top,
                    bottom,
                    left,
                    right,
                    width,
                    height,
                    position: "absolute",
                  }}
                  className="bg-transparent cursor-pointer"
                >
                  <div
                    className="absolute text-teal-700 text-sm"
                    style={{
                      top: adjustedTop,
                      left: adjustedLeft,
                    }}
                  >
                    {/* Display apartment number and type */}
                    <span className="whitespace-nowrap">{apartmentLabel}</span>
                  </div>
                </div>
              );
            })}

          {/* Popup */}
          <div
            className={`popup ${popupInfo ? "show" : "hide"}`}
            style={{
              left: `${popupPosition.x}px`,
              top: `${popupPosition.y}px`,
            }}
          >
            {popupInfo && (
              <>
                <div className="flex items-center justify-center">
                  <img
                    src={getImage(popupInfo.image)}
                    alt={popupInfo.type}
                    className="w-[12rem] h-[12rem] rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <h3>{popupInfo.type}</h3>
                  <h3># {popupInfo.unitNo}</h3>
                </div>
                <div className="info-row">
                  <span>
                    <TbRulerMeasure /> {popupInfo.totalAreaSqFt} sq.ft.
                  </span>
                  <span>
                    <GiLift />
                    {selectedFloor} floor
                  </span>
                </div>

                <button className="sold-btn">{popupInfo.status}</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Floor Selector with Arrows */}
      <div className="flex flex-col items-center w-20 overflow-hidden rounded-lg mt-20">
      <button
        className="text-gray-600 hover:text-gray-900 py-2"
        onClick={() => handleArrowClick('up')}
      >
        ▲
      </button>
      <div
        ref={floorListRef} // reference to the container
        className="overflow-y-auto h-[10rem] w-full no-scrollbar  " // fixed height for 3 floors
      >
        {floorData.map((floor) => (
          <div
            key={floor.floor}
            className={`py-2 text-center cursor-pointer transition-all duration-200 ${
              selectedFloor === floor.floor
                ? 'bg-gray-700 text-white font-bold'
                : 'bg-white hover:bg-gray-200'
            }`}
            onClick={() => handleFloorSelect(floor.floor)}
          >
            {floor.floor}
          </div>
        ))}
      </div>
      {/* Down Arrow */}
      <button
        className="text-gray-600 hover:text-gray-900 py-2"
        onClick={() => handleArrowClick('down')}
      >
        ▼
      </button>
    </div>
    </div>
  );
};

export default FloorSelector;
