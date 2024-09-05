import React, { useContext } from 'react'
import './Dashboard.css'
import { AuthContext } from '../Auth/AuthContext';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import BuyerComments from './BuyerComments';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

export default function Home() {
  const { sellerEmail} = useContext(AuthContext);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Weekly Sales',
        backgroundColor: '#ea2340',
        borderColor: '#ea2340',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: 'Monthly Sales',
        backgroundColor: '#1d1d25',
        borderColor: '#1d1d25',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [25, 20, 89, 81, 56, 80, 60],
      },
    ],
  };


  const options = {
    scales: {
      x: {
        grid: {
          color: '#222222',
        },
      },
      y: {
        grid: {
          color: '#222222',
        },
      },
    },
  };
  return (
    <div className='chart-layout'>
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <br />
        <h4>welcome   {sellerEmail}</h4>
      </div>
      <br />
      <div className="chart">

        <div className="graph" styles={{ width: '100%', height: '30vh', margin: '0 auto' }}>
          <h4>Graph data for sales</h4>
          <Line data={data} options={options} className='line-chart-data' width={200} height={100} />
        </div>

        <div className="transaction">
          <h3>transaction list</h3>
        </div>
        <div className="z">
        <h3>Buyer Comments</h3>
        <br />
        <div className="comments">
          <BuyerComments/>
          <Link to={'/comments'} className='navigate-comment'>
          <button >—→</button>
          </Link>
        </div>
        </div>

      </div>
    </div>
  )
}
