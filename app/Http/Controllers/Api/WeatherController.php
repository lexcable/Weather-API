<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $city = $request->query('city');

        if (!$city) {
            return response()->json(['error' => 'City parameter is required.'], 400);
        }

        $apiKey = env('OPENWEATHER_API_KEY');
        $response = Http::get('https://api.openweathermap.org/data/2.5/weather', [
            'q' => $city,
            'appid' => $apiKey,
            'units' => 'metric'
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Could not fetch weather data.'], 500);
        }

        $data = $response->json();

        return response()->json([
            'city' => $data['name'],
            'temperature' => $data['main']['temp'] . ' °C',
            'humidity' => $data['main']['humidity'] . '%',
            'description' => $data['weather'][0]['description'],
        ]);
    }
}

