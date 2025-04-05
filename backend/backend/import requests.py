import requests

url = "http://127.0.0.1:5000/predict"
data = {
    "airline": "Indigo",
    "source_city": "Delhi",
    "departure_time": "Morning",
    "stops": "zero",
    "arrival_time": "Afternoon",
    "destination_city": "Mumbai",
    "class": "Economy",
    "departure_date": "2025-04-05"
}

response = requests.post(url, json=data)
print(response.json())
