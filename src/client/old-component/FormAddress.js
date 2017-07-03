import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import _ from "lodash";
import Divider from "material-ui/Divider";
import CardTitle from 'material-ui/Card/CardTitle';
import CardActions from 'material-ui/Card/CardActions';
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import CancelIcon from 'material-ui/svg-icons/device/location-disabled';
import SubmitIcon from 'material-ui/svg-icons/device/location-searching';
import CurrentAddressButon from "./CurrentAddressButton";
import ADD_METHOD from "../util/addMethod";
import PROPERTY_NAMES from "../util/addressPropertyName";
import {cardActionStyleLeft, cardActionStyleRight, textFieldStyle} from '../style'


class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            address: props.address || {}
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleAddressReturned = this.handleAddressReturned.bind(this);
    }

    handleOnChange(event, newValue) {
        let address = _.assign({}, this.state.address);
        address[event.target.id] = newValue;
        this.setState({
            address
        })
    }

    handleOnSubmit() {
        this.context.handleAddressSubmit(this.state.address, ADD_METHOD.FORM);
        this.context.router.history.push('/');
    }

    handleAddressReturned(address) {
        if (this.state.address.key) {
            _.merge(address, {key: this.state.address.key});
        }
        if (this.state.address.createdBy) {
            _.merge(address, {createdBy: this.state.address.createdBy});
        }
        this.setState({address});
    }

    render() {
        let address = this.state.address;
        let link = <Link to="/"/>;
        return (
            <div>
                <CardTitle title={this.props.label}/>

                <TextField id={PROPERTY_NAMES.STREET.toLowerCase()} value={address.street || ''}
                           hintText={PROPERTY_NAMES.STREET} floatingLabelText={PROPERTY_NAMES.STREET} style={textFieldStyle}
                           underlineShow={false} onChange={this.handleOnChange}/>
                <Divider />
                <TextField id={PROPERTY_NAMES.WARD.toLowerCase()} value={address.ward || ''}
                           hintText={PROPERTY_NAMES.WARD} floatingLabelText={PROPERTY_NAMES.WARD} style={textFieldStyle}
                           underlineShow={false} onChange={this.handleOnChange}/>
                <Divider />
                <TextField id={PROPERTY_NAMES.DISTRICT.toLowerCase()} value={address.district || ''}
                           hintText={PROPERTY_NAMES.DISTRICT} floatingLabelText={PROPERTY_NAMES.DISTRICT} style={textFieldStyle}
                           underlineShow={false} onChange={this.handleOnChange}/>
                <Divider />
                <TextField id={PROPERTY_NAMES.CITY.toLowerCase()} value={address.city || ''}
                           hintText={PROPERTY_NAMES.CITY} floatingLabelText={PROPERTY_NAMES.CITY} style={textFieldStyle}
                           underlineShow={false} onChange={this.handleOnChange}/>
                <Divider />
                <TextField id={PROPERTY_NAMES.COUNTRY.toLowerCase()} value={address.country || ''}
                           hintText={PROPERTY_NAMES.COUNTRY} floatingLabelText={PROPERTY_NAMES.COUNTRY} style={textFieldStyle}
                           underlineShow={false} onChange={this.handleOnChange}/>
                <Divider />

                <CardActions style={cardActionStyleLeft}>
                    <CurrentAddressButon onAddressReturned={this.handleAddressReturned}/>
                </CardActions>
                <CardActions style={cardActionStyleRight}>
                    <FlatButton label="Cancel" primary={true} containerElement={link} icon={<CancelIcon/>}/>
                    <FlatButton label="Submit" primary={true} containerElement={<span/>} onTouchTap={this.handleOnSubmit} icon={<SubmitIcon/>}/>
                </CardActions>
            </div>
        );
    }
}

Form.contextTypes = {
    handleAddressSubmit: PropTypes.func,
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
};

export default Form;