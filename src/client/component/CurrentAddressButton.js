import React, {Component} from "react";
import FlatButton from "material-ui/FlatButton";
import CircularProgress from 'material-ui/CircularProgress';
import LocationIcon from 'material-ui/svg-icons/maps/my-location';
import PropTypes from "prop-types";
import _ from "lodash";
import {convertGoogleMapObjectToAddress} from "../util";

class CurrentAddressButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {

        this.setState(this.toggleLoading());

        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                const currentLocation = {
                    lat: coords.latitude,
                    lng: coords.longitude
                };

                let geocoder = new window.google.maps.Geocoder;
                geocoder.geocode({'location': currentLocation}, function (results, status) {
                    if (status === 'OK') {
                        if (results[1]) {
                            let newAddress = convertGoogleMapObjectToAddress(results[1]);
                            _.merge(newAddress, {
                                googleMap: {
                                    label: results[1].formatted_address,
                                    location: currentLocation
                                }
                            });

                            this.setState(this.toggleLoading());

                            this.props.onAddressReturned(newAddress);
                        } else {
                            window.alert('No address found against selected location');
                        }
                    } else {
                        window.alert('Invalid location, error: ' + status);
                    }
                }.bind(this));
            });
        }
    }

    toggleLoading() {
        return {
            isLoading: !this.state.isLoading
        }
    }

    render() {
        let {isLoading} = this.state;
        return (
            <FlatButton label="My address" primary={true}
                           icon={isLoading ? <CircularProgress size={30}/> : <LocationIcon/>}
                           disabled={isLoading}
                           onTouchTap={this.handleOnClick}/>
        );
    }
}

CurrentAddressButton.PropTypes = {
    onAddressReturned: PropTypes.func.isRequired
};

export default CurrentAddressButton;