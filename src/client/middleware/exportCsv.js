import _ from 'lodash';

import {EXPORT_TO_CSV} from '../action';

const COLUMN_DELIMETER = ',';
const LINE_DELIMETER = '\n';

const downloadCSV = (addressesParam) => {

    let addresses = addressesParam.map( address => {
        return _.pick(address, ['street', 'ward', 'district', 'city', 'country']);
    });

    let csv = convertArrayOfObjectsToCSV(addresses);
    if (csv == null) return;

    let filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    let data = encodeURI(csv);

    let link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
};

const convertArrayOfObjectsToCSV = (data = null) => {

    if (data == null || !data.length) {
        return null;
    }

    let colIndex = 0;
    let keys = Object.keys(data[0]);

    let result = '';
    result += keys.join(COLUMN_DELIMETER);
    result += LINE_DELIMETER;

    data.forEach(function (item) {
        colIndex = 0;
        keys.forEach(function (key) {
            if (colIndex > 0) result += COLUMN_DELIMETER;

            result += item[key];
            colIndex++;
        });
        result += LINE_DELIMETER;
    });

    return result;
};

const exportCsvMiddleware = ({dispatch, getState}) => next => action => {

    if(action.type === EXPORT_TO_CSV) {
        let addresses = getState().addresses;
        downloadCSV(addresses);

    }
    return next(action);
};

export default exportCsvMiddleware;