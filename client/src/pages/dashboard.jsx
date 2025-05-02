import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllData, setActiveComponent } from "../store/actions/chartActions";
import DashboardLayout from "../components/DashboardLayout";
import DataTable from "../components/DataTable";// Import useNavigate
import Analytics from "../components/Analytics";


const Dashboard = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { activeComponent } = useSelector((state) => state.chart);
    
    useEffect(() => {
        // Fetch all data when the component mounts
        dispatch(getAllData());
    
    }, [dispatch]);


    
    const handleLinkClick = (component) => {
        dispatch(setActiveComponent(component));
    }
    return (
        <DashboardLayout user={user} onLinkClick={handleLinkClick}>
        <div className="d-flex">
        <div className="w-100">
        {activeComponent === 'analytics' && <Analytics />}
          {activeComponent === 'dataTable' && <DataTable />}
          
        </div>
      </div>
        </DashboardLayout>
      );
};

export default Dashboard;