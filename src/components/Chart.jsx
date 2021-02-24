import React from 'react';
import { Line } from 'react-chartjs-2';
const Chart = (props) => (
  <div id='chart'>
    <Line
      // className="col-4"
      data={props.chartData}
      options={{
        title: {
          display: true,
          // text: 'Bitcoin Price',
          // fontSize: 20
        },
        legend: {
          display: false,
          position: 'right'
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month'
            }
          }]
        }
      }}
    />
  </div>
)
export default Chart;