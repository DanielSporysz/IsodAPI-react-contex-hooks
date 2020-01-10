import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"

function OfferTableHeader(props) {
    let header = props.data;
    return header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
    })
}

function OfferTable(props) {
    const {id, title, supervisor_firstname, supervisor_lastname, supervisor_title, status, mainOrgUnit} = props.data;
    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{title}</td>
            <td>{supervisor_title + " " + supervisor_firstname + " " + supervisor_lastname}</td>
            <td>{mainOrgUnit}</td>
            <td>{status}</td>
        </tr>
    )
}

class Table extends Component {
    static propTypes = {
        offers: PropTypes.array,
        filteredOffers: PropTypes.array,
    };

    render() {
        let offersToDisplay;
        if (this.props.filteredOffers) {
            offersToDisplay = this.props.filteredOffers;
        } else {
            offersToDisplay = this.props.offers;
        }

        return <div>
            <table>
                <tr><OfferTableHeader data={["ID", "Tytuł", "Opiekun", "Jednostka Organizacyjna", "Status"]}/></tr>
                {offersToDisplay.map(offer =>
                    <tbody key={offer.id}>
                    <OfferTable data={offer}/>
                    </tbody>)}
            </table>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        offers: state.postReducer.offers,
        filteredOffers: state.filterReducer.filteredOffers
    }
};

export default connect(mapStateToProps)(Table)