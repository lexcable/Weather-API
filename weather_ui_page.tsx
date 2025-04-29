import React, { useState } from 'react';

interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  description: string;
}

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const res = await fetch(`http://localhost:8000/api/weather?city=${city}`);
      if (!res.ok) throw new Error('City not found');
      const data: WeatherData = await res.json();
      setWeather(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get Weather'}
        </button>

        {loading && (
          <div className="flex justify-center mt-6">
            <div className="loading loading-spinner loading-lg text-primary"></div>
          </div>
        )}

        {error && (
          <div className="alert alert-error shadow-lg mt-6">
            <div>
              <span>{error}</span>
            </div>
          </div>
        )}

        {weather && !loading && (
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
