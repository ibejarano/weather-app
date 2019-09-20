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
            {Array(5).map((day, idx) => {
                return <Forcastday  key={idx} />
            })}
        </div>
    }
}