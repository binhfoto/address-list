import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import _ from "lodash";
import CardTitle from 'material-ui/Card/CardTitle';
import CardActions from 'material-ui/Card/CardActions';
import FlatButton from "material-ui/FlatButton";
import CancelIcon from 'material-ui/svg-icons/device/location-disabled';
import SubmitIcon from 'material-ui/svg-icons/device/location-searching';
import Map, {Marker} from "google-maps-react";
import ADD_METHOD from "../util/addMethod";
import {convertGoogleMapObjectToAddress} from "../util";
import CurrentAddressButon from "./CurrentAddressButton";
import {cardActionStyleLeft, cardActionStyleRight} from '../style'

class GoogleMapAddress extends Component {

    constructor(props) {
        super(props);
        this.address = props.address || {};

        // Ben Thanh market
        let initialLocation = this.address.key ? this.address.googleMap.location : {lat: 10.772582, lng: 106.698017};

        this.state = {
            zoom: 15,
            markerLocation: initialLocation,
            centerLocation: initialLocation
        };

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleAddressReturned = this.handleAddressReturned.bind(this);
    }

    handleOnSubmit() {
        let geocoder = new window.google.maps.Geocoder;
        geocoder.geocode({'location': this.state.markerLocation}, function (results, status) {
            if (status === 'OK') {
                if (results[1]) {
                    let newAddress = convertGoogleMapObjectToAddress(results[1]);
                    _.merge(this.address, newAddress, {
                        googleMap: {
                            label: results[1].formatted_address,
                            location: this.state.markerLocation
                        }
                    });
                    this.context.handleAddressSubmit(this.address, ADD_METHOD.GOOGLE_MAP);
                    this.context.router.history.push('/');
                } else {
                    window.alert('No address found against selected location');
                }
            } else {
                window.alert('Invalid location, error: ' + status);
            }
        }.bind(this));
    }

    handleMapClick(mapProps, map, clickEvent) {

        let markerLocation = {
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng()
        };

        this.setState({
            markerLocation
        });
    }

    handleAddressReturned(address) {
        this.setState({
            zoom: 17,
            markerLocation: address.googleMap.location,
            centerLocation: address.googleMap.location
        });
    }

    render() {
        let link = <Link to="/"/>;

        return (
            <div>
                <CardTitle title={this.props.label}/>

                <Map google={window.google}
                     zoom={this.state.zoom}
                     initialCenter={this.state.markerLocation}
                     center={this.state.centerLocation}
                     onClick={this.handleMapClick}
                     style={{position: 'relative', width: '1200px', height: '400px'}}
                     containerStyle={{position: 'static', width: '1200px', height: '400px'}}>

                        <Marker position={this.state.markerLocation}/>

                </Map>

                <CardActions style={{...cardActionStyleLeft}}>
                    <CurrentAddressButon onAddressReturned={this.handleAddressReturned}/>
                </CardActions>
                <CardActions style={{...cardActionStyleRight}}>
                    <FlatButton label="Cancel" primary={true} containerElement={link} icon={<CancelIcon/>}/>
                    <FlatButton label="Submit" primary={true} containerElement={<span/>} onTouchTap={this.handleOnSubmit} icon={<SubmitIcon/>}/>
                </CardActions>
            </div>
        );
    }
}

GoogleMapAddress.contextTypes = {
    handleAddressSubmit: PropTypes.func,
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
};

export default GoogleMapAddress;