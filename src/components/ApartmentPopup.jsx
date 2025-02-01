import React from 'react';

const ApartmentPopup = ({ apartment, onClose }) => {
    if (!apartment) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/2">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500"
                >
                    X
                </button>
                <h3 className="text-xl font-bold mb-4">{apartment.name}</h3>
                <p>Floor: {apartment.floor}</p>
                <p>Size: {apartment.size} sq.ft</p>
                <p>Status: {apartment.status}</p>
                <p>Details: {apartment.details}</p>
                
                
            </div>
        </div>
    );
};

export default ApartmentPopup;
