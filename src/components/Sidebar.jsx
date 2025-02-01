// Sidebar.js
import React, { useState } from 'react';
import floorsData from './floors_data.json';

const Sidebar = () => {
  const [expandedFloor, setExpandedFloor] = useState(null);

  const toggleFloor = (floor) => {
    setExpandedFloor(expandedFloor === floor ? null : floor);
  };

  return (
    <div className="sidebar">
      <h2>Units</h2>
      {floorsData.map((floor) => (
        <div key={floor.floor} className="floor-section">
          <div
            className="floor-header"
            onClick={() => toggleFloor(floor.floor)}
          >
            Floor {floor.floor}
          </div>
          {expandedFloor === floor.floor && (
            <ul className="units-list">
              {floor.units.map((unit) => (
                <li key={unit.unitNo}>
                  <strong>Unit {unit.unitNo}</strong> - {unit.type} -{' '}
                  {unit.sellingPriceAED}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
