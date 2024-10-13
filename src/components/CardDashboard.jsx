import React from 'react';
import { Card as PrimeCard } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';

export default function CardDashboard({ icon, iconBgColor, iconColor, title, value }) {
    return (
        <PrimeCard className="flex flex-col shadow-lg rounded-lg">
            <div className="flex flex-row items-center justify-between ">
                <div className="flex mr-4">
                    <span className={`items-center px-4 py-4 m-auto rounded-full hover:bg-opacity-75 ${iconBgColor}`}>
                        <i className={`${icon} ${iconColor} text-xl text-center w-6 `} />
                    </span>
                </div>
                <div className="flex-1 pl-1">
                    <div className="text-xl font-medium text-gray-600">{value}</div>
                    <div className="text-sm text-gray-400 sm:text-base">{title}</div>
                </div>
            </div>
        </PrimeCard>
    );
}
