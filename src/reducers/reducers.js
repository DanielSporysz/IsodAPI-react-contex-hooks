import {FETCH_OFFERS, SCRAP_DATA_FOR_FILTER, FILTER_OFFERS} from "../actions/types";

export const filterReducer = (state = {}, action) => {
    switch (action.type) {
        case SCRAP_DATA_FOR_FILTER:
            return {
                ...state,
                promoters: action.promoters,
                origins: action.origins,
                isFilterReady: true
            };
        case FILTER_OFFERS:
            return {
                ...state,
                selectedPromoter: action.selectedPromoter,
                selectedOrigin: action.selectedOrigin,
                filteredOffers: action.filteredOffers
            };
        default:
            return state;
    }
};

export const postReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_OFFERS:
            return {
                ...state,
                offers: action.offers,
                dataIsReady: true
            };
        default:
            return state;
    }
};