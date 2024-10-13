import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

const d = [{ processId: 1, processName: 'Automated logistical Graphic Interface', simulationCount: 6 }];

export default function Bar({ records = d }) {
    const [chartData, setChartData] = useState(null);
    const [chartOptions, setChartOptions] = useState(null);

    useEffect(() => {
        const data = {
            labels: records.map(entry => entry.processName),
            datasets: [
                {
                    label: 'Simulaciones',
                    data: records.map(entry => entry.simulationCount),
                    backgroundColor: [
                        'rgba(34, 139, 34, 0.2)',  // Verde Oscuro
                        'rgba(50, 205, 50, 0.2)',  // Lima
                        'rgba(144, 238, 144, 0.2)', // Verde Claro
                        'rgba(0, 128, 0, 0.2)'     // Verde
                    ],
                    borderColor: [
                        'rgb(34, 139, 34)',  // Verde Oscuro
                        'rgb(50, 205, 50)',  // Lima
                        'rgb(144, 238, 144)', // Verde Claro
                        'rgb(0, 128, 0)'     // Verde
                    ],
                    borderWidth: 1
                },
            ]
        };

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            scales: {
                x: {
                    ticks: {
                        display: false // Oculta las etiquetas
                    }
                },
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            }
        };
        setChartData(data);
        setChartOptions(options);
    }, [records]);  // Agregamos records como dependencia

    return (
        <div className='p-2 border rounded-xl bg-white'>
            <h3 className='text-2xl text-center font-extrabold m-3'>Procesos más Simulados</h3>
            {chartData && chartOptions && <Chart type="bar" data={chartData} options={chartOptions} />}
        </div>
    );
}