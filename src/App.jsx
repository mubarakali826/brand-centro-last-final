import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import floors_Data from "./components/floors_data.json";
import UnitCard from "./components/UnitCard";
import Filters from "./components/Filter";
import { CiHeart } from "react-icons/ci";
import Wishlist from "./Pages/Wishlist";
import NavigationBar from "./components/NavigationBar";
import { motion } from "framer-motion";
import image from "/Brand Centro 1.jpg";
import { IoIosArrowBack, IoIosArrowForward, IoMdHeart } from "react-icons/io";
import { CiSliderHorizontal } from "react-icons/ci";
import FloorPlanDisplay from "./Pages/FloorPlanDisplay";
import ModelView from "./Pages/ModelView";
import Floors from "./Pages/Floors";
import ApartmentDetails from "./Pages/AppartmentDetails";
import GetInTouch from "./components/GetInTouch";
import PdfFile from "./components/PdfTemplate";
import StatusPage from "./Pages/StatusPage";
import { FaFilter, FaHome, FaCube, FaTable, FaHeart } from "react-icons/fa";
import { TbView360Number } from "react-icons/tb";
import Loader from "./components/Loader";

const AppContent = ({
  wishListArray,
  setWishListArray,
  filteredUnits,
  filters,
  updateFilters,
  handleCloseSidebar,
  isSideBarOpen,
  setIsSideBarOpen,
}) => {
  const location = useLocation();
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const globalStyles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;
  useEffect(() => {
    if (location.pathname === "/apartment-details") {
      setIsSideBarOpen(false);
    }
  }, [location.pathname, setIsSideBarOpen]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalStyles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Screen size and sidebar management
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // On desktop, keep sidebar open by default
      if (!mobile) {
        setIsSideBarOpen(true);
      } else {
        // On mobile, close sidebar by default
        setIsSideBarOpen(false);
      }
    };

    window.addEventListener("resize", checkScreenSize);
    checkScreenSize();

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [setIsSideBarOpen]);

  useEffect(() => {
    if (location.pathname === "/floors") {
      setIsSideBarOpen(false);
    }
  }, [location.pathname, setIsSideBarOpen]);

  useEffect(() => {
    if (wishListArray.length >= 0) {
      setScale(1.3);
      setTimeout(() => setScale(1), 200);
    }
  }, [wishListArray]);
  const MobileHeader = () => {
    const location = useLocation();

    if (location.pathname !== "/") return null;

    return (
      <header className="md:hidden fixed top-0 left-0 right-0 z-[1500] py-4 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-[#c89c4e] ml-2 drop-shadow-md">
            Brand Centro
          </h1>
        </div>
      </header>
    );
  };
  // Mobile Sidebar Slide-in
  const MobileSidebar = () => (
    <aside
      className={`
        fixed inset-0 z-[200]  
        transform transition-transform duration-300 
        ${isSideBarOpen ? "translate-x-0" : "translate-x-full"}
        bg-white 
        overflow-y-auto
        no-scrollbar
      `}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <img src="logo1.png" alt="BrandCentro" className="w-24 h-auto" />
        <button onClick={handleCloseSidebar} className="text-gray-600 p-2">
          Close
        </button>
      </div>
      <div className="p-4">
        <Filters
          filters={filters}
          updateFilters={updateFilters}
          floors_Data={floors_Data}
        />
        <div className="mt-6">
          {filteredUnits.length > 0 ? (
            filteredUnits.map((floor) => (
              <div key={floor.floor} className="mb-6">
                <h4 className="text-md font-semibold mb-2">
                  Floor {floor.floor}
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {floor.units.map((unit) => (
                    <UnitCard
                      key={unit.unitNo}
                      unit={unit}
                      wishListArray={wishListArray}
                      setWishListArray={setWishListArray}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No units available for the selected filters.</p>
          )}
        </div>
      </div>
    </aside>
  );

  // Mobile Bottom Navigation
  const MobileBottomNav = () => (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 z-[1000]">
      <Link
        to="/"
        className={`flex flex-col items-center ${
          location.pathname === "/" ? "text-[#c89c4e]" : "text-gray-500"
        }`}
      >
        <FaHome size={20} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <button
        onClick={handleCloseSidebar}
        className="flex flex-col items-center text-gray-500"
      >
        <FaFilter size={20} />
        <span className="text-xs mt-1">Filters</span>
      </button>
      <Link
        to="/3d-view"
        className={`flex flex-col items-center ${
          location.pathname === "/3d-view" ? "text-[#c89c4e]" : "text-gray-500"
        }`}
      >
        <TbView360Number size={20} />
        <span className="text-xs mt-1">3D View</span>
      </Link>
      <Link
        to="/2d-view"
        className={`flex flex-col items-center ${
          location.pathname === "/2d-view" ? "text-[#c89c4e]" : "text-gray-500"
        }`}
      >
        <FaTable size={20} />
        <span className="text-xs mt-1">2D View</span>
      </Link>
      <Link
        to="/floors"
        className={`flex flex-col items-center ${
          location.pathname === "/floors" ? "text-[#c89c4e]" : "text-gray-500"
        }`}
      >
        <FaTable size={20} />
        <span className="text-xs mt-1">Floors</span>
      </Link>

      <Link
        to="/wishlist"
        className={`flex flex-col items-center ${
          location.pathname === "/wishlist" ? "text-[#c89c4e]" : "text-gray-500"
        }`}
      >
        <FaHeart size={20} />
        <span className="text-xs mt-1">Favorites</span>
      </Link>
    </nav>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen pb-16 md:pb-0">
      {/* Desktop Sidebar - Restored to original implementation */}
      {!isMobile && (
        <>
          {/* "Show Filters" button for desktop */}
          {location.pathname !== "/floors" && (
            <button
              className="fixed left-10 top-1/2 -translate-y-1/2 bg-white
              hover:bg-gray-50 border border-gray-200 text-gray-700 w-10 h-40 opacity-75
              rounded-md flex flex-col items-center justify-between py-4 shadow-sm z-50"
              onClick={handleCloseSidebar}
            >
              <IoIosArrowForward />
              <span className="[writing-mode:vertical-lr] text-sm tracking-wide font-medium">
                Show Filters
              </span>
              <CiSliderHorizontal size={15} className="rotate-90 font-bold" />
            </button>
          )}

          {/* Sidebar */}
          <aside
            className={`${
              isSideBarOpen ? "w-[520px]" : "w-0 opacity-0 pointer-events-none"
            } bg-white transition-all duration-900 border-r flex flex-col fixed h-full z-[1000] no-scrollbar`}
          >
            <div className="flex-1 overflow-y-auto p-10 pt-0 ">
              <div className="mb-4 flex justify-between items-center pt-3">
                <img
                  src="logo1.png"
                  alt="BrandCentro"
                  className="w-[11rem] h-auto"
                />
                <Link
                  to="/wishlist"
                  className="p-1 relative w-10 h-10 rounded-lg text-[#c89c4e] cursor-pointer bg-gray-100 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ scale }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 10,
                    }}
                  >
                    {wishListArray.length === 0 ? (
                      <CiHeart size={35} />
                    ) : (
                      <IoMdHeart size={35} className="text-[#c89c4e]" />
                    )}
                  </motion.div>
                  {wishListArray.length > 0 && (
                    <p className="absolute text-[13px] mb-1 font-bold transition-all duration-500 text-white">
                      {wishListArray.length}
                    </p>
                  )}
                </Link>
              </div>
              <Filters
                filters={filters}
                updateFilters={updateFilters}
                floors_Data={floors_Data}
              />
              <div className="mt-6">
                {filteredUnits.length > 0 ? (
                  filteredUnits.map((floor) => (
                    <div key={floor.floor} className="mb-6">
                      <h4 className="text-md font-semibold mb-2">
                        Floor {floor.floor}
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {floor.units.map((unit) => (
                          <UnitCard
                            key={unit.unitNo}
                            unit={unit}
                            wishListArray={wishListArray}
                            setWishListArray={setWishListArray}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No units available for the selected filters.</p>
                )}
              </div>
            </div>
            {/* Sidebar close button */}
            <button
              onClick={handleCloseSidebar}
              className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 bg-gray-200 text-[#c7a878] w-[20px] h-20 rounded-r-full flex items-center justify-center shadow-md hover:bg-[#c7a878] hover:text-white transition-all z-[1001] pointer-events-auto"
            >
              {isSideBarOpen ? (
                <IoIosArrowBack size={20} />
              ) : (
                <IoIosArrowForward size={20} />
              )}
            </button>
          </aside>
        </>
      )}

      {/* Main Content Area */}
      <main
        className={`flex-1 ${
          location.pathname === "/apartment-details"
            ? "overflow-y-auto no-scrollbar"
            : "overflow-hidden"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Desktop Navigation Bar */}
        {!isMobile && <NavigationBar />}

        {/* Mobile Specific Components */}
        {isMobile && <MobileHeader />}
        {isMobile && <MobileSidebar />}
        {isMobile && <MobileBottomNav />}

        {/* Content Area */}
        <div
          className={`h-full ${isMobile ? "" : ""}`}
          style={{
            transition: "margin-left 300ms ease-in-out",
            height: isMobile ? "100%" : "auto",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <div className="relative w-full h-screen overflow-hidden">
                  <img
                    src="Brand Centro 1.jpg"
                    alt="Static View"
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: isMobile ? "center center" : "",
                    }}
                  />
                </div>
              }
            />
            <Route path="/status/:unitNumber" element={<StatusPage />} />

            <Route path="/3d-view" element={<ModelView />} />
            <Route path="/get-in-touch" element={<GetInTouch />} />
            <Route
              path="/wishlist"
              element={
                <Wishlist
                  wishListArray={wishListArray}
                  setWishListArray={setWishListArray}
                />
              }
            />
            <Route
              path="/2d-view"
              element={
                <div
                  className={`w-full h-screen overflow-y-auto no-scrollbar transition-all duration-300 ${
                    isSideBarOpen ? "md:ml-[520px]" : "md:ml-0"
                  }`}
                >
                  <FloorPlanDisplay />
                </div>
              }
            />
            <Route path="/floors" element={<Floors />} />
            <Route
              path="/apartment-details"
              element={
                <ApartmentDetails
                  wishListArray={wishListArray}
                  setWishListArray={setWishListArray}
                />
              }
            />
            <Route path="/pdf" element={<PdfFile />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
const App = () => {
  const [wishListArray, setWishListArray] = useState([]);
  const [Loading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    bedrooms: "",
    floor: "",
    status: "",
    areaRange: [0, 3000],
    priceRange: [0, 3000000],
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const updateFilters = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleCloseSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const filteredUnits = floors_Data
    .map((floor) => ({
      ...floor,
      units: floor.units.filter((unit) => {
        const matchesBedrooms =
          filters.bedrooms === "" || unit.type === filters.bedrooms;
        const matchesFloor =
          filters.floor === "" || floor.floor.toString() === filters.floor;
        const matchesStatus =
          filters.status === "" ||
          unit.status.toLowerCase() === filters.status.toLowerCase();
        const matchesArea =
          unit.totalAreaSqFt >= filters.areaRange[0] &&
          unit.totalAreaSqFt <= filters.areaRange[1];
        const matchesPrice =
          Number.parseFloat(unit.sellingPriceAED.replace(/[^0-9.-]+/g, "")) >=
            filters.priceRange[0] &&
          Number.parseFloat(unit.sellingPriceAED.replace(/[^0-9.-]+/g, "")) <=
            filters.priceRange[1];

        return (
          matchesBedrooms &&
          matchesFloor &&
          matchesStatus &&
          matchesArea &&
          matchesPrice
        );
      }),
    }))
    .filter((floor) => floor.units.length > 0);
  if (Loading) {
    return <Loader />;
  }
  return (
    <Router>
      <AppContent
        wishListArray={wishListArray}
        setWishListArray={setWishListArray}
        filters={filters}
        updateFilters={updateFilters}
        filteredUnits={filteredUnits}
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen} // Pass the state setter
        handleCloseSidebar={handleCloseSidebar}
      />
    </Router>
  );
};

export default App;
