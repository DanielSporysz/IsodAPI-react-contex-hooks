import {FETCH_OFFERS} from "../actions/types";

const postReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_OFFERS:
            return {
                ...state,
                offers: action.offers,
                promoters: action.promoters,
                origins: action.origins,
                dataIsReady: true
            };
        default:
            return state;
    }
};

export default postReducer