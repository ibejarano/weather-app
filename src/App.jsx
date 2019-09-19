import React from 'react';
import logo from './logo.svg';
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
      cityName: 'London',
      forcastDays: 5,
      isLoading: true
    }
  }

  componentDidMount(){
    const { cityName , forcastDays } = this.state;
    
    axios.get(`http://api.weatherstack.com/forecast?access_key=${WEATHER_KEY}&query=${cityName}&days=${forcastDays}`).then((res) =>{
      return res.data
    }).then(
      (data) => {
        this.setState({
          isLoading: false,
          temperature: data.current.temperature,
          isDay: data.current.is_day,
          text: data.current.weather_descriptions[0],
          iconURL: data.current.weather_icons[0]
        })
      }
    ).catch((err) => {
      if(err){
      console.error("cannot fetch Weather from API: ", err)}
    });
  }

  render () {

    const {isLoading, cityName, temperature, isDay, text, iconURL } = this.state;

    return <div className="app-container">
      <div className="main-container">
        {isLoading && <h3>Loading weather...</h3>  }
        {!isLoading &&
        <div className="top-section"> 
        <TopSection location={cityName}
                    temperature={temperature}
                    isDay={isDay}
                    text={text}
                    iconURL={iconURL}
                    />
         </div>}
        <div className="bottom-section"> 
        <BottomSection /> 
        </div>
      </div>
    </div>
  };
}

export default App;
