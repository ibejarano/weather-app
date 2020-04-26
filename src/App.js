import React, {Component} from "react";
import "./App.css";
import "./sass/app.scss";

import {
  getWeather,
  getBackgroundImage,
  getForecast
} from './helpers/requests'

import WeatherSection from "./components/weatherContainer";
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
    const {data , err} = await getWeather(location);
    this.setState({
      isLoading: false,
      temperature: (data.main.temp - 273).toFixed(1),
      text: data.weather[0].main,
      icon: data.weather[0].icon,
    });
    
    const image = await getBackgroundImage(data.weather[0].main);
    console.log(image)
    this.setState({
      background: image.data.results[0].urls.regular,
    });

    const forecastData = await getForecast(location, numForcastDays);
    this.setState({
      forecastdays: forecastData.data.list,
    });

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
    const {
      isLoading,
      location,
      temperature,
      text,
      forecastdays,
      icon,
    } = this.state;
    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
      <div className="app-container">
        <div
          className="main-container"
          style={{ background: `url(${this.state.background})` }}
        >
          {isLoading && <h3>Loading weather...</h3>}
          {!isLoading && (
            <div className="top-section">
              <WeatherSection
                location={location}
                temperature={temperature}
                text={text}
                eventEmitter={this.props.eventEmitter}
                iconURL={iconURL}
              />
            </div>
          )}
          <div className="bottom-section">
            <ForecastSection forecastdays={forecastdays} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
