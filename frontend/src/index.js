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
import { AuthProvider } from './context/AuthContex.js';
import { UserProvider } from './context/UserContext.js';

const store = configureStore({
  reducer: rootReducer,
});

const YOUR_GOOGLE_CLIENT_ID = "820407272976-1chit6qgn0troolbo23jk6uvkvvk5leg.apps.googleusercontent.com"
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={YOUR_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            {/* 👇 ADD THIS */}
            <UserProvider>
              <App />
            </UserProvider>
          </AuthProvider>
        </GoogleOAuthProvider>

        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
