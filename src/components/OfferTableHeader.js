import React from "react"

function OfferTableHeader(props){
    let header = props.data;
    return header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
    })
}

export default OfferTableHeader