export const FIREBASE_ADD_ADDRESS = 'FIREBASE_ADD_ADDRESS';
export const FIREBASE_EDIT_ADDRESS = 'FIREBASE_EDIT_ADDRESS';
export const FIREBASE_DELETE_ADDRESS = 'FIREBASE_DELETE_ADDRESS';

export const EDIT_ADDRESS = 'EDIT_ADDRESS';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';

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

export const editAddress = (address, createdType) => {
    return {
        type: EDIT_ADDRESS,
        address,
        createdType
    }
};

export const deleteAddress = (key) => {
    return {
        type: DELETE_ADDRESS,
        key
    }
};