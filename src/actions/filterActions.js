import {SCRAP_DATA_FOR_FILTER, FILTER_OFFERS} from "./types";

export const filterOffers = (offers, origin, promoter) => dispatch => {
    if (promoter && promoter !== "wszystkie") {
        offers = offers.filter(off => {
            return off.supervisor_title + " " + off.supervisor_firstname + " " + off.supervisor_lastname === promoter;
        });
    }
    if (origin && origin !== "wszystkie") {
        offers = offers.filter(off => {
            return off.mainOrgUnit === origin;
        });
    }

    dispatch({
        type: FILTER_OFFERS,
        filteredOffers: offers,
        selectedOrigin: origin,
        selectedPromoter: promoter
    });
};


export const scrapData = offers => dispatch => {
    let promoters = scrapPromoters(offers);
    promoters = ["wszystkie", ...promoters];
    let origins = scrapOrigins(offers);
    origins = ["wszystkie", ...origins];

    dispatch({
        type: SCRAP_DATA_FOR_FILTER,
        promoters: promoters,
        origins: origins
    })
};

const scrapPromoters = (offers) => {
    const promoters = offers.map(off => {
        const {supervisor_firstname, supervisor_lastname, supervisor_title} = off;
        return supervisor_title + " " + supervisor_firstname + " " + supervisor_lastname
    });

    return [...new Set(promoters)]
};

const scrapOrigins = (offers) => {
    const origins = offers.map(off => {
        const {mainOrgUnit} = off;
        return mainOrgUnit
    });

    return [...new Set(origins)]
};