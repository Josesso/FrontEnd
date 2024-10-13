import { Button } from 'primereact/button';

export default function Navbar({toggleSidebar}) {
    return (
        <div className=" fixed flex flex-col flex-1  bg-white border-b border-gray-200 w-full  opacity-90 z-50">
            <div className="flex items-center px-4 absolute mt-2">
                <Button 
                    text 
                    rounded 
                    className="text-gray-500 focus:outline-none focus:text-gray-700" 
                    icon="pi pi-bars" 
                    onClick={toggleSidebar}
                />
            </div>
            <div className="flex items-center justify-center h-16 w-full">
                <img src='/logo.png' className='h-20' />
            </div>
        </div>
    )
}
