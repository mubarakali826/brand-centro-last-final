

import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { BlobProvider } from "@react-pdf/renderer";
import ApartmentPDF from "../components/PdfTemplate"; // Adjust path as needed
import compass from "../assets/floor Plans/101.png";
import map2 from "../assets/map2.png";
import compass2 from "../assets/Compass.png";
import { FaChevronLeft } from "react-icons/fa";
import { TbRulerMeasure } from "react-icons/tb";
import { MdBed } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
import { RiFileCopyLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import floorData from "../components/floors_data.json";
import original1 from "../assets/floor Plans/original1.png";
import original2 from "../assets/floor Plans/original2.png";





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





const StatusPage = () => {
  const navigate = useNavigate();
  const { unitNumber } = useParams(); // Get the unit number from URL
  const selectedFloor = Number(String(unitNumber)[0]);
  const [currentImage, setCurrentImage] = useState(original1);

  const currentFloor = floorData.find((floor) => floor.floor === selectedFloor);
  const unitData = currentFloor?.units.find(
    (unit) => unit.unitNo === unitNumber
  );
  useEffect(() => {
    const Img =
      selectedFloor == 1
        ? eval(`image${unitNumber}`)
        : eval(`image2${unitNumber.slice(1)}`);

    if (Img) {
      setCurrentImage(Img);
    }
  }, [unitNumber, selectedFloor]);

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

  
  if (!unitData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">Unit Not Found</h1>
        <p className="text-lg text-gray-600 mt-4">
          The specified unit does not exist.
        </p>
      </div>
    );
  }

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:py-20 md:px-5">
      {/* Navbar */}
      <div className="flex flex-col md:flex-row justify-between items-center py-4 px-4 md:px-6  space-y-4 md:space-y-0">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-600">
          <FaChevronLeft className="text-black" />
          <a
            className="text-black font-bold cursor-pointer text-lg hover:underline"
            onClick={handleNavigate}
          >
            All units
          </a>
          <span className="hidden md:inline text-lg">/</span>
          <span className="hidden md:inline text-lg">About the apartment</span>
        </div>

        {/* Action Links */}
        <div className="flex items-center space-x-4">
          <BlobProvider
            document={
              <ApartmentPDF selectedUnitNo={unitData} imgURL={compass} />
            }
          >
            {({ url, loading, error }) => {
              if (loading) {
                return (
                  <div className="flex items-center space-x-1 text-gray-400">
                    <FaFilePdf />
                    <span>Loading...</span>
                  </div>
                );
              }

              if (error) {
                return (
                  <div className="flex items-center space-x-1 text-red-500">
                    <FaFilePdf />
                    <span>Error loading PDF</span>
                  </div>
                );
              }

              return (
                <a
                  onClick={() => window.open(url, "_blank")}
                  className="flex items-center space-x-1 text-gray-600 hover:underline cursor-pointer"
                >
                  <FaFilePdf />
                  <span>Sales Offer</span>
                </a>
              );
            }}
          </BlobProvider>
          <a
            href="#"
            className="flex items-center space-x-1 text-gray-600 hover:underline"
          >
            <RiFileCopyLine />
            <span>Copy link</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-1 text-gray-600 hover:underline"
          >
            <CiHeart />
            <span>Save</span>
          </a>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Compass Section */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="p-2 border rounded-lg shadow flex items-center justify-center">
            <img
              src={currentImage}
              alt="Compass"
              className="w-28 h-28 object-contain"
            />
          </div>
          <div className="p-2 border rounded-lg shadow flex items-center justify-center">
            <img src={map2} alt="map" className="w-28 h-28 object-contain" />
          </div>
          <div className="p-2 border rounded-lg shadow flex items-center justify-center">
            <img
              src={compass2}
              alt="compass2"
              className="w-28 h-28 object-contain"
            />
          </div>
        </div>

        {/* Main Unit Plan Image and Details */}
        <div className="md:col-span-6">
          <div className="bg-white rounded-lg shadow p-4 flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[30rem]">
              <img
                src={getImage(unitData.image)}
                alt={`Unit ${unitData.unitNo}`}
                className="absolute inset-0 w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          {/* <div className="flex justify-center gap-4 mt-4">
            <button className="px-6 py-2 border border-gray-300 rounded-md font-medium hover:bg-gray-100">
              Layouts
            </button>
            <button className="px-6 py-2 border border-gray-300 rounded-md font-medium hover:bg-gray-100">
              Facade
            </button>
          </div> */}
        </div>

        {/* Apartment Information */}
        <div className="md:col-span-4 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{unitData.type}</h2>
          <p className="text-gray-500 mb-4">
            Floor {unitData.unitNo.charAt(0)} | Unit #{unitData.unitNo} |{" "}
            {unitData.totalAreaSqFt} sq.ft
          </p>
          <Link
            to={"/get-in-touch"}
            className="bg-gray-900 hover:bg-gray-950 transition-all duration-200 text-white w-full text-center font-bold block py-2 px-6 mb-2 rounded-md"
          >
            Get in touch
          </Link>

          <div className="space-y-4 text-gray-600 mt-3 sm:h-48 sm:overflow-y-auto md:h-auto">
            <div className="flex items-center">
              <span className="w-4 h-4 bg-orange-500 rounded-full inline-block mr-2"></span>
              <span>Interest</span>
            </div>

            <p className="flex items-center">
              <span className="w-4 h-4 mr-2">
                <MdBed />
              </span>
              {unitData.type.toLowerCase().includes("studio")
                ? "Studio"
                : `${unitData.type.match(/\d+/)?.[0]} bedroom(s)`}
            </p>

            <p className="flex items-center">
              <span className="w-4 h-4 mr-2">
                <TbRulerMeasure />
              </span>
              Total area: {unitData.totalAreaSqFt} sq.ft
            </p>
            <hr />

            <p className="flex items-center justify-between">
              Living area:{" "}
              <span className="font-bold text-gray-900">
                {unitData.suiteAreaSqFt} sq.ft
              </span>
            </p>
            <hr />

            <p className="flex items-center justify-between">
              Balcony area:{" "}
              <span className="font-bold text-gray-900">
                {unitData.balconyAreaSqFt} sq.ft
              </span>
            </p>
            <hr />

            <p className="flex items-center justify-between">
              Price:{" "}
              <span className="font-bold text-gray-900">
                {unitData.sellingPriceAED} AED
              </span>
            </p>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
