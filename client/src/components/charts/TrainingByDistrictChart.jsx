import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainingDistrictData } from '../../store/actions/chartActions';
import colors from '../../hooks/colors';
import LoadingSpinner from '../LoadingSpinner';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const TrainingByDistrictChart = () => {
  const dispatch = useDispatch();
  const { trainingDistrictData, loading } = useSelector((state) => state.chart);

  useEffect(() => {
    dispatch(getTrainingDistrictData());
  }, [dispatch]);
  
  if (loading) {
    return <LoadingSpinner />;
  }

  const data = {
    labels: trainingDistrictData.map(item => item.district),
    datasets: [
      {
        label: 'Total Beneficiaries',
        data: trainingDistrictData.map(item => item.total_beneficiaries),
        backgroundColor: colors.neon,  // You can replace this with your neon color or any color you prefer
        borderColor: colors.neon,      // Optional border color
        borderWidth: 1,
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
      title: {
        display: false, // Title is now in the container
        text: 'Beneficiaries per District',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center"> {/* Ensures it takes full width and height */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default TrainingByDistrictChart;

// import React, {useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getTrainingDistrictData } from '../../store/actions/chartActions';
// import colors from '../../hooks/colors';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';

// // Register the necessary chart components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );
// const TrainingByDistrictChart = () => {
//   const dispatch = useDispatch();
//   const {trainingDistrictData} = useSelector((state) => state.chart);
  
  
//   useEffect(() => {
//     dispatch(getTrainingDistrictData ())
//   }, [dispatch]);
      
      
//   const data = {
//     labels: trainingDistrictData.map(item => item.district),
//     datasets: [
//       {
//         label: 'Total Beneficiaries',
//         data: trainingDistrictData.map(item => item.total_beneficiaries),
//         backgroundColor: colors.neon,  // You can replace this with your neon color or any color you prefer
//         borderColor: colors.neon,      // Optional border color
//         borderWidth: 1,
//       }
//     ]
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Beneficiaries per District',
//       },
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };
  
//   return (
//     <div className="h-100 d-flex justify-content-center align-items-center">
     
//       <div style={{ width: '80%', height: '400px', margin: 'auto' }}>
//       <p>District Trainings</p>
//       <Bar data={data} options={options} />
//     </div>
//     </div>
//   );
// };

// export default TrainingByDistrictChart;