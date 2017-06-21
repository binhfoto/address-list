import {cyan500} from 'material-ui/styles/colors';

export const body = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cyan500
};

export const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block'
};

export const cardActionStyleLeft = {
    ...cardActionStyle,
    float: 'left'
};

export const cardActionStyleRight = {
    ...cardActionStyle,
    float: 'right'
};

export const tableHeaderStyle = {
    fontSize: '14px',
    color: '#000',
    textTransform: 'uppercase'
};

export const tableRowStyle = {
    fontSize: '14px',
    color: '#000'
};

export const textFieldStyle = {
    marginLeft: 20,
};