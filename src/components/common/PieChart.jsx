import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';
import { Box } from '@mui/system';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, height }) => {
  const chartOptions = {
    responsive: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: function (value, context) {
          const datapoints = context.chart.data.datasets[0].data;
          const total = datapoints.reduce((total, datapoint) => total + datapoint, 0);
          const percentage = (value * 100) / total;
          return `${context.chart.data.labels[context.dataIndex]}: ${percentage.toFixed()}%`;
        },
        color: 'white',
        font: {
          size: '16',
        },
      },
    },
  };
  return (
    <Box display='flex' justifyContent='center' alignItems='center' mt={2}>
      {!data ? <span>loading...</span> : <Pie data={data} options={chartOptions} plugins={[ChartDataLabels]} height={height} />}
    </Box>
  );
};

export default PieChart;
