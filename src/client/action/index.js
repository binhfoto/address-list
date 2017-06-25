export const FIREBASE_ADD_ADDRESS = 'FIREBASE_ADD_ADDRESS';
export const FIREBASE_EDIT_ADDRESS = 'FIREBASE_EDIT_ADDRESS';
export const FIREBASE_DELETE_ADDRESS = 'FIREBASE_DELETE_ADDRESS';

export const EXPORT_TO_CSV = 'EXPORT_TO_CSV';

export const firebaseAddAddress = (snapshot) => {
    return {
        type: FIREBASE_ADD_ADDRESS,
        snapshot
    }
};

export const firebaseEditAddress = (snapshot) => {
    return {
        type: FIREBASE_EDIT_ADDRESS,
        snapshot
    }
};

export const firebaseDeleteAddress = (snapshot) => {
    return {
        type: FIREBASE_DELETE_ADDRESS,
        snapshot
    }
};