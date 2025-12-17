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
      <label className="block text-sm font-medium text-slate-200">State</label>

      <div className="relative mt-1">
        <select
          name={stateName}
          value={selectedState}
          onChange={handleStateChange}
          required={required}
          className="appearance-none w-full bg-slate-800 text-white border border-slate-700 rounded-md py-2 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
        >
          <option value="">Select State</option>
          {stateList.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-4 w-4 text-slate-300" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <label className="block text-sm font-medium text-slate-200 mt-2">District/City</label>
      <div className="relative mt-1">
        <select
          name={districtName}
          value={selectedDistrict}
          onChange={handleDistrictChange}
          required={required}
          className="appearance-none w-full bg-slate-800 text-white border border-slate-700 rounded-md py-2 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors disabled:opacity-60"
          disabled={!selectedState}
        >
          <option value="">{selectedState ? 'Select District/City' : 'Select State First'}</option>
          {districtList.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-4 w-4 text-slate-300" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StateDistrictSelect;
