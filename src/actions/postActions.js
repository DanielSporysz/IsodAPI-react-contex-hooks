import {FETCH_OFFERS} from "./types";

export const fetchOffers = () => dispatch => {
    fetch('https://isod.ee.pw.edu.pl/isod-portal/wapi?q=dissertations_offers')
        .then(res => res.json())
        .then(payload => dispatch(receiveOffers(payload)));
};

const receiveOffers = (payload) => {
    return{
        type: FETCH_OFFERS,
        offers: payload.list,
    };
};