import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import { Tooltip } from 'primereact/tooltip';
import { CustomerService } from '../service/CustomerService';
import { getSimulations } from '../api/simulations';

export default function Reports() {
    const [products, setProducts] = useState([]);
    const dt = useRef(null);

    const cols = [
        { field: 'Usuario.username', header: 'Nombre de Usuario' },
        { field: 'Proceso.nombre', header: 'Proceso' },
        { field: 'Proceso.cantidadTareas', header: 'Cantidad de tareas' },
        { field: 'calificacion', header: 'Porcentaje Realizado' },
        { field: 'Tiempo', header: 'Tiempo de proceso' },
        { field: 'medicina', header: 'Cantidad de Medicina realizada' },
    ];

    const [simulation, setSimulation] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const responseSimulations = await getSimulations();
            setSimulation(responseSimulations.data);
            console.log(responseSimulations.data)

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        CustomerService.getCustomersMedium().then((data) => setProducts(data));
    }, []);

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                // Aplanar los datos para la exportación
                const exportData = simulation.map((s) => ({
                    name: s.Usuario.username,
                    country: s.Proceso.nombre,
                    company: s.Proceso.cantidadTareas,
                    representative: s.calificacion
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
                //doc.autoTable(exportColumns, products);

                doc.save('reporte.pdf');
            });
        });
    };


    return (
        <Card  title="Reporte">
            <Tooltip target=".export-buttons>button" position="bottom" />
            <div className="flex items-center justify-end gap-2">
                <Button type="button" icon="pi pi-file-pdf" severity="" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
            </div>
            <DataTable ref={dt} value={simulation} header tableStyle={{ minWidth: '50rem' }}>
                {cols.map((col, index) => (
                    <Column key={index} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </Card>
    );
}
