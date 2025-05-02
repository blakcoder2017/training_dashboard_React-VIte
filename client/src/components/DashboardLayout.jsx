import React from 'react';
import Sidebar from './SideBar';
import Topbar from './TopBar';

const DashboardLayout = ({ children, user, doLinkClick }) => {



  return (
    <div >
      <Topbar user={user}  />
      <div className="d-flex">
        <div style={{ width: '250px' }}>
          <Sidebar user={user} onLinkClick={doLinkClick} />
        </div>
        <div className="flex-grow-1 p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
