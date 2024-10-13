import React from 'react';
import { Menu } from 'primereact/menu';
import { Sidebar as PrimeSidebar } from 'primereact/sidebar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const routes = [
    //{ route: "/", name: "Inicio", icon: "pi pi-home" },
    { route: "/", name: "Inicio", icon: "pi pi-chart-bar" },
    { route: "/usuarios", name: "Usuarios", icon: "pi pi-user" },
    { route: "/reportes", name: "Reportes", icon: "pi pi-file" },
];

export default function Sidebar({ visible, toggleSidebar, isMobile }) {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const menuItems = routes.map(route => ({
        label: route.name,
        icon: route.icon,
        command: () => {
            navigate(route.route);
            if (isMobile) toggleSidebar();
        }
    }));

    const logoutItem = [{
        label: "Cerrar Sesion",
        icon: "pi pi-logout",
        command: () => {
            logout()
            navigate("/login");

            if (isMobile) toggleSidebar();
        }}
    ];

    const MenuContent = () => (
        <div className="p-4 h-full flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Opciones</h2>
            <Menu model={menuItems} className="w-full" />
          </div>
          <Menu model={logoutItem} className="w-full" />
        </div>
      );

    if (isMobile) {
        return (
            <PrimeSidebar visible={visible} onHide={toggleSidebar}>
                <MenuContent />
            </PrimeSidebar>
        );
    }

    return (
        <div className={`fixed mt-16 transition-all duration-300 ${visible ? 'w-64' : 'w-0'} overflow-hidden`}>
            <div className="w-64 p-4 h-[90vh]">
                <div className=" bg-white rounded-xl shadow-lg h-full overflow-y-auto">
                    <MenuContent />
                </div>
            </div>
        </div>
    );
}