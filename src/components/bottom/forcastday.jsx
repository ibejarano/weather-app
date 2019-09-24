import React from 'react';

export default class Forcastday extends React.Component {

    render() {

        const { main,  weather } = this.props.weather

        const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

        return <div className="forcastday-container">
            <div className="image">
                <div className="text"><img src={iconUrl} alt="forcast img"/>{(main.temp - 273).toFixed(1)}</div>
            </div>
        </div>
    }

}