import React, {Component} from "react";
import Edit from './Edit';
import Form from './Form';
import CREATE_METHOD from '../../util/addMethod'
import {Tabs, Tab} from 'material-ui/Tabs';
import {withRouter} from "react-router-dom";

export const NewLayout = () => {

    return (
        <Tabs>
            <Tab label="Form">
                <Edit component={Form} type={CREATE_METHOD.FORM}/>
            </Tab>
            <Tab label="Google Map">
            </Tab>
            <Tab label="Suggested Search">
            </Tab>
        </Tabs>
    );
};

const EditLayout = ( { match : { params : { createdBy } } } ) => {

    if(createdBy === CREATE_METHOD.FORM) {
        return <Edit component={Form} type={CREATE_METHOD.FORM}/>;
    }

    if(createdBy === CREATE_METHOD.GOOGLE_MAP) {
        /*return <GoogleMapAddress label="Edit Address" address={this.address}/>*/;
    }

    if(createdBy === CREATE_METHOD.AUTO_COMPLETE_INPUT) {
        /*return <AutoCompleteAddress label="Edit Address" address={this.address}/>;*/
    }

    return <span>Error: Only God knows why!</span>;
};

export default withRouter(EditLayout);