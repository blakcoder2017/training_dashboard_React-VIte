import React from 'react';
import TimeSeriesChart from './charts/TimeSeriesChart';
import GenderDistributionChart from './charts/GenderDistributionChart';
import TopicFrequencyChart from './charts/TopicFreq';
import TrainingByDistrictChart from './charts/TrainingByDistrictChart';
import colors from '../hooks/colors';

const Analytics = () => {
  return (
    <div className="d-flex flex-column h-100">
      
      {/* Top Section - Header */}
      <div 
        className="d-flex align-items-center px-3" 
        style={{ backgroundColor: colors.neon, color: 'white', height: '50px' }}
      >
        <h6 className="mb-0">Analytics Overview</h6>
      </div>

      {/* Divider */}
      <div 
        className="d-flex align-items-center px-3 py-2 my-2" 
        style={{
          height: '80px',
          border: `1px solid ${colors.neon}`,
          borderRadius: '8px',
          color: colors.neon,
        }}
      >
        <h6 className="mb-0">Analytics Details</h6>
      </div>

      {/* Bottom Section - Charts */}
      <div className="flex-grow-1 p-2">
        <div className="row g-3 h-100">

          {/* Chart Card */}
          <div className="col-12 col-md-6 d-flex">
            <div className="border rounded p-2 w-100 d-flex flex-column justify-content-center" style={{height:'500px'}}>
              <TimeSeriesChart />
            </div>
          </div>

          <div className="col-12 col-md-6 d-flex">
            <div className="border rounded p-2 w-100 d-flex flex-column justify-content-center" style={{height:'500px'}}>
              <GenderDistributionChart />
            </div>
          </div>

          <div className="col-12 col-md-6 d-flex">
            <div className="border rounded p-2 w-100 d-flex flex-column justify-content-center" style={{height:'500px'}}>
              <TrainingByDistrictChart />
            </div>
          </div>

          <div className="col-12 col-md-6 d-flex">
            <div className="border rounded p-2 w-100 d-flex flex-column justify-content-center" style={{height:'500px'}}>
              <TopicFrequencyChart />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Analytics;
