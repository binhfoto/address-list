import {
    FIREBASE_ADD_ADDRESS,
    FIREBASE_EDIT_ADDRESS,
    FIREBASE_DELETE_ADDRESS
} from '../action'


const addresses = (state = [], {type, snapshot}) => {
    switch(type) {
        case FIREBASE_ADD_ADDRESS:
            return [...state, {key: snapshot.key, ...snapshot.val()}];
        case FIREBASE_EDIT_ADDRESS:
            return state.map(item => {
                return snapshot.key === item.key ? snapshot.val() : item;
            });
        case FIREBASE_DELETE_ADDRESS:
            return state.filter(item => snapshot.key !== item.key);
        default:
            return state;
    }
};

export default addresses;