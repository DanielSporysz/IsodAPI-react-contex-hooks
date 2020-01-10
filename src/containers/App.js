import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"

import Filter from "../components/Filter";
import Table from "../components/Table";

import {fetchOffers} from "../actions/postActions";

class App extends Component {
    static propTypes = {
        dataIsReady: PropTypes.bool,
    };

    componentDidMount = () => {
        this.props.fetchOffers();
    };

    render() {
        return <div>
            <h1>IsodAPI - prace dyplomowe</h1>
            {this.props.dataIsReady ?
                <div className="app">
                    <Filter/>
                    <Table/>
                </div> : "Pobieranie danych..."}
        </div>
    }
}

const mapStateToProps = state => {
    return {
        dataIsReady: state.postReducer.dataIsReady,
    }
};

export default connect(mapStateToProps, {fetchOffers})(App)