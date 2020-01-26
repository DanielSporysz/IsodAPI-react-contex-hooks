import React, {Component} from "react"
import Picker from "./Picker";

import {Consumer} from "../index";

class Filter extends Component {
    render() {
        return <div className="filter">
            <Consumer>{context => (
                <div>
                    {context.state.isFilterReady ? <div>
                        <Picker
                            value={context.state.selectedOrigin}
                            onChange={context.handleOriginChange}
                            options={context.state.origins}
                        />
                        <Picker
                            value={context.state.selectedPromoter}
                            onChange={context.handlePromoterChange}
                            options={context.state.promoters}
                        /></div> : "Filter is loading..."}
                </div>
            )}
            </Consumer>
        </div>
    }
}

export default Filter