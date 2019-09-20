import React from 'react';
import './App.css';
import './sass/app.scss'
import axios from 'axios';

import TopSection from './components/top/index';
import BottomSection from './components/bottom/index';

const WEATHER_KEY = "31bbf28b49c044d60e917d3a8ee0a2ab";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location: 'London',
      numForcastDays: 5,
      isLoading: true
    }
  }

  updateWeather() {

    const { location , numForcastDays } = this.state;

    axios.get(`http://api.weatherstack.com/forecast?access_key=${WEATHER_KEY}&query=${location}&days=${numForcastDays}`).then((res) =>{
      return res.data
    }).then(
      (data) => {
        console.log(data)
        this.setState({
          isLoading: false,
          temperature: data.current.temperature,
          isDay: data.current.is_day,
          text: data.current.weather_descriptions[0],
          iconURL: data.current.weather_icons[0],
          forcastdays: Array(5)
        })
      }
    ).catch((err) => {
      if(err){
      console.error("cannot fetch Weather from API: ", err)}
    });
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

    const {isLoading, location, temperature, isDay, text, iconURL, forcastdays } = this.state;

    return <div className="app-container">
      <div className="main-container">
        {isLoading && <h3>Loading weather...</h3>  }
        {!isLoading &&
        <div className="top-section"> 
        <TopSection location={location}
                    temperature={temperature}
                    isDay={isDay}
                    text={text}
                    iconURL={iconURL}
                    eventEmitter = {this.props.eventEmitter}
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
