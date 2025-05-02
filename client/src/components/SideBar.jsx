import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActiveComponent } from '../store/actions/chartActions';


const Sidebar = ({ user , doLinkClick}) => {
  
  const dispatch = useDispatch();

  const handleLinkClick = (component) => {
    dispatch(setActiveComponent(component)); // Dispatch action to update active component
  };
  
  return (
    <div className="bg-light vh-100 p-3 border-end">
      <div className="text-center mb-4">
        <img src={user?.photoURL || "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&facialHairType=BeardLight&clotheType=Hoodie"} className="rounded-circle mb-2" alt="User" width="80" height="80" />
        <h5>{user?.displayName || "John Doe"}</h5>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <button
            className="nav-link text-dark"
            onClick={() => handleLinkClick('dataTable')}
          >
            Data Table
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link text-dark"
            onClick={() => handleLinkClick('analytics')}
          >
            Analytics
          </button>
        </li>
      </ul>

    </div>
  );
};

export default Sidebar;
