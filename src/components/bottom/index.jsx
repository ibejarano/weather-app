import React from 'react';

import './style.scss';
import Forcastday from './forcastday';


export default class BottomSection extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render () {
        const { forcastdays } = this.props;
        return <div className="bottom-container">
            <div className="forecast-container">
            {forcastdays.map((day, idx) => {
                return <Forcastday  key={idx} weather={day} />
            })}
            </div>
        </div>
    }
}