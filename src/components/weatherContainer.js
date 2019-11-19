import React from "react";
import "./style-weather.scss";
import Weather from "./weather";
import LayoutTopContainer from './layoutTopContainer';

import { Manager, Reference, Popper } from "react-popper";
import LocationContainer from "./locationContainer";

export default class TopSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectLocationOpen: false
    };
  }

  onToggleSelectLocation() {
    this.setState(prevState => ({
      isSelectLocationOpen: !prevState.isSelectLocationOpen
    }));
  }

  onLocationNameChange(e) {
    this.setState({
      locationName: e.target.value
    });
  }

  onSelectCity() {
    const { locationName } = this.state;
    const { eventEmitter } = this.props;

    eventEmitter.emit("updateWeather", locationName);

    this.setState({
      isSelectLocationOpen: false
    });
  }

  render() {
    const { isSelectLocationOpen } = this.state;

    return (
      <div className="top-container">
        <LayoutTopContainer>
          <LocationContainer location={this.props.location}>
          <Manager>
            <Reference>
              {({ ref }) => (
                <button
                  className="btn btn-select-location"
                  ref={ref}
                  onClick={this.onToggleSelectLocation.bind(this)}
                >
                  Select Location
                </button>
              )}
            </Reference>
            <Popper placement="top">
              {({ ref, style, placement, arrowProps }) =>
                isSelectLocationOpen && (
                  <div
                    className="popup-container"
                    ref={ref}
                    style={style}
                    data-placement={placement}
                  >
                    <div className="form-container">
                      <label htmlFor="location-name">Location Name</label>
                      <input
                        id="location-name"
                        type="text"
                        placeholder="City Name"
                        onChange={this.onLocationNameChange.bind(this)}
                      />
                      <button
                        className="btn btn-select-location"
                        onClick={this.onSelectCity.bind(this)}
                      >
                        Select
                      </button>
                    </div>
                    <div ref={arrowProps.ref} style={arrowProps.style} />
                  </div>
                )
              }
            </Popper>
          </Manager>
          </LocationContainer>

        <Weather {...this.props} />
        </LayoutTopContainer>
      </div>
    );
  }
}
