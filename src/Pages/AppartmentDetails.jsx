import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const ApartmentDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { unit, image } = state || {}; // Ensure state is handled safely

  if (!unit) {
    return <div>Apartment not found</div>;
  }

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="max-w-8xl mx-auto p-4 md:py-20 md:px-5">
      {/* Navbar */}
      <div className="flex flex-col md:flex-row justify-between items-center py-4 px-4 md:px-6 space-y-4 md:space-y-0">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-gray-600">
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
            document={<ApartmentPDF selectedUnitNo={unit} imgURL={image} />}
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
              src={compass}
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
                src={image}
                alt={`Unit ${unit.unitNo}`}
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
          <h2 className="text-xl font-semibold mb-4">{unit.type}</h2>
          <p className="text-gray-500 mb-4">
            Floor {unit.unitNo.charAt(0)} | Unit #{unit.unitNo} |{" "}
            {unit.totalAreaSqFt} sq.ft
          </p>
          <Link
            to={"/get-in-touch"}
            className="bg-gray-900 hover:bg-gray-950 transition-all duration-200 text-white w-full text-center font-bold block py-2 px-6 mb-2 rounded-md"
          >
            Get in touch
          </Link>

          {/* Scrollable Content for Small Screens */}
          <div className="space-y-4 text-gray-600 mt-3 sm:h-48 sm:overflow-y-auto md:h-auto">
            {/* Interest */}
            <div className="flex items-center">
              <span className="w-4 h-4 bg-orange-500 rounded-full inline-block mr-2"></span>
              <span>Interest</span>
            </div>

            {/* Bedroom Information */}
            <p className="flex items-center">
              <span className="w-4 h-4 mr-2">
                <MdBed />
              </span>
              {unit.type.toLowerCase().includes("studio")
                ? "Studio"
                : `${unit.type.match(/\d+/)?.[0]} bedroom(s)`}
            </p>

            {/* Total Area */}
            <p className="flex items-center">
              <span className="w-4 h-4 mr-2">
                <TbRulerMeasure />
              </span>
              Total area: {unit.totalAreaSqFt} sq.ft
            </p>

            {/* Living Area */}
            <p className="flex items-center justify-between">
              Living area:{" "}
              <span className="font-bold text-gray-900">
                {unit.suiteAreaSqFt} sq.ft
              </span>
            </p>
            <hr />

            {/* Balcony Area */}
            <p className="flex items-center justify-between">
              Balcony area:{" "}
              <span className="font-bold text-gray-900">
                {unit.balconyAreaSqFt} sq.ft
              </span>
            </p>
            <hr />

            {/* Price */}
            <p className="flex items-center justify-between">
              Price:{" "}
              <span className="font-bold text-gray-900">
                {unit.sellingPriceAED} AED
              </span>
            </p>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetails;
