import React from 'react';
import './App.css';
import './sass/app.scss'
import axios from 'axios';

import WeatherSection from './components/weatherContainer';
import ForecastSection from './components/forecastContainer';

const WEATHER_KEY = "6670d82bc90ab3239a41bff4b76014ec";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location: 'London',
      numForcastDays: 5,
      isLoading: true,
      forecastdays: []
    }
  }

  updateWeather() {

    const { location , numForcastDays } = this.state;
    console.log('my id', `Cliend-ID ${process.env.API_KEY}`)
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${WEATHER_KEY}`).then((res) =>{
      return res.data
    }).then(
      (data) => {
        this.setState({
          isLoading: false,
          temperature: (data.main.temp - 273).toFixed(1),
          text: data.weather[0].main,
          icon: data.weather[0].icon
        });

        axios.get('https://api.unsplash.com/search/photos', {
          params: { query: `weather ${data.weather[0].main}`},
          headers: {
              Authorization:'Client-ID fdd5f3584357c4701ebbe69fc52c46db98728ba8edb3d5c63b067189e77c5615'  
          }
      }).then(result => {
        console.log(result)
        this.setState({
          background: result.data.results[0].urls.regular
        })
      }).catch(err => console.log('Error ocurrio!', err))
      }
    ).catch((err) => {
      if(err){
      console.error("cannot fetch Weather from API: ", err)}
    });;

    /* #TESTINGS FORECAST DAYS*/
    const dailyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&cnt=${numForcastDays}&APPID=${WEATHER_KEY}`

    axios.get(dailyForecastUrl)
      .then((res) => res.data)
      .then( data => {
        this.setState({
          forecastdays: data.list
        })
      })
      .catch((err) => console.error('you have an error:' , err))
  }

  componentDidMount(){
    const { eventEmitter } = this.props;

    this.updateWeather();

    eventEmitter.on("updateWeather", (data) => {
      this.setState({
        location: data
      }, () => this.updateWeather() );
    })
  }

  render () {

    const {isLoading, location, temperature, text, forecastdays, icon } = this.state;
    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

    return <div className="app-container">
      <div className="main-container" 
        style={{background: `url(${this.state.background})` }}
        
      >
        {isLoading && <h3>Loading weather...</h3>  }
        {!isLoading &&
        <div className="top-section"> 
        <WeatherSection location={location}
                    temperature={temperature}
                    text={text}
                    eventEmitter = {this.props.eventEmitter}
                    iconURL={iconURL}
                    />
         </div>}
        <div className="bottom-section"> 
        <ForecastSection forecastdays={forecastdays}/> 
        </div>
      </div>
    </div>
  };
}

export default App;
