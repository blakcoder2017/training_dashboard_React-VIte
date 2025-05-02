import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';
import { useNavigate } from "react-router-dom"; 


const Topbar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/"); // Redirect to Login page after logout
    };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">Dashboard</span>

        <div className="d-flex align-items-center">
    
          <div className="me-3 text-end">
            <div className="fw-bold">{user?.displayName || "John Doe"}</div>
            <small className="text-muted">{user?.email || "email@example.com"}</small>
          </div>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
