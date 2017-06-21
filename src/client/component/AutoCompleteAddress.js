import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import _ from "lodash";
import CardTitle from 'material-ui/Card/CardTitle';
import CardActions from 'material-ui/Card/CardActions';
import FlatButton from "material-ui/FlatButton";
import Divider from "material-ui/Divider";
import CancelIcon from 'material-ui/svg-icons/device/location-disabled';
import SubmitIcon from 'material-ui/svg-icons/device/location-searching';
import Geosuggest from "react-geosuggest";
import "react-geosuggest/module/geosuggest.css";
import ADD_METHOD from "../util/addMethod";
import {convertGoogleMapObjectToAddress} from "../util";
import CurrentAddressButon from "./CurrentAddressButton";
import {cardActionStyleLeft, cardActionStyleRight} from '../style'

class AutoCompleteSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: props.address || {}
        };
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleAddressSelect = this.handleAddressSelect.bind(this);
        this.handleAddressReturned = this.handleAddressReturned.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

                    this._setState(newAddress);
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

    decorateAddress(address) {

        if(address.street != null && address.street !== 'N/A') return address;
        if(!address.googleMap || !address.googleMap.label) return address;

        let street = address.googleMap.label.split(',')[0];
        if(!street) return address;

        return _.assign({}, address, {street});
    }

    handleOnSubmit() {
        this.context.handleAddressSubmit(this.decorateAddress(this.state.address), ADD_METHOD.AUTO_COMPLETE_INPUT);
        this.context.router.history.push('/');
    }

    handleAddressReturned(address) {
        this._setState(address);
    }

    render() {
        let link = <Link to="/"/>;
        let initialValue = '';
        if(this.state.address && this.state.address.googleMap){
            initialValue = this.state.address.googleMap.label;
        }

        return (
            <div>
                <CardTitle title={this.props.label}/>

                <Geosuggest
                    type={['geocode', 'cities', 'regions']}
                    value={initialValue}
                    initialValue={initialValue}
                    onSuggestSelect={this.handleAddressSelect}
                    onChange={this.handleChange}
                />
                <Divider />
                <CardActions style={cardActionStyleLeft}>
                    <CurrentAddressButon onAddressReturned={this.handleAddressReturned}/>
                </CardActions>
                <CardActions style={cardActionStyleRight}>
                    <FlatButton label="Cancel" primary={true} containerElement={link}  icon={<CancelIcon/>}/>
                    <FlatButton label="Submit" primary={true} containerElement={<span/>} onTouchTap={this.handleOnSubmit} icon={<SubmitIcon/>}/>
                </CardActions>
            </div>
        );
    }

    _setState(address) {
        if (this.state.address.key) {
            _.merge(address, {key: this.state.address.key});
        }
        if (this.state.address.createdBy) {
            _.merge(address, {createdBy: this.state.address.createdBy});
        }
        this.setState({
            address
        });
    }
}

AutoCompleteSearch.contextTypes = {
    handleAddressSubmit: PropTypes.func,
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
};

export default AutoCompleteSearch;
