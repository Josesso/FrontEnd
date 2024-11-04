export const processUserStats = (userData) => {
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const monthlyStats = {};
    for (let d = new Date(sixMonthsAgo); d <= now; d.setMonth(d.getMonth() + 1)) {
        const monthKey = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
        monthlyStats[monthKey] = 0;
    }

    userData.forEach(user => {
        const createdAt = new Date(user.createdAt);
        if (createdAt >= sixMonthsAgo) {
            const monthKey = `${monthNames[createdAt.getMonth()]} ${createdAt.getFullYear()}`;
            if (monthKey in monthlyStats) {
                monthlyStats[monthKey]++;
            }
        }
    });

    const stats = Object.entries(monthlyStats).map(([month, count]) => ({
        month,
        count
    }));

    return stats;
};


export const getTopSimulatedProcesses = (simulations, limit = 5) => {
    // Crear un objeto para contar las simulaciones por proceso
    const simulationCounts = {};

    // Contar las simulaciones para cada proceso
    simulations.forEach(simulation => {
        console.log(simulation);
        const processId = simulation.ProcesoId;
        const processName = simulation.proceso.nombre;

        if (!simulationCounts[processId]) {
            simulationCounts[processId] = {
                name: processName,
                count: 0
            };
        }
        simulationCounts[processId].count++;
    });

    // Convertir el objeto de conteos a un array y ordenarlo
    const sortedProcesses = Object.entries(simulationCounts)
        .sort((a, b) => b[1].count - a[1].count) // Ordenar de mayor a menor
        .slice(0, limit) // Tomar solo los primeros 'limit' elementos
        .map(([processId, data]) => ({
            processId: parseInt(processId),
            processName: data.name,
            simulationCount: data.count
        }));

    return sortedProcesses;
};


export const getTopSimulatingUsers = (simulations, limit = 5) => {
    // Crear un objeto para contar las simulaciones por usuario
    const userSimulationCounts = {};

    // Contar las simulaciones para cada usuario
    simulations.forEach(simulation => {
        const userId = simulation.UsuarioId;
        const username = simulation.usuario.username;

        if (!userSimulationCounts[userId]) {
            userSimulationCounts[userId] = {
                username: username,
                count: 0
            };
        }
        userSimulationCounts[userId].count++;
    });

    // Convertir el objeto de conteos a un array y ordenarlo
    const sortedUsers = Object.entries(userSimulationCounts)
        .sort((a, b) => b[1].count - a[1].count) // Ordenar de mayor a menor
        .slice(0, limit) // Tomar solo los primeros 'limit' elementos
        .map(([userId, data]) => ({
            userId: parseInt(userId),
            username: data.username,
            simulationCount: data.count
        }));

    return sortedUsers;
};


export const calcularPromedioCalificaciones = (datos) => {
    if (!Array.isArray(datos) || datos.length === 0) {
        return 0;
    }

    const sumaCalificaciones = datos.reduce((suma, item) => suma + item.calificacion, 0);
    const promedio = sumaCalificaciones / datos.length;

    return promedio;
}