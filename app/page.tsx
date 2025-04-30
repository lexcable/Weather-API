import React from 'react';
'use client';

import { useState } from 'react';

interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  description: string;
}

function LoadingDots() {
  return (
    <div className="flex justify-center items-center space-x-2">
      <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce animation-delay-200"></span>
      <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce animation-delay-400"></span>
      <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce animation-delay-600"></span>
    </div>
  );
}

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const apiUrl = (process.env.NEXT_PUBLIC_WEATHER_API_URL as string) || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/api/weather?city=${city}`);
      if (!res.ok) {
        throw new Error(`Error fetching weather: ${res.statusText}`);
      }
      const data: WeatherData = await res.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="w-full max-w-md space-y-6">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
        />
        <button
          className="btn btn-primary w-full"
          onClick={fetchWeather}
          disabled={!city || loading}
        >
          {loading ? <LoadingDots /> : 'Get Weather'}
        </button>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {weather && !error && (
          <div className="card w-full bg-white shadow-lg rounded-lg mt-6 p-6">
            <h2 className="text-3xl font-extrabold mb-4 text-center text-blue-700">{weather.city}</h2>
            <p className="text-xl mb-2">Temperature: <span className="font-semibold">{weather.temperature}°C</span></p>
            <p className="text-xl mb-2">Humidity: <span className="font-semibold">{weather.humidity}%</span></p>
            <p className="text-xl capitalize">Condition: <span className="font-semibold">{weather.description}</span></p>
          </div>
        )}
      </div>
    </div>
  );
}
