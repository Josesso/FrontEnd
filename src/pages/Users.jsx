import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CustomerService } from '../service/CustomerService';
import RegisterModal from '../components/RegisterModal';
import { getUsers } from '../api/users';
import { Card } from 'primereact/card';

export default function Users() {
    const [customers, setCustomers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const responseUsers = await getUsers();
            setUsers(responseUsers.data);

            console.log(responseUsers.data)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <Card title="Usuarios">
            <RegisterModal />
            <DataTable value={users} paginator rows={8} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '1rem' }}
                selection={selectedProduct} onSelectionChange={(e) => setSelectedProduct(e.value)} dataKey="id" >
                <Column sortable field="id" header="ID" style={{ width: '25%' }}></Column>
                <Column sortable field="username" header="Nombre de Usuario" style={{ width: '25%' }}></Column>
                <Column sortable field="email" header="Email" style={{ width: '25%' }}></Column>
            </DataTable>
        </Card>
    );
}
