import React from 'react';
import { Fish } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-ocean-700 to-ocean-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full">
              <Fish className="w-8 h-8 text-ocean-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Miami Fishing Weather</h1>
              <p className="text-ocean-100 text-sm">Your guide to the best fishing days in Miami, FL</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-ocean-100">Real-time Weather Data</p>
            <p className="text-xs text-ocean-200">Powered by Open-Meteo</p>
          </div>
        </div>
      </div>
    </header>
  );
}
