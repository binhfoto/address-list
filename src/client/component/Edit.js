import React, {Component} from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import { withRouter } from 'react-router';
import CREATE_METHOD from '../util/addMethod'
import FormAddress from './FormAddress';
import AutoCompleteAddress from './AutoCompleteAddress';
import GoogleMapAddress from './GoogleMapAddress';

class Edit extends Component {

    constructor(props) {
        super(props);

        let id = props.match.params.id;
        this.isNew = true;
        this.address = {};

        if(id !== 'new') {
            this.isNew = false;
            this.address = props.addresses.find( item => item.key === id);
        }
    }

    render() {

        if(this.isNew) {
            return (
                <Tabs>
                    <Tab label="Form">
                        <FormAddress label="Create New Address" address={this.address}/>
                    </Tab>
                    <Tab label="Google Map">
                        <GoogleMapAddress label="Create New Address" address={this.address}/>
                    </Tab>
                    <Tab label="Suggested Search">
                        <AutoCompleteAddress label="Create New Address" address={this.address}/>
                    </Tab>
                </Tabs>
            );
        }

        if(this.address.createdBy === CREATE_METHOD.FORM) {
            return <FormAddress label="Edit Address" address={this.address}/>;
        }

        if(this.address.createdBy === CREATE_METHOD.GOOGLE_MAP) {
            return <GoogleMapAddress label="Edit Address" address={this.address}/>;
        }

        if(this.address.createdBy === CREATE_METHOD.AUTO_COMPLETE_INPUT) {
            return <AutoCompleteAddress label="Edit Address" address={this.address}/>;
        }

        return <span>Error: Only God knows why!</span>;
    }
}

export default withRouter(Edit);