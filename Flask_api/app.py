from flask import Flask, request, jsonify
from flask_cors import CORS
from scipy import stats
import pandas as pd
import requests
import time
import numpy as np
import pickle
from dotenv import load_dotenv
import os
app = Flask(__name__)
CORS(app)

def configure():
    load_dotenv()

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    response.headers.add('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response
configure()
# Load the model
advanced_rf_pipeline = pickle.load(open("E:\\Code projects\\React\\ai-plant\\Flask_api\\models\\advanced\\advanced_rf_pipeline.pkl", "rb"))
advanced_knn_pipeline = pickle.load(open("E:\\Code projects\\React\\ai-plant\\Flask_api\\models\\advanced\\advanced_knn_pipeline.pkl", "rb"))
basic_rf_model = pickle.load(open("E:\\Code projects\\React\\ai-plant\\Flask_api\\models\\basic\\basic_rf_model.pkl", "rb"))
crop_label_dict = pickle.load(open("E:\\Code projects\\React\\ai-plant\\Flask_api\\models\\crop_label_dict.pkl", "rb"))
# Create crop_label_dict based on the provided list of crop names

def basic_prediction(input_data):
    # Get predictions from the basic model
    basic_prediction = basic_rf_model.predict(input_data)
    
    if not basic_prediction or len(basic_prediction) == 0:
        raise ValueError("No predictions were made.")

    # Log the raw predictions
    print("Raw predictions:", basic_prediction)

    # Map predictions to crop labels (directly use predictions if they are strings)
    predicted_labels = [pred for pred in basic_prediction]  # Use the raw predictions directly
    
    # Log the predictions and mapped labels
    print("Mapped labels:", predicted_labels)

    # Get the most likely prediction and its probability
    basic_final_prediction = max(set(predicted_labels), key=predicted_labels.count)

    return {
    "final_prediction": basic_final_prediction,
    "basic_final_prediction": basic_final_prediction,  # Ensure this matches your React expectations
    "rf_model_prediction": basic_final_prediction,
    }


# Geocoding function
def get_lat_lon(location_name, retries=3):
    geo_url = f"https://geocoding-api.open-meteo.com/v1/search?name={location_name}"
    all_results = []
    for attempt in range(retries):
        try:
            response = requests.get(geo_url, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if 'results' in data and data['results']:
                    for result in data['results']:
                        all_results.append({
                            'name': result['name'],
                            'country_code': result['country_code'],
                            'latitude': result['latitude'],
                            'longitude': result['longitude']
                        })
                    return all_results
            else:
                print(f"Error: {response.status_code}")
        except requests.exceptions.Timeout:
            print("Request timed out. Retrying...")
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")

        time.sleep(2)  # Wait before retrying
    return None

# Weather data function
def get_weather_data(location):
    # Ensure location has 'latitude' and 'longitude'
    lat = location.get('latitude')
    lon = location.get('longitude')
    
    if lat is None or lon is None:
        print("Missing latitude or longitude in location data.")
        return None, None
    weather_url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={os.getenv('api_key')}&units=metric"
    response = requests.get(weather_url)
    if response.status_code == 200:
        data = response.json()
        return data['main']['temp'], data['main']['humidity']
    return None, None
# Average rainfall function
def get_avg_annual_rainfall(location):
    weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={location['latitude']}&longitude={location['longitude']}&daily=precipitation_sum&timezone=auto"
    response = requests.get(weather_url)
    if response.status_code == 200:
        data = response.json()
        return sum(data['daily']['precipitation_sum'])
    return None

def get_pH_Value(location):
    return 6.5  # Dummy value for soil pH

@app.route("/predict_crop/basic", methods=["POST"])
def predict_crop_basic():
    try:
        form_values = request.json
        location_name = form_values.get("location")
        print("Received location:", location_name)

        locations = get_lat_lon(location_name)
        if locations is None or len(locations) == 0:
            return jsonify({"error": "Could not find location."}), 400

        location = locations[0]
        print("Location data:", location)

        temperature, humidity = get_weather_data(location)
        avg_annual_rainfall = get_avg_annual_rainfall(location)
        pH_Value = get_pH_Value(location)

        if temperature is not None:
            # Create input DataFrame with the correct features
            input_data = pd.DataFrame([[temperature, humidity, pH_Value, avg_annual_rainfall]],
                                       columns=["Temperature", "Humidity", "pH_Value", "Rainfall"])  # Ensure these match training features

            # Check the input data shape and columns
            print("Input Data for Prediction:")
            print(input_data)
            print("Input Data Columns:", input_data.columns.tolist())

            # Make the prediction
            prediction_data = basic_prediction(input_data)  # Pass the DataFrame directly
            prediction_data.update({
                'Location': location_name,
                'CountryCode': location['country_code'],
                'Temperature (°C)': temperature,
                'Humidity (%)': humidity,
                'Average Annual Rainfall (mm)': avg_annual_rainfall,
                'pH_Value': pH_Value
            })
            print("Prediction Result:", prediction_data)
            return jsonify(prediction_data)

        return jsonify({"error": "Error fetching weather data."}), 400

    except KeyError as e:
        print(f"Missing key: {e}")
        return jsonify({"error": f"Missing key: {e}"}), 400
    except ValueError as e:
        print(f"Value error: {e}")
        return jsonify({"error": "Invalid input"}), 400
    except Exception as e:
        print(f"Internal server error: {e}")
        return jsonify({"error": "Internal server error"}), 500
@app.route("/geocode", methods=["GET"])
def geocode():
    location_name = request.args.get("location")
    if not location_name:
        return jsonify({"error": "Location parameter is required."}), 400
    
    # Call the get_lat_lon function to retrieve coordinates and country codes
    results = get_lat_lon(location_name)
    
    if results is None:
        return jsonify({"error": "Could not find location."}), 404

    # Return the results in a structured format
    return jsonify(results)

def advanced_prediction(input_data):
    rf_prediction_index = advanced_rf_pipeline.predict(input_data)[0]
    knn_prediction_index = advanced_knn_pipeline.predict(input_data)[0]

    print("RF Prediction Index:", rf_prediction_index)  # Debugging
    print("KNN Prediction Index:", knn_prediction_index)  # Debugging

    # Assuming the models return crop names directly
    rf_prediction = rf_prediction_index  # Directly use the prediction
    knn_prediction = knn_prediction_index  # Directly use the prediction

    print("RF Prediction:", rf_prediction)  # Debugging
    print("KNN Prediction:", knn_prediction)  # Debugging

    prediction_data = {
        "rf_model_prediction": rf_prediction,
        "rf_model_probability": max(advanced_rf_pipeline.predict_proba(input_data)[0]) * 100,
        "knn_model_prediction": knn_prediction,
        "knn_model_probability": max(advanced_knn_pipeline.predict_proba(input_data)[0]) * 100,
    }

    all_predictions = [rf_prediction, knn_prediction]
    all_probs = [
        prediction_data["rf_model_probability"],
        prediction_data["knn_model_probability"],
    ]

    unique, counts = np.unique(all_predictions, return_counts=True)
    if len(unique) > 1 and counts.max() > 1:
        prediction_data["final_prediction"] = unique[counts.argmax()]
    else:
        prediction_data["final_prediction"] = all_predictions[0]

    print("Final Prediction Data:", prediction_data)  # Debugging
    return prediction_data
@app.route("/predict_crop/advanced", methods=["POST"])
def predictcrop():
    try:
        form_values = request.json
        print("Received data:", form_values)

        # Ensure all necessary keys are present
        column_names = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
        input_data = np.array([[float(form_values[cn]) for cn in column_names]])

        prediction_data = advanced_prediction(input_data)
        return jsonify(prediction_data)

    except KeyError as e:
        print(f"Missing key: {e}")
        return jsonify({"error": f"Missing key: {e}"}), 400
    except ValueError as e:
        print(f"Value error: {e}")
        return jsonify({"error": "Invalid input"}), 400
    except Exception as e:
        print(f"Internal server error: {e}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000, host='0.0.0.0')
