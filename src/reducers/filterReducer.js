import {SELECT_PROMOTER, SELECT_ORIGIN} from "../actions/types";

const filterReducer = (state = {}, action) => {
    switch (action.type) {
        case SELECT_PROMOTER:
            return {
                ...state,
                selectedPromoter: action.selectedPromoter
            };
        case SELECT_ORIGIN:
            return {
                ...state,
                selectedOrigin: action.selectedOrigin
            };
        default:
            return state;
    }
};

export default filterReducer