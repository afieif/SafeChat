import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import {HashRouter as Router,Routes,Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<ProtectedRoute/>}>
            <Route exact path='/' element={<App/>}/>
          </Route>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
