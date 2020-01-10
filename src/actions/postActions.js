import {FETCH_OFFERS} from "./types";

export const fetchOffers = () => dispatch => {
    fetch('https://isod.ee.pw.edu.pl/isod-portal/wapi?q=dissertations_offers')
        .then(res => res.json())
        .then(payload => dispatch(receiveOffers(payload)));
};

const receiveOffers = (payload) => {
    let promoters =  scrapPromoters(payload.list);
    promoters = ["wszystkie", ...promoters];
    let origins = scrapOrigins(payload.list);
    origins = ["wszystkie", ...origins];

    return {
        type: FETCH_OFFERS,
        offers: payload.list,
        promoters: promoters,
        origins: origins,
    }
};

const scrapPromoters = (offers) => {
    const promoters = offers.map(off => {
        const {supervisor_firstname, supervisor_lastname, supervisor_title} = off;
        return supervisor_title + " " + supervisor_firstname + " " + supervisor_lastname
    });

    return [... new Set(promoters)]
};

const scrapOrigins = (offers) => {
    const origins = offers.map(off => {
        const {mainOrgUnit} = off;
        return mainOrgUnit
    });

    return [... new Set(origins)]
};

