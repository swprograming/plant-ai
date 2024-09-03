import React, { useState, useEffect } from 'react';
import bg from '../assets/bg.jpg';
import { cropData } from './Data';
import { useTranslation } from 'react-i18next';

const Basic = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState('');
  const [result, setResult] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [locationsList, setLocationsList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loadingCrop, setLoadingCrop] = useState(false);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchLocationSuggestions = async (input) => {
    if (input.length < 3) return; // Avoid too many requests
    setLoadingLocation(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${input}&format=json`);
      const data = await response.json();
      setLocationsList(data);
    } catch (error) {
      setLocationError('Error fetching location suggestions: ' + error.message);
    } finally {
      setLoadingLocation(false);
    }
  };

  const debouncedFetchLocationSuggestions = debounce(fetchLocationSuggestions, 300);

  useEffect(() => {
    if (location) {
      debouncedFetchLocationSuggestions(location);
    } else {
      setLocationsList([]);
    }
  }, [location]);

  const handleLocationSelect = (locationData) => {
    setSelectedLocation(locationData);
    setLocation(locationData.display_name); // Set the input to the selected location name
    setLocationsList([]); // Clear the suggestions
  };

  const handleFindCrop = async () => {
    if (!selectedLocation) {
      setLocationError('Please select a location before finding crops.');
      return;
    }

    setLoadingCrop(true);
    setLocationError(null);
    try {
      const payload = { location: selectedLocation.display_name }; // Use display_name for prediction

      const response = await fetch('https://backend-plant-ai.onrender.com/predict_crop/basic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setLocationError('Error fetching crop prediction: ' + error.message);
    } finally {
      setLoadingCrop(false);
    }
  };

  return (
    <div
      className='flex flex-col items-center justify-center min-h-screen'
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <h1 className="text-4xl sm:text-6xl font-bold py-6 text-center">{t('Crop Recommendation')}</h1>

      <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-4xl px-4">
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg m-2 w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-4 text-center">{t('Enter Your Location:')}</h2>
          <label className="text-black mb-2" htmlFor="location-input">{t('Location:')}</label>
          <div className='flex flex-col md:flex-row justify-between items-center w-full'>
            <input
              id="location-input"
              type="text"
              placeholder={t('Enter Your Location:')}
              value={location}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-full py-2 px-4 w-full md:w-80 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00df9a] transition duration-300"
            />
          </div>

          {locationError && <p className="text-red-500 mt-4">{locationError}</p>}

          {locationsList.length > 0 && (
            <div className="mt-4 w-full">
              <ul className="border border-gray-300 rounded-lg shadow-lg">
                {locationsList.map((loc) => (
                  <li key={loc.place_id} className="py-2 px-4 hover:bg-gray-200 cursor-pointer" onClick={() => handleLocationSelect(loc)}>
                    {loc.display_name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedLocation && (
            <button
              onClick={handleFindCrop}
              className="bg-[#00df9a] text-black rounded-xl h-12 w-full flex items-center justify-center mt-4 shadow-lg hover:bg-[#00c78b] transition duration-300"
              disabled={loadingCrop}
            >
              {loadingCrop ? 'Loading...' : <span className="text-sm">{t('Find Crop')}</span>}
            </button>
          )}

          {result && (
            <div className="mt-4 flex flex-col p-4 bg-white bg-opacity-80 rounded-lg shadow-md w-full">
              <h2 className="text-lg font-bold text-center">{t('Prediction Result:')}</h2>
              <p className="text-center">
                {t('Location')}: <span className="font-semibold">{result.Location} ({result.CountryCode || 'N/A'})</span>
              </p>
              <p className="text-center">{t('Temperature')}: <span className="font-semibold">{result['Temperature (°C)']}</span></p>
              <p className="text-center">{t('Humidity')}: <span className="font-semibold">{result['Humidity (%)']}</span></p>
              <p className="text-center">{t('Average Annual Rainfall')}: <span className="font-semibold">{result['Average Annual Rainfall (mm)']}</span></p>
              <p className="text-center">{t('pH Value')}: <span className="font-semibold">{result.pH_Value}</span></p>
              <p className="text-center">{t('Predicted Crop')}: <span className="font-semibold">{result.basic_final_prediction}</span></p>
              <div className="flex justify-center mt-2">
                {result.basic_final_prediction && (
                  <img
                    src={cropData[result.basic_final_prediction.toLowerCase()].imageUrl}
                    alt={result.basic_final_prediction}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Basic;