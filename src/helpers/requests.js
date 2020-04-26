import axios from "axios";

const WEATHER_KEY = process.env.REACT_APP_URI_KEY;
const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

async function getWeather(location) {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${WEATHER_KEY}`
    );
    return { data };
  } catch (error) {
    console.log(error.message);
    return { err: error };
  }
}

async function getBackgroundImage(description) {
  try {
    const { data } = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: `weather ${description}` },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_KEY}`,
      },
    });
    return { data };
  } catch (error) {
    console.log(error.message);
  }
}

async function getForecast(location, days) {
  try {
    const dailyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&cnt=${days}&APPID=${WEATHER_KEY}`;
    const { data } = await axios.get(dailyForecastUrl);
    return { data };
  } catch (error) {
    console.log(error);
  }
}

export { getWeather, getBackgroundImage, getForecast };
