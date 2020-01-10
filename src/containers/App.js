import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"

import {fetchOffers} from "../actions/postActions";
import {selectOrigin, selectPromoter} from "../actions/filterActions";

import Picker from "../components/Picker";
import OfferTable from "../components/OfferTable";
import OfferTableHeader from "../components/OfferTableHeader";

class App extends Component {
    static propTypes = {
        selectedOrigin: PropTypes.string,
        selectedPromoter: PropTypes.string,
        offers: PropTypes.array,
        origins: PropTypes.array,
        promoters: PropTypes.array,
        dataIsReady: PropTypes.bool,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    };

    handleOriginChange = (nextValue) => {
        const {dispatch} = this.props;
        dispatch(selectOrigin(nextValue));
    };

    handlePromoterChange = (nextValue) => {
        const {dispatch} = this.props;
        dispatch(selectPromoter(nextValue));
    };

    componentDidMount = () => {
        const {dispatch} = this.props;
        dispatch(fetchOffers());
    };

    render() {
        console.log("REndering");
        let selectedPromoter = this.props.selectedPromoter;
        if (!selectedPromoter){
            selectedPromoter = "wszystkie";
        }
        let selectedOrigin = this.props.selectedOrigin;
        if (!selectedOrigin){
            selectedOrigin = "wszystkie";
        }

        let offers = this.props.offers;
        if (selectedPromoter !== "wszystkie"){
            offers = offers.filter(off => {
                return off.supervisor_title + " " + off.supervisor_firstname + " " + off.supervisor_lastname === selectedPromoter;
            });
        }
        if (selectedOrigin !== "wszystkie"){
            offers = offers.filter(off => {
                return off.mainOrgUnit === selectedOrigin;
            });
        }


        return <div>
            <h1>IsodAPI - prace dyplomowe</h1>

            {this.props.dataIsReady ?
            <div className="contents">
                <Picker
                    value={selectedOrigin}
                    onChange={this.handleOriginChange}
                    options={this.props.origins}
                />

                <Picker
                    value={selectedPromoter}
                    onChange={this.handlePromoterChange}
                    options={this.props.promoters}
                />

                <table id='offersTable'>
                    {offers.map(offer =>
                        <tbody key={offer.id}>
                        <tr><OfferTableHeader data={["ID", "Tytuł", "Opiekun", "Jednostka Organizacyjna", "Status"]}/>
                        </tr>
                        <OfferTable data={offer}/>
                        </tbody>)}
                </table>
            </div> : "Pobieranie danych..."}
        </div>
    }
}

const mapStateToProps = state => {
    return {
        selectedOrigin: state.filterReducer.selectedOrigin,
        selectedPromoter: state.filterReducer.selectedPromoter,
        offers: state.postReducer.offers,
        origins: state.postReducer.origins,
        promoters: state.postReducer.promoters,
        dataIsReady: state.postReducer.dataIsReady,
        lastUpdated: state.postReducer.lastUpdated
    }
};

export default connect(mapStateToProps)(App)