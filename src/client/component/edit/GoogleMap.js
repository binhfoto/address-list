import React, {Component} from "react";
import PropTypes from "prop-types";
import Map, {Marker} from "google-maps-react";
import _ from "lodash";

const BEN_THANH_LOCATION = {lat: 10.772582, lng: 106.698017};

class GoogleMap extends Component {

    constructor(props) {
        super(props);

        let address = _.isEmpty(this.props.address) ? {googleMap: {location: BEN_THANH_LOCATION}} : this.props.address;

        this.state = {
            address
        };

        this.isMapClicked = false;
        this.centerLocation = address.googleMap.location;

        this.handleMapClick = this.handleMapClick.bind(this);
    }

    handleMapClick(mapProps, map, clickEvent) {

        this.isMapClicked = true;

        let markerLocation = {
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng()
        };

        this.setState({
            address: {...this.state.address, googleMap: {location: markerLocation}}
        });
    }

    render() {

        let zoom = 15;
        let initialLocation = this.state.address.googleMap.location;

        if (!this.isMapClicked) {
            this.centerLocation = initialLocation;
        }

        this.isMapClicked = false;

        return (
            <Map google={window.google}
                 zoom={zoom}
                 initialCenter={initialLocation}
                 center={this.centerLocation}
                 onClick={this.handleMapClick}
                 style={{position: 'relative', width: '1200px', height: '400px'}}
                 containerStyle={{position: 'static', width: '1200px', height: '400px'}}>

                <Marker position={initialLocation}/>

            </Map>
        );
    }
}

GoogleMap.propTypes = {
    address: PropTypes.object.isRequired
};

export default GoogleMap;