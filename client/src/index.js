import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers/index.js";
import {thunk} from "redux-thunk";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
const reduxStore = createStore(reducers, applyMiddleware(thunk))
root.render(
    <Provider store={reduxStore}>
        <App/>
    </Provider>

);
