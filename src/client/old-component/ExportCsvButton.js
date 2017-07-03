import React, {Component} from "react";
import _ from 'lodash';
import FlatButton from "material-ui/FlatButton";
import ActionExit from 'material-ui/svg-icons/action/exit-to-app';

const COLUMN_DELIMETER = ',';
const LINE_DELIMETER = '\n';

class ExportCsvButton extends Component {

    render() {
        return <FlatButton label="Export CSV" primary={true} containerElement={<span/>} icon={<ActionExit/>}
                             onTouchTap={this.downloadCSV.bind(this)}/>;
    }

    downloadCSV() {

        let addresses = this.props.addresses.map( address => {
            return _.pick(address, ['street', 'ward', 'district', 'city', 'country']);
        });

        let csv = this.convertArrayOfObjectsToCSV(addresses);
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
    }

    convertArrayOfObjectsToCSV(data = null) {

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
    }
}

export default ExportCsvButton;