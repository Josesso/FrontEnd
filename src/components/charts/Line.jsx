import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

const d = [
    {
        "month": "Enero",
        "month_date": "2024-01-01T00:00:00",
        "cantidad_clientes": 4
    },
    {
        "month": "Febrero",
        "month_date": "2024-02-01T00:00:00",
        "cantidad_clientes": 3
    },
    {
        "month": "Marzo",
        "month_date": "2024-03-01T00:00:00",
        "cantidad_clientes": 3
    }
];

const Line = ({ records = d }) => {
    const [chartData, setChartData] = useState(null);
    const [chartOptions, setChartOptions] = useState(null);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const gridColor = 'rgba(180, 180, 180, 0.35)';

        const data = {
            labels: records.map(entry => entry.month),
            datasets: [
                {
                    label: 'Usuarios Nuevos',
                    data: records.map(entry => entry.count),
                    fill: true,
                    borderColor: 'rgba(34, 139, 34, 1)',  // Verde Oscuro
                    tension: 0.4,
                    backgroundColor: 'rgba(107, 142, 35, 0.2)'  // Verde Oliva con transparencia
                }
            ]
        };

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: gridColor }
                },
                y: {
                    grid: { color: gridColor },
                    beginAtZero: true
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [records]);

    return (
        <div className="p-2 border rounded-xl bg-white md:col-span-2">
            <h3 className="text-2xl text-center font-extrabold m-3">Usuarios Nuevos según el Mes</h3>
            {chartData && chartOptions && <Chart type="line" data={chartData} options={chartOptions} />}
        </div>
    );
};

export default Line;
