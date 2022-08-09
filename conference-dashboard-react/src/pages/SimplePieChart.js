import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function SimplePieChart({chartData}) {
  return (
    <ResponsiveContainer  width="100%" height={400}>
        <PieChart >
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={chartData}
          cx={200}
          cy={200}
          outerRadius={110}
          fill="#8884d8"
          label
        >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}            
        </Pie>
        <Tooltip />
        </PieChart>
    </ResponsiveContainer>
  )
}

export default SimplePieChart