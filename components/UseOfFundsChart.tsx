
import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, PieController, Legend, Tooltip, ChartConfiguration } from 'chart.js';
import { Language } from '../types';

Chart.register(ArcElement, PieController, Legend, Tooltip);

interface UseOfFundsChartProps {
    currentLang: Language;
}

const UseOfFundsChart: React.FC<UseOfFundsChartProps> = ({ currentLang }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                // Destroy existing chart instance if it exists
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }

                const labels: { [key in Language]: string[] } = {
                    [Language.DE]: ['F&E (Core V1.0, IP)', 'Team (AI Engineers)', 'Markt & Validierung (Piloten)'],
                    [Language.EN]: ['R&D (Core V1.0, IP)', 'Team (AI Engineers)', 'Market & Validation (Pilots)'],
                    [Language.FR]: ['R&D (Core V1.0, PI)', 'Équipe (Ingénieurs IA)', 'Marché & Validation (Pilotes)']
                };

                const data = [40, 30, 30]; // Percentages: R&D, Team, Market

                const chartConfig: ChartConfiguration = {
                    type: 'pie',
                    data: {
                        labels: labels[currentLang],
                        datasets: [{
                            data: data,
                            backgroundColor: [
                                'rgba(34, 211, 238, 0.7)',  // Accent Cyan
                                'rgba(192, 132, 252, 0.7)', // Purple (example for Team)
                                'rgba(74, 222, 128, 0.7)'   // Green (example for Market)
                            ],
                            borderColor: '#161b22', // var(--bg-graphite-light)
                            borderWidth: 4,
                            hoverOffset: 10
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    color: '#7d8590', // var(--text-secondary)
                                    padding: 25,
                                    font: { size: 14, family: 'Inter, sans-serif' }
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.label || '';
                                        if (label) { label += ': '; }
                                        if (context.parsed !== null) { label += context.parsed + '%'; }
                                        return label;
                                    }
                                },
                                backgroundColor: '#0d1117', // var(--bg-graphite-dark)
                                titleColor: '#22d3ee', // var(--accent-cyan)
                                bodyColor: '#e6edf3', // var(--text-primary)
                                borderColor: '#22d3ee', // var(--accent-cyan)
                                borderWidth: 1,
                                padding: 12,
                                titleFont: { weight: 'bold', family: 'Orbitron, sans-serif' },
                                bodyFont: { family: 'Inter, sans-serif' }
                            }
                        },
                        animation: {
                            animateRotate: true,
                            animateScale: true,
                            duration: 1200
                        }
                    }
                };

                chartInstanceRef.current = new Chart(ctx, chartConfig);
            }
        }

        // Cleanup function to destroy chart on component unmount
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, [currentLang]);

    return (
        <div id="useOfFundsChartContainer" className="mt-4 h-[350px]">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default UseOfFundsChart;
