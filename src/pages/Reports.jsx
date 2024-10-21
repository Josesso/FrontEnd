import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Tooltip } from 'primereact/tooltip';
import { getSimulations } from '../api/simulations';
import { getFallos } from '../api/fallos';

export default function Reports() {
    const [products, setProducts] = useState([]);
    const dt = useRef(null);

    const cols = [
        { field: 'Usuario.username', header: 'Nombre de Usuario' },
        { field: 'Proceso.nombre', header: 'Proceso' },
        { field: 'createdAt', header: 'Fecha de simulacion' },
        { field: 'Tiempo', header: 'Tiempo de proceso' },
        { field: 'medicina', header: 'Cantidad de Medicina realizada' },
    ];

    const [simulation, setSimulation] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Obtener simulaciones y fallos
            const responseSimulations = await getSimulations();
            const responseFallos = await getFallos();

            // Agrupar los fallos por simulacionId
            const fallosBySimulation = responseFallos.data.reduce((acc, fallo) => {
                if (!acc[fallo.simulacionId]) {
                    acc[fallo.simulacionId] = [];
                }
                acc[fallo.simulacionId].push(fallo.descripcion);
                return acc;
            }, {});

            // Formatear las simulaciones e incluir los fallos
            const formattedSimulations = responseSimulations.data.map(sim => ({
                ...sim,
                createdAt: new Date(sim.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }),
                fallos: fallosBySimulation[sim.id] || [] // Añadir los fallos correspondientes
            }));

            setSimulation(formattedSimulations);
            console.log(formattedSimulations);

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                // Aplanar los datos para la exportación
                const exportData = simulation.map((s) => ({
                    name: s.Usuario.username,
                    country: s.Proceso.nombre,
                    company: s.Proceso.cantidadTareas,
                    representative: s.calificacion,
                    par: s.fallos.join(', ') || 'Sin fallos'
                }));

                // Ajustar exportColumns
                const flatExportColumns = [
                    { title: 'Nombre de Usuario', dataKey: 'name' },
                    { title: 'Proceso', dataKey: 'country' },
                    { title: 'Cantidad de tareas', dataKey: 'company' },
                    { title: 'Porcentaje Realizado', dataKey: 'representative' },
                    { title: 'Objetivos no cumplidos', dataKey: 'par' }
                ];

                doc.autoTable(flatExportColumns, exportData);
                doc.save('reporte.pdf');
            });
        });
    };

    // Template para mostrar los fallos como lista separada por comas
    const fallosTemplate = (rowData) => {
        return rowData.fallos.length > 0 ? rowData.fallos.join(', ') : 'Sin fallos';
    };

    return (
        <Card title="Reporte">
            <Tooltip target=".export-buttons>button" position="bottom" />
            <div className="flex items-center justify-end gap-2">
                <Button type="button" icon="pi pi-file-pdf" severity="" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
            </div>
            <DataTable ref={dt} value={simulation} header tableStyle={{ minWidth: '50rem' }}>
                {cols.map((col, index) => (
                    <Column key={index} field={col.field} header={col.header} />
                ))}
                <Column field="fallos" header="Lista de Errores" body={fallosTemplate} />
            </DataTable>
        </Card>
    );
}
