import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "032e088df41eca817590128281a8bed6";

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Location not found. Please check the spelling.");
      }

      const data = await response.json();
      setWeatherData(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={handleLocationChange}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData && (
        <div>
          <h2>
            Weather in {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>Temperature: {weatherData.main.temp} &#8451;</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          {weatherData.coord && (
            <div className="details-container">
              <div className="map-container">
                <MapContainer
                  center={[weatherData.coord.lat, weatherData.coord.lon]}
                  zoom={13}
                  style={{ height: "300px", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker
                    position={[weatherData.coord.lat, weatherData.coord.lon]}
                  >
                    <Popup>
                      {weatherData.name}, {weatherData.sys.country}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
              {/* Additional details can be added here */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
