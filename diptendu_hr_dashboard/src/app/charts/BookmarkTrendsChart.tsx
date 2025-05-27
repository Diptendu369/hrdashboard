import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface BookmarkTrendsChartProps {
  data: { date: string; count: number }[];
}

const BookmarkTrendsChart: React.FC<BookmarkTrendsChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Bookmarks',
        data: data.map(d => d.count),
        borderColor: 'rgba(234, 179, 8, 1)',
        backgroundColor: 'rgba(234, 179, 8, 0.2)',
        fill: true,
      },
    ],
  };
  return <Line data={chartData} />;
};

export default BookmarkTrendsChart; 