import 'babel-polyfill';
import "antd/dist/antd.css";
import React from "react";
import * as ReactDOM from "react-dom";
import AppRouter from "./app";
import "codemirror/lib/codemirror.css";
import "./styles/global.scss";


/* eslint-disable */
ReactDOM.render(<AppRouter />, document.getElementById("app"));

if (process.env.NODE_ENV === "development") {
    if ((module).hot) {
        (module).hot.accept();
    }
}
