// data visualization
import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const FiveLoved = (props) => {
const data = {
  labels: [
    props.mostLoved[0].title, 
    props.mostLoved[1].title, 
    props.mostLoved[2].title, 
    props.mostLoved[3].title, 
    props.mostLoved[4].title, 
    ],
  datasets: [
    {
      label: '# of Searches',
      data: [
        props.mostLoved[0].searchCount, 
        props.mostLoved[1].searchCount, 
        props.mostLoved[2].searchCount, 
        props.mostLoved[3].searchCount, 
        props.mostLoved[4].searchCount],
      backgroundColor: [
        "#8650f4",
        "#6f49e8",
        "#5642dc",
        "#393bd0",
        "#0034c4"
      ],
      borderWidth: 1,
    },
  ],
};

// const options = {
//     scales: {
//       r: {
//         ticks: {
//           backdropColor: "#5642dc"
//         }
//       }
//     }
//   };

  return (
    <div>
        <h2>
            Your Most Searched Songs
        </h2>
        <PolarArea data={data} />
    </div>
  );


};
export default FiveLoved;

