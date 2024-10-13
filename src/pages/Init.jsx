// components/Init.jsx
import { useInit } from "../hooks/useInit";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Init() {
    const { visible, isMobile, toggleSidebar } = useInit();

    return (
        <div className="w-full min-h-screen bg-[#f9fafb]">
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="flex w-full h-full ">
                <Sidebar visible={visible} toggleSidebar={toggleSidebar} isMobile={isMobile} />
                <main className={`mt-16  p-4 z-1 transition-all duration-300  ${visible && !isMobile ? 'md:ml-64' : 'ml-0'} flex-grow`}>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}