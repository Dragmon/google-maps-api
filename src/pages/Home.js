import React, { Component } from 'react';
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  LoadScript,
  //Marker,
} from '@react-google-maps/api';

class Directions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      apiresponse: false,
      travelMode: 'DRIVING',
      origin: '',
      destination: '',
      latini: 19.450051,
      lngini: -99.11839,
    };
  }

  componentDidMount() {
    let currentComponente = this;
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log('Latitude is :', position.coords.latitude);
        console.log('Longitude is :', position.coords.longitude);
        currentComponente.setState({
          latini: position.coords.latitude,
          lngini: position.coords.longitude,
        });
      });
    }
  }

  directionsCallback = (response) => {
    console.log('directionCallback', response);
    console.log('directionValues', response.routes[0].legs[0].distance.text);
    console.log('directionValues', response.routes[0].legs[0].duration.text);

    /*
    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(() => ({
          response,
          apiresponse: true,
        }));
      } else {
        console.log('response: ', response);
      }
    } */
    if (!this.state.apiresponse) {
      console.log('apiresponse', this.state.apiresponse);
      if (response !== null) {
        if (response.status === 'OK') {
          this.setState(() => ({
            response,
            apiresponse: true,
          }));
        } else {
          console.log('response: ', response);
        }
      }
    }
  };

  checkDriving = ({ target: { checked } }) => {
    checked &&
      this.setState(() => ({
        travelMode: 'DRIVING',
      }));
  };

  checkBicycling = ({ target: { checked } }) => {
    checked &&
      this.setState(() => ({
        travelMode: 'BICYCLING',
      }));
  };

  checkTransit = ({ target: { checked } }) => {
    checked &&
      this.setState(() => ({
        travelMode: 'TRANSIT',
      }));
  };

  checkWalking = ({ target: { checked } }) => {
    checked &&
      this.setState(() => ({
        travelMode: 'WALKING',
      }));
  };

  getOrigin = (ref) => {
    this.origin = ref;
  };

  getDestination = (ref) => {
    this.destination = ref;
  };

  onClick = () => {
    console.log('apiresponse onclick', this.state.apiresponse);
    if (this.origin.value !== '' && this.destination.value !== '') {
      this.setState(() => ({
        origin: this.origin.value,
        destination: this.destination.value,
        apiresponse: false,
      }));
    } else {
      alert('Favor de llenar los campos requeridos');
    }
  };

  onMapClick = (...args) => {
    console.log('onClick args: ', args);
  };

  render() {
    return (
      <div className="map">
        <div className="map-settings">
          <hr className="mt-0 mb-3" />

          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="ORIGIN">Origin</label>
                <br />
                <input
                  id="ORIGIN"
                  className="form-control"
                  type="text"
                  ref={this.getOrigin}
                />
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="DESTINATION">Destination</label>
                <br />
                <input
                  id="DESTINATION"
                  className="form-control"
                  type="text"
                  ref={this.getDestination}
                />
              </div>
            </div>
          </div>
          {/* 
          <div className="d-flex flex-wrap">
            <div className="form-group custom-control custom-radio mr-4">
              <input
                id="DRIVING"
                className="custom-control-input"
                name="travelMode"
                type="radio"
                checked={this.state.travelMode === 'DRIVING'}
                onChange={this.checkDriving}
              />
              <label className="custom-control-label" htmlFor="DRIVING">
                Driving
              </label>
            </div>

            <div className="form-group custom-control custom-radio mr-4">
              <input
                id="BICYCLING"
                className="custom-control-input"
                name="travelMode"
                type="radio"
                checked={this.state.travelMode === 'BICYCLING'}
                onChange={this.checkBicycling}
              />
              <label className="custom-control-label" htmlFor="BICYCLING">
                Bicycling
              </label>
            </div>

            <div className="form-group custom-control custom-radio mr-4">
              <input
                id="TRANSIT"
                className="custom-control-input"
                name="travelMode"
                type="radio"
                checked={this.state.travelMode === 'TRANSIT'}
                onChange={this.checkTransit}
              />
              <label className="custom-control-label" htmlFor="TRANSIT">
                Transit
              </label>
            </div>

            <div className="form-group custom-control custom-radio mr-4">
              <input
                id="WALKING"
                className="custom-control-input"
                name="travelMode"
                type="radio"
                checked={this.state.travelMode === 'WALKING'}
                onChange={this.checkWalking}
              />
              <label className="custom-control-label" htmlFor="WALKING">
                Walking
              </label>
            </div>
          </div>
 */}
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.onClick}
          >
            Build Route
          </button>
        </div>

        <div className="map-container">
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API}>
            <GoogleMap
              // required
              id="direction-example"
              // required
              mapContainerStyle={{
                height: '400px',
                width: '100%',
              }}
              // required
              zoom={15}
              // required
              center={{
                lat: this.state.latini,
                lng: this.state.lngini,
              }}
              // optional
              onClick={this.onMapClick}
              // optional
              onLoad={(map) => {
                console.log('DirectionsRenderer onLoad map: ', map);
              }}
              // optional
              onUnmount={(map) => {
                console.log('DirectionsRenderer onUnmount map: ', map);
              }}
            >
              {this.state.destination !== '' && this.state.origin !== '' && (
                <DirectionsService
                  // required
                  options={{
                    destination: this.state.destination,
                    origin: this.state.origin,
                    travelMode: this.state.travelMode,
                  }}
                  // required
                  callback={this.directionsCallback}
                  // optional
                  onLoad={(directionsService) => {
                    console.log(
                      'DirectionsService onLoad directionsService: ',
                      directionsService
                    );
                  }}
                  // optional
                  onUnmount={(directionsService) => {
                    console.log(
                      'DirectionsService onUnmount directionsService: ',
                      directionsService
                    );
                  }}
                />
              )}

              {this.state.response !== null && (
                <DirectionsRenderer
                  // required
                  options={{
                    directions: this.state.response,
                  }}
                  // optional
                  onLoad={(directionsRenderer) => {
                    console.log(
                      'DirectionsRenderer onLoad directionsRenderer: ',
                      directionsRenderer
                    );
                  }}
                  // optional
                  onUnmount={(directionsRenderer) => {
                    console.log(
                      'DirectionsRenderer onUnmount directionsRenderer: ',
                      directionsRenderer
                    );
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    );
  }
}

export default Directions;
