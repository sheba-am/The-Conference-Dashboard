//import "./styles.css";
import React, {useEffect, useState} from "react";
import {fieldsData} from '../data/FormData'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



export default function StackedChart({chartData}) {
  
  var subFieldData= []; 
  chartData && chartData.map((singleData) => {
    let obj = {name: singleData.label}
      singleData.subfields.map((singleSubField) => {
        obj[singleSubField.label] = singleSubField.count
      })
    subFieldData.push(obj)
  })
  return (
    <ResponsiveContainer  width="100%" height={400}>
      <BarChart
        width={700}
        height={400}
        data={subFieldData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        {fieldsData.map((singleField) => (
            singleField.subfields.map((singleSubfield) => {
              return <Bar dataKey={singleSubfield.label} stackId="a" fill={singleSubfield.color} />
            })
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
