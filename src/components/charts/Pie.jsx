import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

// Definición de los colores verdes y cafés
const colors = {
    green500: 'rgba(34, 139, 34, 0.6)', // Verde Oscuro
    green400: 'rgba(107, 142, 35, 0.6)', // Verde Oliva
    green300: 'rgba(50, 205, 50, 0.6)', // Verde Lima
    green200: 'rgba(144, 238, 144, 0.6)', // Verde Claro
    green100: 'rgba(173, 255, 47, 0.6)', // Verde Amarillento

    brown500: 'rgba(139, 69, 19, 0.6)', // Café Oscuro
    brown400: 'rgba(160, 82, 45, 0.6)', // Sienna
    brown300: 'rgba(210, 105, 30, 0.6)', // Chocolate
    brown200: 'rgba(244, 164, 96, 0.6)', // Salmón Claro
    brown100: 'rgba(222, 184, 135, 0.6)', // Burlywood
};

const hoverColors = {
    green500: 'rgba(34, 139, 34, 0.5)',
    green400: 'rgba(107, 142, 35, 0.5)',
    green300: 'rgba(50, 205, 50, 0.5)',
    green200: 'rgba(144, 238, 144, 0.5)',
    green100: 'rgba(173, 255, 47, 0.5)',

    brown500: 'rgba(139, 69, 19, 0.5)',
    brown400: 'rgba(160, 82, 45, 0.5)',
    brown300: 'rgba(210, 105, 30, 0.5)',
    brown200: 'rgba(244, 164, 96, 0.5)',
    brown100: 'rgba(222, 184, 135, 0.5)',
};

const d = [{userId: 4, username: 'Misael_Schaden', simulationCount: 5}];

export default function Pie({ records = d }) {
    const [chartData, setChartData] = useState(null);
    const [chartOptions, setChartOptions] = useState(null);

    useEffect(() => {
        const data = {
            labels: records.map(entry => entry.username),
            datasets: [
                {
                    label: 'Simulaciones',
                    data: records.map(entry => entry.simulationCount),
                    backgroundColor: [
                        colors.green500,
                        colors.green400,
                        colors.green300,
                        colors.green200,
                        colors.green100,
                        colors.brown500,
                        colors.brown400,
                        colors.brown300,
                        colors.brown200,
                        colors.brown100
                    ],
                    hoverBackgroundColor: [
                        hoverColors.green500,
                        hoverColors.green400,
                        hoverColors.green300,
                        hoverColors.green200,
                        hoverColors.green100,
                        hoverColors.brown500,
                        hoverColors.brown400,
                        hoverColors.brown300,
                        hoverColors.brown200,
                        hoverColors.brown100
                    ]
                }
            ]
        };
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [records]);

    return (
        <div className="w-full h-full p-2 border rounded-xl bg-white">
            <h3 className="text-2xl text-center font-extrabold m-2 mt-5">Usuarios con más Simulaciones</h3>
            <div className="h-full flex justify-center items-center">
                {chartData && chartOptions && <Chart type="pie" data={chartData} options={chartOptions} className="h-[21rem]" />}
            </div>
        </div>
    );
}
