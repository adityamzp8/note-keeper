import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";

export default function searchBox({ updateinfo }) {
  let [city, setCity] = useState("");
  const [error, seterror] = useState(false);

  const api = "https://api.openweathermap.org/data/2.5/weather";
  const api_key = "91afb6b2250bab7f76fe309529137f02";

  let getWeatherInfo = async () => {
    try {
      // ?q={city name}&appid={API key}
      let response = await fetch(
        `${api}?q=${city}&appid=${api_key}&units=metric`
      );
      let jsonresponse = await response.json();
      console.log(jsonresponse);
      let result = {
        city: city,
        temp: jsonresponse.main.temp,
        tempMin: jsonresponse.main.temp_min,
        tempMax: jsonresponse.main.temp_max,
        humidity: jsonresponse.main.humidity,
        feelsLike: jsonresponse.main.feels_like,
        Pressure: jsonresponse.main.pressure,
        weather: jsonresponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };

  let handleChange = (event) => {
    setCity(event.target.value);
  };

  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(city);
      setCity("");
      let newinfo = await getWeatherInfo();
      updateinfo(newinfo);
    } catch (err) {
      seterror(true);
    }
  };

  return (
    <div className="SearchBox">
      <h2>Search Weather of Your City</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          id="City"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br></br>
        <br></br>
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && <p style={{ color: "red" }}>No such place found.</p>}
      </form>
    </div>
  );
}
