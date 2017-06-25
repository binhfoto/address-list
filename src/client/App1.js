import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {BrowserRouter, Route} from "react-router-dom";
import Layout from "./component1/Layout";
import List from "./component1/List";
import firebase from "./firebase";


import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware} from 'redux';
import { firebaseAddAddress, firebaseDeleteAddress, firebaseEditAddress} from './action';
import addressReducer from './reducer/addresses';
import exportCsvMiddleware from './middleware/exportCsv'

import "./style/app.css";

const firebaseRegister = (dispatch) => {

    let addressesRef = firebase.database().ref().child('addresses');

    addressesRef.on('child_added', (snapshot) => {
        dispatch(firebaseAddAddress(snapshot));
    });

    addressesRef.on('child_changed', (snapshot) => {
        dispatch(firebaseEditAddress(snapshot));
    });

    addressesRef.on('child_removed', (snapshot) => {
        dispatch(firebaseDeleteAddress(snapshot));
    });
};

const App = () => {

    const reducer = combineReducers({
        addresses: addressReducer
    });

    // apply middle to get state for external component
    const store = createStore(reducer, {addresses: []}, applyMiddleware(exportCsvMiddleware));

    firebaseRegister(store.dispatch);

    return (
        <Provider store={store}>
            <MuiThemeProvider>
                <BrowserRouter>
                    <Layout>
                        <Route exact path="/" component={List}/>
                        {/*<Route exact path="/address/:id" component={(router) => {console.log(router); return <Edit addresses={this.state.addresses}/>}}/>*/}
                    </Layout>
                </BrowserRouter>
            </MuiThemeProvider>
        </Provider>
    );
};

export default App;
