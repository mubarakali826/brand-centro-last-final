import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaRegCopy, FaCheck, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { RiFileListLine } from "react-icons/ri";
import UnitCard from "../components/UnitCard";

const BookingModal = ({ isOpen, onClose, unit }) => {
  const [formData, setFormData] = useState({
    phone: "+971",
    email: "",
    name: "",
    requirements: "",
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Book Now</h2>
        <p className="text-gray-600 mb-4">
          Unit: {unit?.unitNo || "Selected Unit"}
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              <div className="flex items-center gap-2">
                <FaPhone className="text-gray-400" />
                <span>Phone Number</span>
              </div>
            </label>
            <div className="flex items-center border rounded-md">
              <div className="px-3 py-2 bg-gray-50 border-r">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg"
                  alt="UAE flag"
                  className="w-6 h-4"
                />
              </div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="flex-1 p-2 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              <div className="flex items-center gap-2">
                <MdEmail className="text-gray-400" />
                <span>Email</span>
              </div>
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded-md"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              <div className="flex items-center gap-2">
                <BsPerson className="text-gray-400" />
                <span>Name</span>
              </div>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              <div className="flex items-center gap-2">
                <RiFileListLine className="text-gray-400" />
                <span>Requirements</span>
              </div>
            </label>
            <textarea
              className="w-full p-2 border rounded-md h-32 resize-none"
              value={formData.requirements}
              onChange={(e) =>
                setFormData({ ...formData, requirements: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-md font-semibold transition-colors"
          >
            Submit Booking Request
          </button>
        </form>
      </div>
    </div>
  );
};

const Wishlist = ({ wishListArray, setWishListArray }) => {
  const [removingUnit, setRemovingUnit] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishListArray(storedWishlist);
  }, [setWishListArray]);

  const handleRemoveUnit = (unitToRemove) => {
    setRemovingUnit(unitToRemove.unitNo);
    setTimeout(() => {
      const updatedWishlist = wishListArray.filter(
        (unit) => unit.unitNo !== unitToRemove.unitNo
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setWishListArray(updatedWishlist);
      setRemovingUnit(null);
    }, 300);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleBookNow = (unit) => {
    setSelectedUnit(unit);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen lg:max-w-4xl mx-auto">
      <h1 className="uppercase font-bold text-4xl text-[#c89c4e] mb-10 text-center">
        Brand Centro
      </h1>
      <div className="flex justify-between items-center mb-6 w-full px-4">
        <h2 className="text-xl font-semibold">My Wishlist</h2>
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md hover:bg-gray-50 transition-colors"
        >
          {copied ? (
            <>
              <FaCheck className="text-green-600" />
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <FaRegCopy />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>

      {wishListArray.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4">
          {wishListArray.map((unit, index) => (
            <div
              key={index}
              className={`transform transition-all duration-500 ease-out ${
                removingUnit === unit.unitNo
                  ? "scale-95 opacity-0 -translate-y-4"
                  : "scale-100 opacity-100 translate-y-0"
              }`}
            >
              <div className="relative">
                <UnitCard
                  unit={unit}
                  wishListArray={wishListArray}
                  setWishListArray={setWishListArray}
                  onRemove={() => handleRemoveUnit(unit)}
                />
                <button
                  onClick={() => handleBookNow(unit)}
                  className="w-full mt-2 bg-[#c89c4e] text-white py-3 rounded-md font-semibold hover:bg-yellow-600 transition-colors shadow-sm"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">
          Please press the heart button ❤️ for at least two apartments.
        </p>
      )}

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUnit(null);
        }}
        unit={selectedUnit}
      />
    </div>
  );
};

export default Wishlist;
