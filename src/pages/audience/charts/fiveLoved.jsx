import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const FiveLoved = (props) => {

const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2
    }
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right"
    },
    title: {
      display: true,
      text: "Top Loved Songs"
    }
  }
}

const labels = [
    props.mostLoved[0]?.title, 
    props.mostLoved[1]?.title, 
    props.mostLoved[2]?.title, 
    props.mostLoved[3]?.title, 
    props.mostLoved[4]?.title, 
  ];

    const data = {
          labels,
          datasets: [
            // {
            //   label: 'Dataset 1',
            //   data: labels.map(() => artist),
            //   borderColor: 'rgb(255, 99, 132)',
            //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
            // },
            {
              label: '# of Loves',
              data: props.mostLoved?.map((song) => song?.totalLoved),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: "#0034c4",
            },
          ],
        };
    
        console.log(data.datasets?.data)
      return (
        <div>
            <h2>
                Your Most Loved Songs
            </h2>
            <Bar options={options} data={data} />
        </div>
      );
    
    
    };
    export default FiveLoved;

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

// export function App() {
//   return <Line options={options} data={data} />;
// }
