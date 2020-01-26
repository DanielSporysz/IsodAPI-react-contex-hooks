import React, {Component} from "react"
import {Consumer} from "../index";

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
    render() {
        return <Consumer>
            {context => (<div>
                <table>
                    <tr><OfferTableHeader data={["ID", "Tytuł", "Opiekun", "Jednostka Organizacyjna", "Status"]}/></tr>
                    {context.state.filteredOffers.map(offer =>
                        <tbody key={offer.id}>
                        <OfferTable data={offer}/>
                        </tbody>)}
                </table>
            </div>)}
        </Consumer>
    }
}

export default Table