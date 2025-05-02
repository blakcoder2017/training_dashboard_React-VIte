import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/passwordReset';
import Dashboard from './pages/dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
function App() {

  return (
   <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ForgotPassword />} /> 
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} /> 
          <Route path="*" element={<Login />} />
      </Routes>
      <Footer />
   </Router>
  )
}

export default App
