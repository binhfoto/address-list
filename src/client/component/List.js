import React, {Component} from "react";
import FlatButton from 'material-ui/FlatButton';
import CardTitle from 'material-ui/Card/CardTitle';
import CardActions from 'material-ui/Card/CardActions';
import NewIcon from 'material-ui/svg-icons/maps/add-location';
import {Link} from 'react-router-dom'
import AddressTable from "./Table";
import ExportCsvButton from './ExportCsvButton';
import {cardActionStyleLeft, cardActionStyleRight} from '../style'

class List extends Component {

    render() {
        return (
            <div>
                <CardTitle title="Address List" style={cardActionStyleLeft}/>
                <CardActions style={cardActionStyleRight}>
                    <FlatButton label="New" primary containerElement={<Link to={`/address/new`}/>} icon={<NewIcon/>}/>
                    <ExportCsvButton addresses={this.props.addresses}/>
                </CardActions>
                <div style={{clear: 'both'}}></div>
                <AddressTable addresses={this.props.addresses}/>
            </div>
        );
    }
}

export default List;