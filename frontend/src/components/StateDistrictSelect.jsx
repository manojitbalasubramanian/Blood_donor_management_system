import React, { useState } from 'react';
import statesDistrictsRaw from '../lib/indianStatesDistricts.json';

const StateDistrictSelect = ({ stateValue, districtValue, onStateChange, onDistrictChange, stateName = 'state', districtName = 'city', required = true }) => {
  const [selectedState, setSelectedState] = useState(stateValue || '');
  const [selectedDistrict, setSelectedDistrict] = useState(districtValue || '');

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setSelectedDistrict('');
    if (onStateChange) onStateChange(newState);
    if (onDistrictChange) onDistrictChange('');
  };

  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    setSelectedDistrict(newDistrict);
    if (onDistrictChange) onDistrictChange(newDistrict);
  };

  // Convert array of {state, districts} to a map for easier lookup
  const stateMap = Array.isArray(statesDistrictsRaw)
    ? Object.fromEntries(statesDistrictsRaw.map(obj => [obj.state, obj.districts]))
    : statesDistrictsRaw;
  const stateList = Object.keys(stateMap);
  const districtList = selectedState ? stateMap[selectedState] || [] : [];

  return (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-medium text-gray-700">State</label>
      <select
        name={stateName}
        value={selectedState}
        onChange={handleStateChange}
        required={required}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
      >
        <option value="">Select State</option>
        {stateList.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      <label className="block text-sm font-medium text-gray-700 mt-2">District/City</label>
      <select
        name={districtName}
        value={selectedDistrict}
        onChange={handleDistrictChange}
        required={required}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
        disabled={!selectedState}
      >
        <option value="">{selectedState ? 'Select District/City' : 'Select State First'}</option>
        {districtList.map((district) => (
          <option key={district} value={district}>{district}</option>
        ))}
      </select>
    </div>
  );
};

export default StateDistrictSelect;
