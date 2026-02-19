import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer
} from 'recharts';

const OrderChart = ({ barChartData, isAnimationActive = true }) => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* Use correct key */}
          <XAxis dataKey="date" />
          
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Revenue */}
          <Bar
            dataKey="Revenue"
            fill="#6366F1"
            name="Revenue"
            isAnimationActive={isAnimationActive}
          />

          {/* Orders */}
          <Bar
            dataKey="order"
            fill="#10B981"
            name="Orders"
            isAnimationActive={isAnimationActive}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderChart;
