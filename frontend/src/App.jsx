import { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  InputAdornment,
  CircularProgress,
  Grid,
} from "@mui/material";
import {
  Flight,
  AirlineSeatReclineNormal,
  Schedule,
  LocationOn,
  DateRange,
  MonetizationOn,
} from "@mui/icons-material";

function FlightPricePredictor() {
  const [formData, setFormData] = useState({
    airline: "",
    source_city: "",
    departure_time: "",
    stops: "",
    arrival_time: "",
    destination_city: "",
    class: "",
    departure_date: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      ;
      setPrediction(response.data.prediction);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get prediction");
    } finally {
      setLoading(false);
    }
  };

  const airlines = ["SpiceJet", "AirAsia", "Vistara", "GO_FIRST", "Indigo", "Air_India"];
  const cities = ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Hyderabad", "Chennai"];
  const times = [
    { value: "Early_Morning", label: "Early Morning (12AM-6AM)" },
    { value: "Morning", label: "Morning (6AM-12PM)" },
    { value: "Afternoon", label: "Afternoon (12PM-6PM)" },
    { value: "Evening", label: "Evening (6PM-12AM)" },
    { value: "Night", label: "Night (8PM-12AM)" },
    { value: "Late_Night", label: "Late Night (12AM-5AM)" },
  ];
  const stopsOptions = [
    { value: "zero", label: "Non-stop" },
    { value: "one", label: "1 Stop" },
    { value: "two_or_more", label: "2+ Stops" },
  ];
  const classOptions = [
    { value: "Economy", label: "Economy" },
    { value: "Business", label: "Business" },
  ];

  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "radial-gradient(circle, #1e3c72 0%, #2a5298 100%)",
      p: 4,
    }}>
      <Paper elevation={8} sx={{
        width: "100%",
        maxWidth: "800px",
        p: 5,
        borderRadius: 3,
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        color: "white",
      }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
          Forever Flights
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {[
              { name: "airline", label: "Airline", options: airlines, icon: <Flight /> },
              { name: "source_city", label: "Source City", options: cities, icon: <LocationOn /> },
              { name: "destination_city", label: "Destination City", options: cities, icon: <LocationOn /> },
              { name: "departure_time", label: "Departure Time", options: times, icon: <Schedule /> },
              { name: "arrival_time", label: "Arrival Time", options: times, icon: <Schedule /> },
              { name: "stops", label: "Stops", options: stopsOptions, icon: <AirlineSeatReclineNormal /> },
              { name: "class", label: "Class", options: classOptions },
            ].map(({ name, label, options, icon }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  select
                  fullWidth
                  name={name}
                  label={label}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  InputProps={icon ? { startAdornment: <InputAdornment position="start">{icon}</InputAdornment> } : {}}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value || option} value={option.value || option}>
                      {option.label || option.replace("_", " ")}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            ))}

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                name="departure_date"
                label="Departure Date"
                InputLabelProps={{ shrink: true }}
                value={formData.departure_date}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start"><DateRange /></InputAdornment>,
                }}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.5, background: "#ff9800" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Predict Price"}
          </Button>
        </Box>

        {prediction !== null && (
          <Paper elevation={3} sx={{ mt: 4, p: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <MonetizationOn color="primary" fontSize="large" />
            <Typography variant="h5" fontWeight="bold">₹{Math.round(prediction).toLocaleString()}</Typography>
          </Paper>
        )}

        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </Paper>
    </Box>
  );
}

export default FlightPricePredictor;
