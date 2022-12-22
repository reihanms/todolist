import React from 'react';
import {BrowserRouter} from "react-router-dom"
import Router from './routes/Routes'
import { useContext } from 'react';
import { AuthProvider } from './context/auth';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  )
}
export default App;
