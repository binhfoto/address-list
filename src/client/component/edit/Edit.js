import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import CardTitle from "material-ui/Card/CardTitle";
import CardActions from "material-ui/Card/CardActions";
import FlatButton from "material-ui/FlatButton";
import CancelIcon from "material-ui/svg-icons/device/location-disabled";
import SubmitIcon from "material-ui/svg-icons/device/location-searching";
import CurrentAddressButon from "./CurrentAddressButton";
import {cardActionStyleLeft, cardActionStyleRight} from "../../style";
import CREATE_METHOD from "../../util/addMethod";
import {editAddress} from "../../action";
import {convertGoogleMapObjectToAddress} from "../../util";

const CANCEL_ICON = <CancelIcon/>;
const SUBMIT_ICON = <SubmitIcon/>;

class Edit extends Component {

    constructor(props) {

        super(props);

        this.editComponent = {};

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleAddressReturned = this.handleAddressReturned.bind(this);
    }

    handleOnSubmit() {
        switch(this.props.type) {
            case CREATE_METHOD.FORM:
                this.handleFormAddressSubmit();
                return;
            case CREATE_METHOD.GOOGLE_MAP:
                this.handleGoogleMapAddressSubmit();
                return;
            case CREATE_METHOD.AUTO_COMPLETE_INPUT:
                this.handleAutoSearchAddressSubmit();
                return;
            default:
                return;
        }
    }

    handleFormAddressSubmit() {
        this.props.editAddress(this.editComponent.state.address, this.props.type);
        this.props.push('/');
    }

    handleGoogleMapAddressSubmit() {

        let address = this.editComponent.state.address;
        let geocoder = new window.google.maps.Geocoder;

        geocoder.geocode({'location': address.googleMap.location}, function (results, status) {
            if (status === 'OK') {
                if (results[1]) {
                    let newAddress = convertGoogleMapObjectToAddress(results[1]);
                    _.merge(address, newAddress, {
                        googleMap: {
                            label: results[1].formatted_address,
                            location: address.location
                        }
                    });
                    this.props.editAddress(address, this.props.type);
                    this.props.push('/');
                } else {
                    window.alert('No address found against selected location');
                }
            } else {
                window.alert('Invalid location, error: ' + status);
            }
        }.bind(this));
    }

    handleAutoSearchAddressSubmit() {

        let address = this.editComponent.state.address;

        let newAddress = (function(_address) {
            if(_address.street != null && _address.street !== 'N/A') return _address;
            if(!_address.googleMap || !_address.googleMap.label) return _address;

            let street = _address.googleMap.label.split(',')[0];
            if(!street) return _address;

            return _.assign({}, _address, {street});
        })(address);

        this.props.editAddress(newAddress, this.props.type);
        this.props.push('/');
    }

    handleAddressReturned(address) {
        if (this.props.address.key) {
            _.merge(address, {key: this.props.address.key});
        }
        if (this.props.address.createdBy) {
            _.merge(address, {createdBy: this.props.address.createdBy});
        }
        this.editComponent.setState({
            address
        });
    }

    /*shouldComponentUpdate() {
        return true;
     }*/

    render() {
        let link = <Link to="/"/>;
        let EditComponent = this.props.component;
        return (
            <div>
                <CardTitle title={this.props.label}/>
                <EditComponent address={this.props.address} ref={(editComponent) => {
                    this.editComponent = editComponent;
                }}/>
                <CardActions style={cardActionStyleLeft}>
                    <CurrentAddressButon onAddressReturned={this.handleAddressReturned}/>
                </CardActions>
                <CardActions style={cardActionStyleRight}>
                    <FlatButton label="Cancel" primary={true} containerElement={link} icon={CANCEL_ICON}/>
                    <FlatButton label="Submit" primary={true} containerElement={<span/>}
                                onTouchTap={this.handleOnSubmit} icon={SUBMIT_ICON}/>
                </CardActions>
            </div>
        );
    }
}

Edit.propTypes = {
    isNew: PropTypes.bool,
    component: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.func.isRequired,
    ]),
    address: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired
};

export default
    withRouter(
        connect(
            /* (state, ownProps) */
            (state, {component, type, history : {push}, match : {params : {id}}}) => {

                let isNew = true;
                let address = {};

                if (id && id !== 'new') {
                    isNew = false;
                    address = state.addresses.find(address => (address.key === id));
                }

                return {component, type, isNew, address, push};
            },
            (dispath) => {
                return {
                    editAddress: (address, createdType) => dispath(editAddress(address, createdType))
                }
            }
        )(Edit)
    );
