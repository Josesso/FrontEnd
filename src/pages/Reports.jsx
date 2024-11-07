/*import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Tooltip } from 'primereact/tooltip';
import { InputText } from 'primereact/inputtext';
import { getSimulations } from '../api/simulations';
import { getFallos } from '../api/fallos';

export default function Reports() {
    const [products, setProducts] = useState([]);
    const [simulation, setSimulation] = useState([]);
    const [filteredSimulations, setFilteredSimulations] = useState([]); // Simulaciones filtradas

    const [filters, setFilters] = useState({
        nombreUsuario: '',
        fechaSimulacion: '',
        proceso: '',
    });

    const dt = useRef(null);

    const cols = [
        { field: 'usuario.username', header: 'Nombre de Usuario' },
        { field: 'proceso.nombre', header: 'Proceso' },
        { field: 'createdAt', header: 'Fecha de simulacion' },
        { field: 'Tiempo', header: 'Tiempo de proceso' },
        { field: 'medicina', header: 'Cantidad de Medicina realizada' },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterData();
    }, [filters, simulation]);

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
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const filterData = () => {
        let filtered = simulation;

        if (filters.nombreUsuario) {
            filtered = filtered.filter(sim =>
                sim.usuario.username.toLowerCase().includes(filters.nombreUsuario.toLowerCase())
            );
        }

        if (filters.fechaSimulacion) {
            filtered = filtered.filter(sim =>
                sim.createdAt.includes(filters.fechaSimulacion)
            );
        }

        if (filters.proceso) {
            filtered = filtered.filter(sim =>
                sim.proceso.nombre.toLowerCase().includes(filters.proceso.toLowerCase())
            );
        }

        setFilteredSimulations(filtered);
    };

    const onFilterChange = (e, field) => {
        const value = e.target.value;
        setFilters({ ...filters, [field]: value });
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
    
                // Añadir el título centrado
                doc.setFontSize(18);
                const pageWidth = doc.internal.pageSize.getWidth(); // Obtener el ancho de la página
                const titleText = 'Reportes del simulador de procesos de producción';
                const textWidth = doc.getTextWidth(titleText);
                const xOffset = (pageWidth - textWidth) / 2; // Calcular el offset para centrar
                doc.text(titleText, xOffset, 20); // Coordenadas (x, y)
    
                // Añadir una línea debajo del título (opcional)
                doc.setLineWidth(0.5);
                doc.line(10, 25, 200, 25);
    
                // Usar los datos filtrados para la exportación
                const exportData = filteredSimulations.map((s) => ({
                    usuario: s.usuario.username,
                    proceso: s.proceso.nombre,
                    fechaSimulacion: s.createdAt,
                    tiempoProceso: s.Tiempo,
                    cantidadMedicina: s.medicina,
                    fallos: s.fallos.join(', ') || 'Sin fallos'
                }));
    
                // Ajustar exportColumns
                const flatExportColumns = [
                    { title: 'Nombre de Usuario', dataKey: 'usuario' },
                    { title: 'Proceso', dataKey: 'proceso' },
                    { title: 'Fecha de simulacion', dataKey: 'fechaSimulacion' },
                    { title: 'Tiempo de proceso', dataKey: 'tiempoProceso' },
                    { title: 'Cantidad de Medicina realizada', dataKey: 'cantidadMedicina' },
                    { title: 'Lista de Errores', dataKey: 'fallos' }
                ];
    
                // Generar la tabla en el PDF con los datos filtrados
                doc.autoTable(flatExportColumns, exportData, { startY: 30 });
    
                // Guardar el archivo PDF
                doc.save('Reportes Simulador.pdf');
            });
        });
    };
    

    const fallosTemplate = (rowData) => {
        return rowData.fallos.length > 0 ? rowData.fallos.join(', ') : 'Sin fallos';
    };

    return (
        <Card title="Reportes de la simulacion de procesos de produccion de medicna">
            <Tooltip target=".export-buttons>button" position="bottom" />
            <div className="flex items-center justify-end gap-2">
                <Button type="button" icon="pi pi-file-pdf" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
            </div>

            {}
            <div className="flex gap-2 mb-4">
                <InputText
                    placeholder="Buscar por Usuario"
                    value={filters.nombreUsuario}
                    onChange={(e) => onFilterChange(e, 'nombreUsuario')}
                />
                <InputText
                    placeholder="Buscar por Fecha (dd/mm/yyyy)"
                    value={filters.fechaSimulacion}
                    onChange={(e) => onFilterChange(e, 'fechaSimulacion')}
                />
                <InputText
                    placeholder="Buscar por Proceso"
                    value={filters.proceso}
                    onChange={(e) => onFilterChange(e, 'proceso')}
                />
            </div>

            <DataTable ref={dt} value={filteredSimulations} header tableStyle={{ minWidth: '50rem' }}>
                {cols.map((col, index) => (
                    <Column key={index} field={col.field} header={col.header} />
                ))}
                <Column field="fallos" header="Lista de Errores" body={fallosTemplate} />
            </DataTable>
        </Card>
    );
}
*/
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Tooltip } from 'primereact/tooltip';
import { InputText } from 'primereact/inputtext';
import { getSimulations } from '../api/simulations';
import { getFallos } from '../api/fallos';
import { getAcciones } from '../api/acciones';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Reports() {
    const [simulation, setSimulation] = useState([]);
    const [filteredSimulations, setFilteredSimulations] = useState([]); 
    const [filters, setFilters] = useState({
        nombreUsuario: '',
        fechaSimulacion: '',
        proceso: '',
    });

    const dt = useRef(null);

    // Función para exportar los datos filtrados a PDF
    const exportPdf = () => {
        const doc = new jsPDF();

        // Agrega la imagen en base64 al PDF
        const imgData = 'data:image/png;base64,BASE64_IMAGE_STRING'; // Reemplaza BASE64_IMAGE_STRING con tu string base64 completo
        doc.addImage(imgData, 'PNG', 14, 10, 30, 30); // Posición y tamaño de la imagen

        // Título del PDF
        doc.setFontSize(18);
        doc.text('Reportes de la simulacion de procesos de produccion de medicina', 50, 22);

        // Mostrar filtros aplicados en el PDF
        doc.setFontSize(12);
        doc.text(`Filtros aplicados:`, 14, 50);
        doc.setFontSize(10);

        // Agrega cada filtro que fue aplicado
        const filtrosAplicados = [
            `Usuario: ${filters.nombreUsuario || 'Todos'}`,
            `Fecha de Simulación: ${filters.fechaSimulacion || 'Todas'}`,
            `Proceso: ${filters.proceso || 'Todos'}`
        ];
        filtrosAplicados.forEach((filtro, index) => {
            doc.text(filtro, 14, 60 + (index * 6)); // Coloca cada filtro en una línea nueva
        });

        // Datos para la tabla
        const exportData = filteredSimulations.map(sim => ({
            usuario: sim.usuario.username,
            proceso: sim.proceso.nombre,
            fechaSimulacion: sim.createdAt,
            tiempoProceso: sim.Tiempo,
            cantidadMedicina: sim.medicina,
            fallos: sim.fallos.length > 0 ? sim.fallos.join(', ') : 'Sin fallos',
            acciones: sim.acciones.length > 0 
                ? sim.acciones.join(', ')
                : 'Sin acciones'
        }));

        // Definir las columnas y datos para el PDF
        doc.autoTable({
            head: [['Nombre de Usuario', 'Proceso', 'Fecha de Simulacion', 'Tiempo de Proceso', 'Cantidad de Medicina Realizada', 'Lista de Errores', 'Lista de Acciones']],
            body: exportData.map(row => [row.usuario, row.proceso, row.fechaSimulacion, row.tiempoProceso, row.cantidadMedicina, row.fallos, row.acciones]),
            startY: 70, // Ajusta esto si la imagen y filtros ocupan más espacio
            styles: { cellPadding: 3, fontSize: 10 },
            columnStyles: {
                6: { cellWidth: 40 }, // Ajusta el ancho de la columna de acciones para permitir saltos de línea
            },
            didParseCell: function (data) {
                if (data.column.index === 6) { // Columnas de acciones
                    data.cell.styles.lineBreak = 'auto'; // Ajusta el texto automáticamente
                }
            }
        });

        // Guardar el PDF
        doc.save('reportes-simulacion.pdf');
    };

    // Plantilla para mostrar los fallos
    const fallosTemplate = (rowData) => {
        return rowData.fallos.length > 0 ? rowData.fallos.join(', ') : 'Sin fallos';
    };

    // Plantilla para mostrar las acciones en formato de lista separada por comas
    const accionesTemplate = (rowData) => {
        return rowData.acciones.length > 0 
            ? rowData.acciones.join(', ') 
            : 'Sin acciones';
    };

    const cols = [
        { field: 'usuario.username', header: 'Nombre de Usuario', sortable: true },
        { field: 'proceso.nombre', header: 'Proceso', sortable: true },
        { field: 'createdAt', header: 'Fecha de simulacion', sortable: true },
        { field: 'Tiempo', header: 'Tiempo de proceso', sortable: true },
        { field: 'medicina', header: 'Cantidad de Medicina realizada', sortable: true },
        { field: 'fallos', header: 'Lista de Errores', body: fallosTemplate },
        { field: 'acciones', header: 'Lista de Acciones', body: accionesTemplate }
    ];

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterData();
    }, [filters, simulation]);

    const fetchData = async () => {
        try {
            const responseSimulations = await getSimulations();
            const responseFallos = await getFallos();
            const responseAcciones = await getAcciones();

            // Mapear fallos y acciones a cada simulación por ID
            const fallosBySimulation = responseFallos.data.reduce((acc, fallo) => {
                if (!acc[fallo.simulacionId]) {
                    acc[fallo.simulacionId] = [];
                }
                acc[fallo.simulacionId].push(fallo.descripcion);
                return acc;
            }, {});

            const accionesBySimulation = responseAcciones.data.reduce((acc, accion) => {
                if (!acc[accion.simulacionId]) {
                    acc[accion.simulacionId] = [];
                }
                acc[accion.simulacionId].push(accion.descripcion);
                return acc;
            }, {});

            const formattedSimulations = responseSimulations.data.map(sim => ({
                ...sim,
                createdAt: `${new Date(sim.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })} ${new Date(sim.createdAt).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })}`, // Formatear la fecha y la hora
                fallos: fallosBySimulation[sim.id] || [],
                acciones: accionesBySimulation[sim.id] || []
            }));

            setSimulation(formattedSimulations);
        } catch (error) {
            console.error('Error fetching simulation data:', error);
        }
    };

    const filterData = () => {
        let filtered = simulation;

        if (filters.nombreUsuario) {
            filtered = filtered.filter(sim =>
                sim.usuario.username.toLowerCase().includes(filters.nombreUsuario.toLowerCase())
            );
        }

        if (filters.fechaSimulacion) {
            filtered = filtered.filter(sim =>
                sim.createdAt.includes(filters.fechaSimulacion)
            );
        }

        if (filters.proceso) {
            filtered = filtered.filter(sim =>
                sim.proceso.nombre.toLowerCase().includes(filters.proceso.toLowerCase())
            );
        }

        setFilteredSimulations(filtered);
    };

    const onFilterChange = (e, field) => {
        const value = e.target.value;
        setFilters({ ...filters, [field]: value });
    };

    return (
        <Card title="Reportes de la simulacion de procesos de produccion de medicina">
            <Tooltip target=".export-buttons>button" position="bottom" />
            <div className="flex items-center justify-end gap-2 mb-4">
                <Button type="button" icon="pi pi-file-pdf" rounded onClick={exportPdf} />
            </div>

            {/* Filtros de búsqueda */}
            <div className="flex gap-2 mb-4">
                <InputText
                    placeholder="Buscar por Usuario"
                    value={filters.nombreUsuario}
                    onChange={(e) => onFilterChange(e, 'nombreUsuario')}
                    style={{ width: '30%' }}
                />
                <InputText
                    placeholder="Buscar por Fecha (dd/mm/yyyy)"
                    value={filters.fechaSimulacion}
                    onChange={(e) => onFilterChange(e, 'fechaSimulacion')}
                    style={{ width: '30%' }}
                />
                <InputText
                    placeholder="Buscar por Proceso"
                    value={filters.proceso}
                    onChange={(e) => onFilterChange(e, 'proceso')}
                    style={{ width: '30%' }}
                />
            </div>

            {/* Tabla de reportes */}
            <DataTable ref={dt} value={filteredSimulations} paginator rows={8} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                {cols.map((col, index) => (
                    <Column key={index} field={col.field} header={col.header} sortable body={col.body} />
                ))}
            </DataTable>
        </Card>
    );
}
