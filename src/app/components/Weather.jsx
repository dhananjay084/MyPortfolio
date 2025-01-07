"use client";
import { useState, useEffect } from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { TbTemperatureCelsius } from "react-icons/tb";
import { TiWeatherCloudy } from "react-icons/ti";
import axios from 'axios';

const Weather = ({ setLocationData }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationPermissionError, setLocationPermissionError] = useState(false); // Track permission error

  // Replace with your actual OpenWeatherMap API key
  const API_KEY = "c026f1a2f12e012cbe0ab89840a1b0bd";

  // Function to fetch weather based on user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setLocationPermissionError(true); // Handle location permission denial
            setError("Location permission denied. Please allow access to your location.");
          } else {
            setError("Unable to fetch location. Please try again.");
          }
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  // Fetch weather data based on latitude and longitude
  const fetchWeatherByLocation = async (latitude, longitude) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setLocationData(response.data);  // Pass data to parent (Header)
      setLoading(false);
    } catch (err) {
      setError("Unable to fetch weather data for the given location.");
      setLoading(false);
    }
  };

  // Fetch weather when location is available
  useEffect(() => {
    getUserLocation();
  }, []);

  // Handle loading, error, and weather display
  return (
    <div className="flex items-center gap-4">
      {loading && <div className="mt-4 text-sm">Loading...</div>}
      {error && !locationPermissionError && (
        <div className=" text-sm text-red-500">{error}</div>
      )}
      {locationPermissionError && (
        <div className=" text-sm text-red-500">Location permission denied.</div>
      )}

      {/* Display weather data */}
      {weatherData && !loading && !error && (
        <div className="flex items-center gap-4">
          <p className="text-sm flex items-center gap-2">
            <IoLocationOutline /> <p>{weatherData.name}, {weatherData.sys.country}</p>
          </p>
          <p className="text-sm flex items-center gap-2">
            <TbTemperatureCelsius /> <p>{weatherData.main.temp}°C</p>
          </p>
          <p className="text-sm flex items-center gap-2">
            <TiWeatherCloudy /> <p>{weatherData.weather[0].description}</p>
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
