import React, {Component} from 'react';
import {Provider} from "../index";

import Filter from "../components/Filter";
import Table from "../components/Table";

class App extends Component {
    state = {
        selectedOrigin: "",
        selectedPromoter: "",
        origins: [],
        promoters: [],
        isFilterReady: false,
        isDataReady: false,
        allOffers: [],
        filteredOffers: []
    };

    componentDidMount() {
        fetch('https://isod.ee.pw.edu.pl/isod-portal/wapi?q=dissertations_offers')
            .then(res => res.json())
            .then(payload => (this.receiveData(payload)))
            .then(state => this.scrapData(state.allOffers))
    }

    receiveData = (payload) => {
        const state = {
            allOffers:payload.list,
            filteredOffers:payload.list,
            isDataReady:true,
            selectedPromoter: "wszystkie",
            selectedOrigin: "wszystkie"
        };

        this.setState(state);
        return state;
    };

    scrapData = offers => {
        let promoters = this.scrapPromoters(offers);
        promoters = ["wszystkie", ...promoters];
        let origins = this.scrapOrigins(offers);
        origins = ["wszystkie", ...origins];

        this.setState({
            promoters: promoters,
            origins: origins,
            isFilterReady: true
        })
    };

    filterOffers = (offers, origin, promoter) => {
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

        this.setState({
            filteredOffers: offers,
            selectedOrigin: origin,
            selectedPromoter: promoter
        });
    };

    handlePromoterChange = (value) => {
        this.filterOffers(this.state.allOffers, this.state.selectedOrigin, value);
    };

    handleOriginChange = (value) => {
        this.filterOffers(this.state.allOffers, value, this.state.selectedPromoter);
    };

    scrapPromoters = (offers) => {
        const promoters = offers.map(off => {
            const {supervisor_firstname, supervisor_lastname, supervisor_title} = off;
            return supervisor_title + " " + supervisor_firstname + " " + supervisor_lastname
        });

        return [...new Set(promoters)]
    };

    scrapOrigins = (offers) => {
        const origins = offers.map(off => {
            const {mainOrgUnit} = off;
            return mainOrgUnit
        });

        return [...new Set(origins)]
    };

    render() {
        return (
            <Provider value={{
                state:this.state,
                handlePromoterChange: (v)=>this.handlePromoterChange(v),
                handleOriginChange: (v)=>this.handleOriginChange(v)
            }}>
                <div>
                    <h1>IsodAPI - prace dyplomowe</h1>
                    {this.state.isDataReady ?
                    <div className="app">
                        <Filter/>
                        <Table/>
                    </div> : "Pobieranie danych..."}
                </div>
            </Provider>
        );
    }
}

export default App