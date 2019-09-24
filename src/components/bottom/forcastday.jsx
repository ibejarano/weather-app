import React from 'react';

export default class Forcastday extends React.Component {

    render() {

        const { main,  weather } = this.props.weather

        const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

        return <div className="forcastday-one-container">
                <img src={iconUrl} alt="forcast img"/>
                <div className="text">{(main.temp - 273).toFixed(1)}</div>
        </div>
    }

}