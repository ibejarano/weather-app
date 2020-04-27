import React, { Component } from "react";
import "./App.css";
import "./sass/app.scss";

import {
  getWeather,
  getBackgroundImage,
  getForecast,
} from "./helpers/requests";

import Weather from "./components/weather";
import ForecastSection from "./components/forecastContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "Buenos Aires",
      numForcastDays: 5,
      isLoading: true,
      forecastdays: [],
    };
  }

  async updateWeather() {
    const { location, numForcastDays } = this.state;
    let data;
    if (!localStorage.getItem("weather-app")) {
      data = await getWeather(location);
      localStorage.setItem("weather-app", JSON.stringify(data.data));
    } else {
      const dataLocal = localStorage.getItem("weather-app");
      data = JSON.parse(dataLocal);
      console.log(data);
    }

    this.setState({
      isLoading: false,
      temperature: (data.main.temp - 273).toFixed(1),
      text: data.weather[0].main,
      icon: data.weather[0].icon,
    });

    const image = await getBackgroundImage(data.weather[0].main);
    this.setState({
      background: image.data.results[0].urls.regular,
    });

    // const forecastData = await getForecast(location, numForcastDays);
    // this.setState({
    //   forecastdays: forecastData.data.list,
    // });
  }

  componentDidMount() {
    const { eventEmitter } = this.props;

    this.updateWeather();

    eventEmitter.on("updateWeather", (data) => {
      this.setState(
        {
          location: data,
        },
        () => this.updateWeather()
      );
    });
  }

  render() {
    const { isLoading, icon } = this.state;
    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
      <div className="app-container">
        {isLoading && <h3>Loading weather...</h3>}
        {!isLoading && (
          <Weather
            eventEmitter={this.props.eventEmitter}
            iconURL={iconURL}
            {...this.state}
          />
        )}
      </div>
    );
  }
}

export default App;
