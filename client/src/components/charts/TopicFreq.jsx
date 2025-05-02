
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopicsByFrequencyData } from '../../store/actions/chartActions';

import colors from '../../hooks/colors';
import LoadingSpinner from '../LoadingSpinner';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TopicFrequencyChart = () => {
  const dispatch = useDispatch();
  const { topicsByFrequencyData , loading} = useSelector((state) => state.chart);

  useEffect(() => {
    dispatch(getTopicsByFrequencyData());
  }, [dispatch]);
  if (loading) {
    return <LoadingSpinner />;
  }
  const chartData = {
    labels: topicsByFrequencyData.map(item => item.topic),  // Labels will be the topics
    datasets: [
      {
        label: 'Total Attendance',
        data: topicsByFrequencyData.map(item => item.total_attendance), // Attendance numbers
        backgroundColor: [colors.neon, colors.lighter_neon], // Colors for each slice
        borderColor: [colors.neon, colors.lighter_neon],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} people`
        }
      },
    },
  };
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center"> {/* Ensures it takes full width and height */}
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default TopicFrequencyChart;
// import React, {useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getTopicsByFrequencyData } from '../../store/actions/chartActions';

// import colors from '../../hooks/colors';

// import { Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend
// } from 'chart.js';


// ChartJS.register(ArcElement, Tooltip, Legend);

// const TopicFrequencyChart = () => {
// const dispatch = useDispatch();
// const {topicsByFrequencyData} = useSelector((state) => state.chart)

// useEffect(() => {
//     dispatch(getTopicsByFrequencyData())
// }, [dispatch])

// const chartData = {
//     labels: topicsByFrequencyData.map(item => item.topic),  // Labels will be the topics
//     datasets: [
//       {
//         label: 'Total Attendance',
//         data: topicsByFrequencyData.map(item => item.total_attendance), // Attendance numbers
//         backgroundColor: [colors.neon, colors.lighter_neon], // Colors for each slice
//         borderColor: [colors.neon, colors.lighter_neon],
//         borderWidth: 1
//       }
//     ]
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         callbacks: {
//           label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} people`
//         }
//       },
//     },
//   };
// return (
//     <div className="h-100 d-flex justify-content-center align-items-center">

//       <div style={{ width: '80%', height: '400px', margin: 'auto' }}>
//       <p>Topic Attendance Distribution</p>
//       <Pie data={chartData} options={options} />
//     </div>
//     </div>
//   );
// };

// export default TopicFrequencyChart;