import React, { useState } from 'react';
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
  const [loadingGo, setLoadingGo] = useState(false);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleFindCrop = async () => {
    if (!location) {
      setLocationError('Please enter a location.');
      return;
    }

    setLocationError(null);
    setLoadingLocation(true);
    setSelectedLocation(null);
    setResult(null);
    setLocationsList([]);

    try {
      const response = await fetch(`https://backend-plant-ai.onrender.com/geocode?location=${location}`);
      const data = await response.json();

      if (data.length > 0) {
        setLocationsList(data);
      } else {
        setLocationError('No locations found.');
      }
    } catch (error) {
      setLocationError('Error fetching location data: ' + error.message);
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleLocationSelect = (e) => {
    const locationData = locationsList[e.target.value];
    setSelectedLocation(locationData);
  };

  const handleGoClick = () => {
    if (selectedLocation) {
      setLoadingGo(true);
      fetchCropPrediction(selectedLocation);
    } else {
      setLocationError('Please select a location from the dropdown.');
    }
  };

  const fetchCropPrediction = async (locationData) => {
    setLocationError(null);
    try {
      const payload = { location: locationData.name };

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
      setLoadingGo(false);
    }
  };

  return (
    <div
      className='flex flex-col items-center justify-center min-h-screen'
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <h1 className="text-4xl sm:text-6xl font-bold py-6 text-center">{t('Crop Recommendation')}</h1>

      <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-4xl px-4">
        {/* Card for Location Input */}
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg m-2 w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-4 text-center">{t('Enter Your Location:')}</h2>
          <label className="text-black mb-2" htmlFor="location-input">{t('Location:')}</label>
          <div className='flex flex-col md:flex-row justify-between items-center w-full'>
            <input
              id="location-input"
              type="text"
              placeholder={t('Enter Your Location:')} // Placeholder translated
              value={location}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-full py-2 px-4 w-full md:w-80 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00df9a] transition duration-300"
            />
            <button
              onClick={handleFindCrop}
              className="bg-[#00df9a] text-black rounded-xl h-12 w-full flex items-center justify-center mt-2 md:mt-0 shadow-lg hover:bg-[#00c78b] transition duration-300 md:ml-2"
              disabled={loadingLocation}
            >
              {loadingLocation ? 'Finding...' : <span className="text-sm">{t('Find Crop')}</span>}
            </button>
          </div>

          {locationError && <p className="text-red-500 mt-4">{locationError}</p>}

          {locationsList.length > 0 && (
            <div className="mt-4 w-full">
              <label className="text-black mb-2" htmlFor="location-select">{t('Select a Location:')}</label>
              <select
                id="location-select"
                onChange={handleLocationSelect}
                className="border border-gray-300 rounded-full py-2 px-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00df9a] transition duration-300 w-full"
              >
                <option value="">-- {t('Select a location')} --</option>
                {locationsList.map((loc, index) => (
                  <option key={index} value={index}>
                    {loc.name} ({loc.country_code})
                  </option>
                ))}
              </select>

              {selectedLocation && (
                <button
                  onClick={handleGoClick}
                  className="bg-[#00df9a] text-black rounded-xl h-12 w-full flex items-center justify-center mt-4 shadow-lg hover:bg-[#00c78b] transition duration-300"
                  disabled={loadingGo}
                >
                  {loadingGo ? 'Loading...' : <span className="text-sm">{t('Go')}</span>}
                </button>
              )}
            </div>
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
              <p className="text-center">{t('Predicted Crop')}: <span className="font-semibold">{t(result.basic_final_prediction)}</span></p>
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