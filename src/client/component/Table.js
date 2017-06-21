import React, {Component} from 'react';
import PropTypes from "prop-types";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import EditIcon from 'material-ui/svg-icons/maps/edit-location';
import DeleteIcon from 'material-ui/svg-icons/communication/location-off';
import {Link} from 'react-router-dom'
import PROPERTY_NAMES from '../util/addressPropertyName';
import {tableRowStyle, tableHeaderStyle} from '../style';


class AddressTable extends Component {

    constructor(props) {
        super(props);
        this.handleAddressDelete = this.handleAddressDelete.bind(this);
    }

    handleAddressDelete(address) {
        this.context.handleAddressDelete(address.key);
    }

    render() {
        let tableRows = this.props.addresses.map((address) => {
            return (
                <TableRow key={address.key}>
                    <TableRowColumn style={{...tableRowStyle, width: '250px'}}>{address.street}</TableRowColumn>
                    <TableRowColumn style={tableRowStyle}>{address.ward}</TableRowColumn>
                    <TableRowColumn style={tableRowStyle}>{address.district}</TableRowColumn>
                    <TableRowColumn style={tableRowStyle}>{address.city}</TableRowColumn>
                    <TableRowColumn style={tableRowStyle}>{address.country}</TableRowColumn>
                    <TableRowColumn>
                        <FlatButton label="Edit" primary containerElement={<Link to={`/address/${address.key}`}/>}
                                    icon={<EditIcon/>}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <FlatButton label="Delete" secondary containerElement={<span/>} icon={<DeleteIcon/>}
                                    onTouchTap={() => this.handleAddressDelete(address)}/>
                    </TableRowColumn>
                </TableRow>
            );
        });

        return <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn style={{...tableHeaderStyle, width: '250px'}}>{PROPERTY_NAMES.STREET}</TableHeaderColumn>
                    <TableHeaderColumn style={tableHeaderStyle}>{PROPERTY_NAMES.WARD}</TableHeaderColumn>
                    <TableHeaderColumn style={tableHeaderStyle}>{PROPERTY_NAMES.DISTRICT}</TableHeaderColumn>
                    <TableHeaderColumn style={tableHeaderStyle}>{PROPERTY_NAMES.CITY}</TableHeaderColumn>
                    <TableHeaderColumn style={tableHeaderStyle}>{PROPERTY_NAMES.COUNTRY}</TableHeaderColumn>
                    <TableHeaderColumn />
                    <TableHeaderColumn />
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {tableRows}
            </TableBody>
        </Table>
    }
};

AddressTable.contextTypes = {
    handleAddressDelete: PropTypes.func
};

export default AddressTable;