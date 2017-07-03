import React, {Component} from "react";
import PropTypes from "prop-types";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import {BrowserRouter, Route} from "react-router-dom";
import Layout from "./Layout";
import List from "./List";
import Edit from "./Edit";
import firebase from "../firebase";
import "../style/app.css";

class App extends Component {

    constructor() {
        super();
        this.addressesRef = firebase.database().ref().child('addresses');

        this.state = {
            addresses: []
        };

        this.handleAddressSubmit = this.handleAddressSubmit.bind(this);
    }

    componentWillMount() {

        injectTapEventPlugin();

        this.addressesRef.on('child_added', (snapshot) => {
            let address = snapshot.val();
            this.setState({
                addresses: [...this.state.addresses, {key: snapshot.key, ...address}]
            });
        });

        this.addressesRef.on('child_changed', (snapshot) => {
            let newAddresses = this.state.addresses.map(item => {
                return snapshot.key === item.key ? snapshot.val() : item;
            });

            this.setState({
                addresses: newAddresses
            });
        });

        this.addressesRef.on('child_removed', (snapshot) => {
            let newAddresses = this.state.addresses.filter(address => snapshot.key !== address.key);
            this.setState({
                addresses: newAddresses
            });
        });


    }

    render() {
        return (
            <MuiThemeProvider>
                <BrowserRouter>
                    <Layout>
                        <Route exact path="/" component={() => <List addresses={this.state.addresses}/>}/>
                        <Route exact path="/address/:id" component={(router) => {console.log(router); return <Edit addresses={this.state.addresses}/>}}/>
                    </Layout>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }

    getChildContext() {
        return {
            handleAddressSubmit: this.handleAddressSubmit,
            handleAddressDelete: this.handleAddressDelete
        };
    }


    handleAddressSubmit(address, type) {

        let isUpdate = address.key ? true : false;

        if (isUpdate) {
            firebase.database().ref('addresses/' + address.key).set(address);
        } else {
            firebase.database().ref().child('addresses').push({
                ...address,
                createdBy: type
            });
        }
    }

    handleAddressDelete(key) {
        firebase.database().ref('addresses/' + key).set(null);
    }
}

App.childContextTypes = {
    handleAddressSubmit: PropTypes.func,
    handleAddressDelete: PropTypes.func
};

export default App;
