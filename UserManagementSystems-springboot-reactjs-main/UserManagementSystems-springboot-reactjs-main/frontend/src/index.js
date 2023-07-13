// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Auth0Provider
    domain="dev-yus4ihegpkva2oud.us.auth0.com"
    clientId="evLoBqOLiuFuAOGXiZ9D2cJAEbIBa7rq"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
