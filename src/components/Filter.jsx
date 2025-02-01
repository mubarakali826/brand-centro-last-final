import React, { useState } from "react";

const Filters = ({ filters, updateFilters, floors_Data }) => {
    const [showAreaDropdown, setShowAreaDropdown] = useState(false);
    const [showPriceDropdown, setShowPriceDropdown] = useState(false);
    const [tempAreaRange, setTempAreaRange] = useState(filters.areaRange);
    const [tempPriceRange, setTempPriceRange] = useState(filters.priceRange);

    const applyAreaRange = () => {
        updateFilters("areaRange", tempAreaRange);
        setShowAreaDropdown(false);
    };

    const applyPriceRange = () => {
        updateFilters("priceRange", tempPriceRange);
        setShowPriceDropdown(false);
    };

    // Safely extract unique floor numbers from `floors_Data`
    const uniqueFloors = floors_Data
        ? [...new Set(floors_Data.map((floor) => floor.floor))].sort((a, b) => a - b)
        : [];

    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                {/* Floor Filter */}
                <div>
                    <label className="block mb-2 ">Floor</label>
                    <select
                        className="border p-2 w-full rounded-md"
                        value={filters.floor}
                        onChange={(e) => updateFilters("floor", e.target.value)}
                    >
                        <option value="">All</option>
                        {uniqueFloors.map((floor) => (
                            <option key={floor} value={floor}>
                                Floor {floor}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Bedrooms Filter */}
                <div>
                    <label className="block mb-2">Bedrooms</label>
                    <select
                        className="border p-2 w-full rounded-md"
                        value={filters.bedrooms}
                        onChange={(e) => updateFilters("bedrooms", e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Studio">Studio</option>
                        <option value="1 BHK">1 Bedroom</option>
                        <option value="2 BHK">2 Bedrooms</option>
                    </select>
                </div>

                {/* Total Area Filter */}
                <div className="relative">
                    <button
                        className="border p-2 w-full text-left rounded-md"
                        onClick={() => setShowAreaDropdown(!showAreaDropdown)}
                    >
                        Total Area (sq.ft)
                    </button>
                    {showAreaDropdown && (
                        <div className="absolute bg-white border p-4 mt-2 w-full z-10 rounded-md">
                            <label className="block mb-2">From</label>
                            <input
                                type="number"
                                value={tempAreaRange[0]}
                                onChange={(e) =>
                                    setTempAreaRange([Number(e.target.value), tempAreaRange[1]])
                                }
                                className="border p-2 w-full mb-2 rounded-md"
                            />
                            <label className="block mb-2">To</label>
                            <input
                                type="number"
                                value={tempAreaRange[1]}
                                onChange={(e) =>
                                    setTempAreaRange([tempAreaRange[0], Number(e.target.value)])
                                }
                                className="border p-2 w-full mb-4 rounded-md"
                            />
                            <button
                                className="bg-[#c89c4e] text-white px-4 py-2"
                                onClick={applyAreaRange}
                            >
                                Apply
                            </button>
                        </div>
                    )}
                </div>

                {/* Price Filter */}
                <div className="relative">
                    <button
                        className="border p-2 w-full text-left rounded-md"
                        onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                    >
                        Price (AED)
                    </button>
                    {showPriceDropdown && (
                        <div className="absolute bg-white border p-4 mt-2 w-full z-10 rounded-md">
                            <label className="block mb-2">From</label>
                            <input
                                type="number"
                                value={tempPriceRange[0]}
                                onChange={(e) =>
                                    setTempPriceRange([Number(e.target.value), tempPriceRange[1]])
                                }
                                className="border p-2 w-full mb-2 rounded-md"
                            />
                            <label className="block mb-2">To</label>
                            <input
                                type="number"
                                value={tempPriceRange[1]}
                                onChange={(e) =>
                                    setTempPriceRange([tempPriceRange[0], Number(e.target.value)])
                                }
                                className="border p-2 w-full mb-4 rounded-md"
                            />
                            <button
                                className="bg-[#c89c4e] text-white px-4 py-2"
                                onClick={applyPriceRange}
                            >
                                Apply
                            </button>
                        </div>
                    )}
                </div>

                {/* Status Filter */}
                <div>
                    <label className="block mb-2">Status</label>
                    <select
                        className="border p-2 w-full rounded-md"
                        value={filters.status}
                        onChange={(e) => updateFilters("status", e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Available">Available</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Sold">Sold</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Filters;
