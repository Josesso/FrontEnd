import React from 'react';
import CardDashboard from '../components/CardDashboard';
import Bar from '../components/charts/Bar';
import Pie from '../components/charts/Pie';
import Line from '../components/charts/Line';
import { useState } from 'react';
import { useEffect } from 'react';
import { calcularPromedioCalificaciones, getTopSimulatedProcesses, getTopSimulatingUsers, processUserStats } from '../libs/dashboard';
import { getUsers } from '../api/users';
import { getProcess } from '../api/processes';
import { getSimulations } from '../api/simulations';

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [usersCant, setUsersCant] = useState();

    const [process, setProcess] = useState([]);
    const [processCant, setProcessCant] = useState();

    const [simulation, setSimulation] = useState([]);
    const [simulationCant, setSimulationCant] = useState();
    const [calification, setCalification] = useState();


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const responseUsers = await getUsers();
            const responseProcess = await getProcess();
            const responseSimulations = await getSimulations();
            console.log(responseSimulations.data);
            setUsers(processUserStats(responseUsers.data));
            setProcess(getTopSimulatedProcesses(responseSimulations.data));
            setSimulation(getTopSimulatingUsers(responseSimulations.data));
    
            setUsersCant(responseUsers.data.length);
            setProcessCant(responseProcess.data.length);
            setSimulationCant(responseSimulations.data.length);

            setCalification(calcularPromedioCalificaciones(responseSimulations.data))

            console.log(getTopSimulatingUsers(responseSimulations.data))
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };



    return (
        <div className=" ">
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 ">

                <CardDashboard
                    iconBgColor="bg-green-200"
                    iconColor="text-green-500"
                    icon="pi pi-user"
                    title="Usuarios totales"
                    value={usersCant}
                />
                <CardDashboard
                    icon="pi pi-sitemap"
                    iconBgColor="bg-yellow-400"
                    iconColor="text-yellow-800"
                    title="Procesos totales"
                    value={processCant}
                />
                <CardDashboard
                    icon="pi pi-video"
                    iconBgColor="bg-red-200"
                    iconColor="text-red-500"
                    title="Simulaciones totales"
                    value={simulationCant}
                />
                <CardDashboard
                    icon="pi pi-calculator"
                    iconBgColor="bg-blue-300"
                    iconColor="text-blue-900"
                    title="Promedio de Porcentajes Realizados"
                    value={calification}
                />
                






            </div>
            <div className='grid md:grid-cols-2  gap-4 mt-10'>

                <Bar records={process} />
                <Pie records={simulation} />

                <Line records={users} />

            </div>
        </div>
    );
}
