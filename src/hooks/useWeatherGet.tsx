import axios from "axios";
import { useCallback, useState } from "react";

export const useWeatherGet = () => {
  const [ weather, setWeather ] = useState("");
  const getWeather = useCallback( async(address: string | undefined) => {
    if (address === undefined) {
      alert("addressが未設定です")
    } else {
      const key = process.env.REACT_APP_OPENWEATHER_KEY;
      const geo = await axios.get(`http://geoapi.heartrails.com/api/json?method=searchByPostal&postal=${address}`);
      const lon = geo.data.response.location[0].x;
      const lat = geo.data.response.location[0].y;
      const weather= await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
      console.log(weather);
      setWeather(weather.data.weather[0].main);
    }
  }, []);
  return { getWeather, weather};
}
