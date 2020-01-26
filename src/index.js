import React from 'react'
import {render} from 'react-dom'
import App from './containers/App'
import "./styles.css";

import { createContext } from "react";
const { Provider, Consumer } = createContext();
export { Provider, Consumer };

render(
    <App/>,
    document.getElementById('root')
);
