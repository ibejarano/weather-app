import React from 'react';

export default class Weather extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const {cityName, temperature, isDay, text, iconURL } = this.props;
        console.log(text)
        return <div className="weather-container">
            <div className="header">{cityName}</div>
            <div className="inner-container">
                <div className="image"><img src={ iconURL }/></div>
                <div className="current-weather">{ temperature }</div>
            </div>
            <div className="footer">{ text }</div>
        </div>
    }
}