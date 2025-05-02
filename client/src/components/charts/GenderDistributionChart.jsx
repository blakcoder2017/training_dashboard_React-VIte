import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBeneficiaryByGenderData } from '../../store/actions/chartActions';
import { Doughnut } from 'react-chartjs-2';
import colors from '../../hooks/colors';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js';
import LoadingSpinner from '../LoadingSpinner';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
);

const GenderDistributionChart = () => {
  const dispatch = useDispatch();
  const { beneficiaryByGenderData, loading } = useSelector((state) => state.chart);

  useEffect(() => {
    dispatch(getBeneficiaryByGenderData());
  }, [dispatch]);
  
  if (loading) {
    return <LoadingSpinner />;
  }

  const chartData = {
    labels: beneficiaryByGenderData.map(item => item.gender),
    datasets: [
      {
        label: 'Beneficiaries by Gender',
        data: beneficiaryByGenderData.map(item => item.total_beneficiaries),
        backgroundColor: [colors.neon, colors.light_neo], // Color for Male and Female
        hoverBackgroundColor: [colors.lighter_neon, colors.lighter_light_neo], // Hover colors
        borderColor: [colors.lighter_neon, colors.lighter_light_neo],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
  };

  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center"> {/* Ensures it takes full width and height */}
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default GenderDistributionChart;

// import React,{ useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getBeneficiaryByGenderData } from '../../store/actions/chartActions';
// import { Doughnut } from 'react-chartjs-2';
// import colors from '../../hooks/colors';



// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   CategoryScale,
// } from 'chart.js';

// ChartJS.register(
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
//     CategoryScale,
// );

// const GenderDistributionChart = () => {
//     const dispatch = useDispatch();
//     const { beneficiaryByGenderData} = useSelector((state) => state.chart);
    
//     useEffect(() => {
//         dispatch(getBeneficiaryByGenderData());
//     }, [dispatch])

//     const chartData = {
//         labels: beneficiaryByGenderData.map(item => item.gender),
//         datasets: [
//           {
//             label: 'Beneficiaries by Gender',
//             data: beneficiaryByGenderData.map(item => item.total_beneficiaries),
//             backgroundColor: [colors.neon, colors.light_neo], // Color for Male and Female
//             hoverBackgroundColor: [colors.lighter_neon, colors.lighter_light_neo], // Hover colors
//             borderColor: [colors.lighter_neon, colors.lighter_light_neo],
//             borderWidth: 1,
//           },
//         ],
//       };
    
//       const chartOptions = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//           legend: {
//             position: 'top',
//           },
//           tooltip: {
//             callbacks: {
//               label: (context) => `${context.label}: ${context.raw}`,
//             },
//           },
//         },
//       };
//   return (
//     <div className="h-100 d-flex justify-content-center align-items-center">
     
//        <p className="text-center">Gender Distribution</p>
//        <Doughnut data={chartData} options={chartOptions} />
  
//     </div>
//   );
// };

// export default GenderDistributionChart;