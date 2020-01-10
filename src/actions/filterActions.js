import {SELECT_ORIGIN, SELECT_PROMOTER} from "./types";

export const selectOrigin = nextValue => ({
    type: SELECT_ORIGIN,
    selectedOrigin: nextValue
});

export const selectPromoter = nextValue => ({
    type: SELECT_PROMOTER,
    selectedPromoter: nextValue
});