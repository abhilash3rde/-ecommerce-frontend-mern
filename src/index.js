import "./Global";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { save, load } from "redux-localstorage-simple";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import reducers from "./reducers";
// import
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// const store  = createStore(reducers)
const createStoreWithMiddleware = applyMiddleware(
  save() // Saving done here
)(createStore);
// const savedStore = applyMiddleware( save() )(store)
const store = createStoreWithMiddleware(
  reducers,
  load() // Loading done here
);

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
