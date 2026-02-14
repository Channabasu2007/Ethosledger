'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export default function BloatTimeline({ data }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#e2e2e6',
                    font: {
                        family: "'Space Grotesk', sans-serif"
                    }
                }
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)'
                },
                ticks: {
                    color: '#9ca3af'
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)'
                },
                ticks: {
                    color: '#9ca3af'
                }
            }
        }
    };

    const labels = ['2018', '2020', '2022', '2024', '2026'];

    const chartData = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Essential Content',
                data: [1.2, 1.3, 1.4, 1.5, 1.6],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.3)',
            },
            {
                fill: true,
                label: 'Tracking / Ads',
                data: [0.5, 1.2, 2.5, 4.8, 6.2],
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.5)',
            },
        ],
    };

    return <Line options={options} data={chartData} />;
}
