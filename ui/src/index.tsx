import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { library } from "@fortawesome/fontawesome-svg-core";
import { 
  faSearch,
  faMagnet,
  faArrowUp,
  faArrowDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import App from "./App";
import configureStore from "./store";
import { GlobalStyle } from "./theme";
import IpcRenderer from "./ipcRenderer";

library.add(faSearch, faMagnet, faArrowUp, faArrowDown, faCheck);

const store = configureStore();
let defaultTheme = store.getState().theme.defaultTheme;

const ipcRenderer = new IpcRenderer(store);
ipcRenderer.registerEndpointsListener();
ipcRenderer.registerWhatRunningServicesListener();

const Root = () => (
  <ThemeProvider theme={defaultTheme}>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </ThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById("root"));