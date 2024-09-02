import React, { useState } from 'react';
import axios from 'axios';
import bg from '../assets/bg.jpg';
import { cropData } from './Data';

const Advanced = () => {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    rainfall: '',
    ph: '',
  });
  const [predictionData, setPredictionData] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    const requestData = {
      N: parseFloat(formData.N),
      P: parseFloat(formData.P),
      K: parseFloat(formData.K),
      temperature: parseFloat(formData.temperature),
      humidity: parseFloat(formData.humidity),
      ph: parseFloat(formData.ph),
      rainfall: parseFloat(formData.rainfall),
    };

    // Validate input data
    if (Object.values(requestData).some(value => value === '' || isNaN(value))) {
      alert('Please fill in all fields with valid numbers.');
      setLoadingStatus(false);
      return; // Prevent submission if any value is invalid
    }

    try {
      const response = await axios.post('http://localhost:5000/predict_crop/advanced', requestData);
      setPredictionData(response.data);
    } catch (error) {
      console.error('Error fetching the prediction:', error);
      alert('An error occurred while fetching the prediction. Please try again.');
    } finally {
      setLoadingStatus(false);
    }
  };

  const renderPrediction = () => {
    if (!predictionData) {
      return <p className="text-black">No prediction available yet.</p>;
    }

    const cropName = predictionData.rf_model_prediction.toLowerCase();
    const cropInfo = cropData[cropName] || null;

    return (
      <div className="flex flex-col items-center justify-center">
        {cropInfo ? (
          <div className="flex flex-col items-center">
            <img
              src={cropInfo.imageUrl}
              alt={cropInfo.title}
              className="mb-2 rounded-md shadow-md"
            />
            <div className="text-center">
              <h2 className="text-lg font-bold text-black">{cropInfo.title}</h2>
              <p className="text-gray-600">Probability: {predictionData.rf_model_probability.toFixed(2)}%</p>
              <p className="text-gray-700">{cropInfo.description}</p>
            </div>
          </div>
        ) : (
          <p className="text-black">No crop information available for the prediction.</p>
        )}
      </div>
    );
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <main className="flex flex-col items-center justify-center w-full px-4 md:px-20 text-center py-8">
        <div className="bg-white bg-opacity-80 rounded-2xl shadow-2xl flex flex-col md:flex-row w-full md:w-2/3 max-w-4xl">
          <div className="w-full md:w-3/5 p-6">
            <h1 className="text-black text-3xl font-bold text-center mb-4">Crop Recommender</h1>
            <form onSubmit={handleSubmit} className="mt-4">
              {Object.keys(formData).map((key) => {
                const labels = {
                  N: 'Amount of Nitrogen in soil',
                  P: 'Amount of Phosphorus in soil',
                  K: 'Amount of Potassium in soil',
                  temperature: 'Temperature in Celsius',
                  humidity: 'Humidity (%)',
                  ph: 'pH value of soil',
                  rainfall: 'Rainfall (mm)',
                };
                return (
                  <div key={key} className="flex flex-col mb-4">
                    <label className="text-sm font-medium text-black">{labels[key]}</label>
                    <input
                      type="number"
                      id={key}
                      className="w-full border-2 border-[#00df9a] p-2 mt-1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00df9a] transition duration-300"
                      placeholder={labels[key]}
                      value={formData[key]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                );
              })}
              <button type="submit" className="bg-[#00df9a] w-full rounded-xl font-medium py-2 text-black transition duration-300 hover:bg-[#00c78b]">
                {loadingStatus ? 'Loading...' : 'Predict Crop'}
              </button>
            </form>
          </div>
          <div className="w-full md:w-2/5 p-4 flex flex-col items-center overflow-y-auto">
            <h1 className="text-black text-xl md:text-2xl font-bold text-center mb-4">Recommended Crop</h1>
            {renderPrediction()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Advanced;