import { ThemeProvider } from "@mui/material/styles";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../src/config/store";
import { BackToTop } from "./assets";
import { BASENAME } from "./config";
import theme from "./config/theme";
import { MainRoutes } from "./routers";
import { BackTop } from "antd";
import TawkTo from "tawkto-react";
const App = () => {
  useEffect(() => {
    var tawk = new TawkTo("62de7eab54f06e12d88b3292", "1g8qhtkhr");

    tawk.onStatusChange((status) => {
      console.log(status);
    });
  }, []);
  return (
    <React.Fragment>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Router basename={BASENAME}>
              <MainRoutes />
            </Router>
            <BackTop>
              <BackToTop />
            </BackTop>
          </ThemeProvider>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </React.Fragment>
  );
};

export default App;
