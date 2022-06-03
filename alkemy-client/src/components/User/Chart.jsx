import React from 'react'
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'

function Chart({chartData}) {

  return (
    <div>
        <Line data={chartData} options={{responsive:true, maintainAspectRatio:true, aspectRatio:2}}/>
    </div>
  )
}

export default Chart