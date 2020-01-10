import React from "react"

function OfferTable(props){
    const { id, title, supervisor_firstname, supervisor_lastname, supervisor_title, status, mainOrgUnit} = props.data;
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

export default OfferTable