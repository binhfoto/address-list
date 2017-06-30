import {EDIT_ADDRESS, DELETE_ADDRESS} from '../action';
import firebase from '../firebase';

const handleEditAddress = (address, type) => {

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

export const editAddress = ({dispatch, getState}) => next => action => {

    if(action.type === EDIT_ADDRESS) {
        handleEditAddress(action.address, action.createdType);
    }
    return next(action);
};

export const deleteAddress = ({dispatch, getState}) => next => action => {

    if(action.type === DELETE_ADDRESS) {


    }
    return next(action);
};