import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';

export default function LocationSelector({ onLocationChange }) {
  const [customLat, setCustomLat] = useState('');
  const [customLon, setCustomLon] = useState('');
  
  const popularLocations = [
    { name: 'Miami, FL', lat: 25.7617, lon: -80.1918 },
    { name: 'San Diego, CA', lat: 32.7157, lon: -117.1611 },
    { name: 'Key West, FL', lat: 24.5551, lon: -81.7800 },
    { name: 'Seattle, WA', lat: 47.6062, lon: -122.3321 },
    { name: 'Charleston, SC', lat: 32.7765, lon: -79.9311 },
  ];
  
  const handleCustomLocation = () => {
    const lat = parseFloat(customLat);
    const lon = parseFloat(customLon);
    if (!isNaN(lat) && !isNaN(lon)) {
      onLocationChange(lat, lon);
    }
  };
  
  return (
    <div className="card mb-6">
      <div className="flex items-center mb-4">
        <MapPin className="w-5 h-5 text-ocean-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Select Location</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
        {popularLocations.map((location) => (
          <button
            key={location.name}
            onClick={() => onLocationChange(location.lat, location.lon)}
            className="px-4 py-2 bg-ocean-100 hover:bg-ocean-200 text-ocean-800 rounded-lg transition-colors text-sm font-medium"
          >
            {location.name}
          </button>
        ))}
      </div>
      
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Latitude"
          value={customLat}
          onChange={(e) => setCustomLat(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
          step="0.0001"
        />
        <input
          type="number"
          placeholder="Longitude"
          value={customLon}
          onChange={(e) => setCustomLon(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
          step="0.0001"
        />
        <button
          onClick={handleCustomLocation}
          className="btn-primary flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Go
        </button>
      </div>
    </div>
  );
}
