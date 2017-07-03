import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Geosuggest from "react-geosuggest";
import "react-geosuggest/module/geosuggest.css";
import {convertGoogleMapObjectToAddress} from "../../util";

class AutoCompleteSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            address: props.address || {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAddressSelect = this.handleAddressSelect.bind(this);
    }

    handleAddressSelect(suggest) {
        let geocoder = new window.google.maps.Geocoder;
        geocoder.geocode({'location': suggest.location}, function (results, status) {
            if (status === 'OK') {
                if (results[1]) {
                    let newAddress = _.assign(convertGoogleMapObjectToAddress(results[1]), {
                        googleMap: {
                            label: suggest.label,
                            location: suggest.location
                        }
                    });

                    if (this.state.address.key) {
                        _.merge(newAddress, {key: this.state.address.key});
                    }
                    if (this.state.address.createdBy) {
                        _.merge(newAddress, {createdBy: this.state.address.createdBy});
                    }
                    this.setState({
                        address: newAddress
                    });

                } else {
                    window.alert('No address found against selected location');
                }
            } else {
                window.alert('Invalid location, error: ' + status);
            }
        }.bind(this));
    }

    handleChange(value) {
        if(!value) {
            let address = _.pick(this.state.address, ['key', 'createdBy']);
            this.setState({
                address
            });
        }
    }

    render() {
        let initialValue = '';
        if(this.state.address && this.state.address.googleMap){
            initialValue = this.state.address.googleMap.label;
        }

        return (
            <Geosuggest
                type={['geocode', 'cities', 'regions']}
                value={initialValue}
                initialValue={initialValue}
                onSuggestSelect={this.handleAddressSelect}
                onChange={this.handleChange}
            />
        );
    }
}

AutoCompleteSearch.propTypes = {
    address: PropTypes.object.isRequired
};

export default AutoCompleteSearch;
