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
  console.log('og', chartData)
  console.log('chart', subFieldData)
  return (
    <ResponsiveContainer  width="95%" height={600}>
      <BarChart
        width={1000}
        height={600}
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
        <Legend />
        {/* same id will go above each other */}
        {/* <Bar dataKey="machine learning" stackId="a" fill="#8884d8" />
        <Bar dataKey="integrated circuits" stackId="a" fill="#82ca9d" />
        <Bar dataKey="arificial intelligence" stackId="a" fill="#288E04F2" />
        <Bar dataKey={singleSubfield.label} stackId="a" fill={singleSubfield.color} />
        <Bar dataKey="All" stackId="a" fill="#d31212" /> */}
        {fieldsData.map((singleField) => (
            singleField.subfields.map((singleSubfield) => {
              return <Bar dataKey={singleSubfield.label} stackId="a" fill={singleSubfield.color} />
            })
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
