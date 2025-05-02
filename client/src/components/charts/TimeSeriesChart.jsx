import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSeriesData } from '../../store/actions/chartActions';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, TimeSeriesScale, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns';
import LoadingSpinner from '../LoadingSpinner';
import colors from '../../hooks/colors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

const TimeSeriesChart = () => {
  const dispatch = useDispatch();
  const { timeSeriesData, loading } = useSelector((state) => state.chart);

  useEffect(() => {
    dispatch(getTimeSeriesData());
  }, [dispatch]);

  const timeSeriesOptions = {
    labels: timeSeriesData.map(item => item.parsed_date), // X-axis labels (dates)
    datasets: [
      {
        label: 'Total Trainings',
        data: timeSeriesData.map(item => item.total_trainings), // Y-axis data
        borderColor: colors.neon,
        backgroundColor: colors.light_neo,
        fill: true, // Optionally fill the area under the line
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to scale freely
    scales: {
      x: {
        type: 'time', // Use time scale
        time: {
          unit: 'month', // Set the time unit (e.g., 'day', 'month')
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-100 h-100"> {/* Ensures it takes full width and height of container */}
      <Line data={timeSeriesOptions} options={chartOptions} />
    </div>
  );
};

export default TimeSeriesChart;
