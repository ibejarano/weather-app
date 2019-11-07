import React from 'react';

import './style-forecast.scss';
import Forecastday from './forecastday';


export default function BottomSection( {forecastdays} ) {

    return (
        <div className="forecast-container">
        {forecastdays.map((day, idx) => {
            return <Forecastday  key={idx} weather={day} />
        })}
        </div>
    )
}