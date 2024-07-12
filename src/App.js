import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import AuthProvider from './authprovider';
import AuthRoute from './authRoute';
import Goods from './pages/goods';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path='/goods' element={
            <AuthRoute>
              <Goods />
            </AuthRoute>
          }/>
          <Route path="/dashboard/*" element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;