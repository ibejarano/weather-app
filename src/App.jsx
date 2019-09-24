import React from 'react';
import './App.css';
import './sass/app.scss'
import axios from 'axios';

import TopSection from './components/top/index';
import BottomSection from './components/bottom/index';

const WEATHER_KEY = "6670d82bc90ab3239a41bff4b76014ec";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location: 'London',
      numForcastDays: 5,
      isLoading: true,
      forcastdays: []
    }
  }

  updateWeather() {

    const { location , numForcastDays } = this.state;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${WEATHER_KEY}`).then((res) =>{
      return res.data
    }).then(
      (data) => {
        this.setState({
          isLoading: false,
          temperature: (data.main.temp - 273).toFixed(1),
          text: data.weather[0].main,
          icon: data.weather[0].icon
        })
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
          forcastdays: data.list
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

    const {isLoading, location, temperature, text, forcastdays, icon } = this.state;
    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

    console.log(forcastdays)

    return <div className="app-container">
      <div className="main-container">
        {isLoading && <h3>Loading weather...</h3>  }
        {!isLoading &&
        <div className="top-section"> 
        <TopSection location={location}
                    temperature={temperature}
                    text={text}
                    eventEmitter = {this.props.eventEmitter}
                    iconURL={iconURL}
                    />
         </div>}
        <div className="bottom-section"> 
        <BottomSection forcastdays={forcastdays}/> 
        </div>
      </div>
    </div>
  };
}

export default App;
