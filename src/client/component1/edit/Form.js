import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import PROPERTY_NAMES from "../../util/addressPropertyName";
import { textFieldStyle } from '../../style'

class Form extends Component {

    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event, newValue) {
        let address = _.assign({}, this.props.address);
        address[event.target.id] = newValue;
        this.props.handleUpdateAddress(address);
    }

    render() {
        let address = this.props.address;
        return (
            <div>
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
            </div>
        );
    }
}

Form.onSubmit = (params) => {
    console.log('onFormSubmit', params);
};

Form.propTypes = {
    address: PropTypes.object.isRequired,
    handleUpdateAddress: PropTypes.func.isRequired
}

export default Form;