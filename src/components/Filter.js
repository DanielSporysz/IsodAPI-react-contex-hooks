import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import Picker from "./Picker";
import {filterOffers, scrapData} from "../actions/filterActions";

class Filter extends Component {
    static propTypes = {
        selectedOrigin: PropTypes.string,
        selectedPromoter: PropTypes.string,
        origins: PropTypes.array,
        promoters: PropTypes.array,
        isFilterReady: PropTypes.bool,
        allOffers: PropTypes.array
    };

    componentDidMount() {
        this.props.scrapData(this.props.allOffers);
    }

    handleOriginChange = (nextValue) => {
        this.props.filterOffers(this.props.allOffers, nextValue, this.props.selectedPromoter);
    };

    handlePromoterChange = (nextValue) => {
        this.props.filterOffers(this.props.allOffers, this.props.selectedOrigin, nextValue);
    };

    render() {
        let selectedPromoter = this.props.selectedPromoter;
        if (!selectedPromoter) {
            selectedPromoter = "wszystkie";
        }
        let selectedOrigin = this.props.selectedOrigin;
        if (!selectedOrigin) {
            selectedOrigin = "wszystkie";
        }

        return <div className="filter">
            {this.props.isFilterReady ? <div>
                <Picker
                    value={selectedOrigin}
                    onChange={this.handleOriginChange}
                    options={this.props.origins}
                />

                <Picker
                    value={selectedPromoter}
                    onChange={this.handlePromoterChange}
                    options={this.props.promoters}
                /></div> : "Filter is loading..."}
        </div>
    }
}

const mapStateToProps = state => {
    return {
        selectedOrigin: state.filterReducer.selectedOrigin,
        selectedPromoter: state.filterReducer.selectedPromoter,
        origins: state.filterReducer.origins,
        promoters: state.filterReducer.promoters,
        isFilterReady: state.filterReducer.isFilterReady,
        allOffers: state.postReducer.offers
    }
};

export default connect(mapStateToProps, {scrapData, filterOffers})(Filter)