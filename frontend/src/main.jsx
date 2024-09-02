import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import {Provider} from 'react-redux';
import store from './redux/store.js';
import { ThemeProvider } from '@material-tailwind/react';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider>
        <ThemeProvider>
      
          <ToastContainer />
          <App />

        </ThemeProvider>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
)
