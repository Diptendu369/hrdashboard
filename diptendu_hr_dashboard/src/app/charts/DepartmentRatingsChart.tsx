import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DepartmentRatingsChartProps {
  data: { department: string; avgRating: number }[];
}

const DepartmentRatingsChart: React.FC<DepartmentRatingsChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.department),
    datasets: [
      {
        label: 'Average Rating',
        data: data.map(d => d.avgRating),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
    ],
  };
  return <Bar data={chartData} />;
};

export default DepartmentRatingsChart; 