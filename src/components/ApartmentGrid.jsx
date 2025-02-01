import React from "react";
import ApartmentCard from "./ApartmentCard";

const ApartmentGrid = ({ filteredData, onSelectApartment }) => {
  return (
    <div className="apartment-grid">
      {filteredData.map((floor) => (
        <div key={floor.floor}>
          <h2>Floor {floor.floor}</h2>
          <div className="grid">
            {floor.units.map((unit) => (
              <ApartmentCard
                key={unit.unitNo}
                unit={unit}
                onSelectApartment={onSelectApartment}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApartmentGrid;
