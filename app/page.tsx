'use client';

import { useState } from 'react';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);

  const fetchWeather = async () => {
    const res = await fetch(`http://localhost:8000/api/weather?city=${city}`);
    const data = await res.json();
    setWeather(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-6">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="btn btn-primary w-full"
          onClick={fetchWeather}
        >
          Get Weather
        </button>

        {weather && (
          <div className="card w-full bg-base-100 shadow-xl mt-6 p-6">
            <h2 className="text-2xl font-bold">{weather.city}</h2>
            <p className="text-lg">Temperature: {weather.temperature}</p>
            <p className="text-lg">Humidity: {weather.humidity}</p>
            <p className="text-lg capitalize">Condition: {weather.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
