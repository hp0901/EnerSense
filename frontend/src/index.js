import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer/index.js';
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from '@react-oauth/google';

const store =  configureStore({
  reducer: rootReducer,
});

const YOUR_GOOGLE_CLIENT_ID = "314346617176-pn7ttmvhis5pa6g5ejcng51b5pgtj1gb.apps.googleusercontent.com"
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={YOUR_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
