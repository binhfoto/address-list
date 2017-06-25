import React, {Component} from "react";
import PropTypes from 'prop-types';
import FlatButton from "material-ui/FlatButton";
import ActionExit from "material-ui/svg-icons/action/exit-to-app";
import {connect} from "react-redux";
import {EXPORT_TO_CSV} from "../action";

const ExportCsvButton = ({handleExportToCsv}) => {
    return <FlatButton label="Export CSV" primary={true} containerElement={<span/>} icon={<ActionExit/>}
                       onTouchTap={handleExportToCsv}/>;
};

ExportCsvButton.propTypes = {
    handleExportToCsv: PropTypes.func.isRequired
};

export default connect(
    null,
    {
        handleExportToCsv: () => ({type: EXPORT_TO_CSV})
    }
)(ExportCsvButton);