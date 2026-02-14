'use client';

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function RotRadar({ data }) {
    const chartData = {
        labels: ['Tracker Count', 'Page Weight', 'CPU Usage', 'Dark Patterns', 'Load Time'],
        datasets: [
            {
                label: 'Standard 2015 Web',
                data: [2, 3, 2, 1, 2],
                backgroundColor: 'rgba(16, 185, 129, 0.2)', // Emerald/Green
                borderColor: '#10B981',
                borderWidth: 1,
            },
            {
                label: 'Current Audit',
                data: data || [8, 9, 7, 6, 8], // Mock data if none provided
                backgroundColor: 'rgba(239, 68, 68, 0.4)', // Red
                borderColor: '#EF4444',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                pointLabels: {
                    color: '#e2e2e6',
                    font: {
                        family: "'Space Grotesk', sans-serif",
                        size: 12
                    }
                },
                ticks: {
                    display: false,
                    backdropColor: "transparent"
                }
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: '#e2e2e6',
                    font: {
                        family: "'Space Grotesk', sans-serif"
                    }
                }
            }
        }
    };

    return <Radar data={chartData} options={options} />;
}
