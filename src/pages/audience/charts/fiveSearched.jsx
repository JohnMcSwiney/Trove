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

const FiveSearched = (props) => {
const data = {
  labels: [
    props.topSong[0]?.title, 
    props.topSong[1]?.title, 
    props.topSong[2]?.title, 
    props.topSong[3]?.title, 
    props.topSong[4]?.title, 
    ],
  datasets: [
    {
      label: '# of Searches',
      data: [
        props.topSong[0]?.searchCount, 
        props.topSong[1]?.searchCount, 
        props.topSong[2]?.searchCount, 
        props.topSong[3]?.searchCount, 
        props.topSong[4]?.searchCount],
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
export default FiveSearched;

