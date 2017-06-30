import React, {Component} from "react";
import PropTypes from 'prop-types'
import _ from 'lodash';
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import CardTitle from "material-ui/Card/CardTitle";
import CardActions from "material-ui/Card/CardActions";
import FlatButton from "material-ui/FlatButton";
import CancelIcon from "material-ui/svg-icons/device/location-disabled";
import SubmitIcon from "material-ui/svg-icons/device/location-searching";
import CurrentAddressButon from "./CurrentAddressButton";
import {cardActionStyleLeft, cardActionStyleRight} from "../../style";
import CREATE_METHOD from '../../util/addMethod';
import {editAddress, EDIT_ADDRESS} from '../../action';

const CANCEL_ICON = <CancelIcon/>;
const SUBMIT_ICON = <SubmitIcon/>;

class Edit extends Component {

    constructor(props) {

        super(props);

        this.state = {
            address: props.address
        };

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleAddressUpdate = this.handleAddressUpdate.bind(this);
        this.handleAddressReturned = this.handleAddressReturned.bind(this);
    }

    handleOnSubmit() {
        this.props.editAddress(this.state.address, CREATE_METHOD.FORM);
        this.props.push('/');
    }

    handleAddressReturned(address) {
        if (this.state.address.key) {
            _.merge(address, {key: this.state.address.key});
        }
        if (this.state.address.createdBy) {
            _.merge(address, {createdBy: this.state.address.createdBy});
        }
        if(this.props.type === CREATE_METHOD.GOOGLE_MAP) {
            this.setState({
                zoom: 17,
                markerLocation: address.googleMap.location,
                centerLocation: address.googleMap.location
            });
            return;
        }
        this.setState({
            address
        });
    }

    handleAddressUpdate(address) {
        this.setState({ address })
    }

    /*shouldComponentUpdate() {
        return true;
    }*/

    render() {
        let link = <Link to="/"/>;
        let EditComponent = this.props.component;
        //EditComponent.onSubmit
        return (
            <div>
                <CardTitle title={this.props.label}/>
                <EditComponent address={this.state.address} handleUpdateAddress={this.handleAddressUpdate} />
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
        (state, { component, type, history : { push }, match : { params : { id } } }) => {

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
