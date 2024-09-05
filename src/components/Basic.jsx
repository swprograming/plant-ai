import React, { useState } from 'react';
import bg from '../assets/bg.jpg';
import { cropData } from './Data';
import { useTranslation } from 'react-i18next';

const Basic = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [locationInput, setLocationInput] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [result, setResult] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [locationsList, setLocationsList] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loadingGo, setLoadingGo] = useState(false);

  const handleInputChange = (e) => {
    setLocationInput(e.target.value);
  };

  const handleSearchLocations = async () => {
    setLocationError(null);
    setLoadingLocation(true);
    setLocationsList([]);

    try {
      const response = await fetch(`https://backend-plant-ai.onrender.com/geocode?location=${encodeURIComponent(locationInput)}`);
      const data = await response.json();

      const validLocations = data.filter(loc => loc.display_name);

      if (validLocations.length > 0) {
        setLocationsList(validLocations);
      } else {
        setLocationError(t('No valid locations found.'));
      }
    } catch (error) {
      setLocationError(t('Error fetching location data: {{error}}', { error: error.message }));
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleLocationSelect = (locationData) => {
    setSelectedLocation(locationData);
    setLocationInput(locationData.display_name); // Update input with selected location
    setLocationsList([]); // Clear locations list
  };

  const handleFindCropPrediction = async () => {
    if (!selectedLocation) {
      setLocationError(t('Please select a location.'));
      return;
    }

    setLoadingGo(true);
    try {
      const payload = { location: selectedLocation.display_name };

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
      setLocationError(t('Error fetching crop prediction: {{error}}', { error: error.message }));
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
          <h2 className="text-xl font-bold mb-4 text-center">{t('Location (e.g., "{{example}}")', { example: "Addis Ababa" })}</h2>
          <label className="text-black mb-2" htmlFor="location-input">{t('Location:')}</label>
          <div className='flex flex-col items-center w-full'>
            <div className='flex flex-col md:flex-row justify-center items-center w-full'>
              <input
                id="location-input"
                type="text"
                placeholder={t('Enter Your Location (e.g., "{{example}}")', { example: "Addis Ababa" })}
                value={locationInput}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-full py-2 px-4 mb-2 md:mb-0 md:mr-2 w-full md:w-80 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00df9a] transition duration-300"
              />
              <button
                onClick={handleSearchLocations}
                className="bg-[#00df9a] text-white py-2 px-4 rounded-full shadow-lg hover:bg-[#00b883] transition duration-300 w-full md:w-auto"
                disabled={loadingLocation}
              >
                {loadingLocation ? t('Searching...') : t('Search')}
              </button>
            </div>

            {locationError && <p className="text-red-500 mt-4">{locationError}</p>}

            {locationsList.length > 0 && (
              <div className="mt-4 w-full">
                <ul className="border border-gray-300 rounded-lg shadow-lg">
                  {locationsList.map((loc, index) => (
                    <li
                      key={index}
                      onClick={() => handleLocationSelect(loc)}
                      className="cursor-pointer p-2 hover:bg-[#00df9a] hover:text-white"
                    >
                      {loc.display_name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={handleFindCropPrediction}
              className="mt-4 bg-[#00df9a] text-white py-2 px-4 rounded-full shadow-lg hover:bg-[#00b883] transition duration-300 w-full md:w-auto"
              disabled={loadingGo}
            >
              {loadingGo ? t('Finding Crop...') : t('Find Crop')}
            </button>

            {result && (
              <div className="mt-4 flex flex-col p-4 bg-white bg-opacity-80 rounded-lg shadow-md w-full">
                <h2 className="text-lg font-bold text-center">{t('Prediction Result:')}</h2>
                <p className="text-center">
                  {t('Location')}: <span className="font-semibold">{result.Location}</span>
                </p>
                <p className="text-center">{t('Temperature')}: <span className="font-semibold">{result['Temperature (°C)']}</span></p>
                <p className="text-center">{t('Humidity')}: <span className="font-semibold">{result['Humidity (%)']}</span></p>
                <p className="text-center">{t('Average Annual Rainfall')}: <span className="font-semibold">{result['Average Annual Rainfall (mm)']}</span></p>
                <p className="text-center">{t('pH Value')}: <span className="font-semibold">{result.pH_Value}</span></p>
                <p className="text-center">{t('Predicted Crop')}: <span className="font-semibold">{cropData[result.basic_final_prediction.toLowerCase()].title[currentLanguage] || cropData[result.basic_final_prediction.toLowerCase()].title.en}</span></p>
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
    </div>
  );
};

export default Basic;