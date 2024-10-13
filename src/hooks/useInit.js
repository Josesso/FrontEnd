// hooks/useInit.js
import { useState, useEffect } from 'react';

export function useInit() {
    const [visible, setVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            const newIsMobile = window.innerWidth < 768;
            setIsMobile(newIsMobile);
            if (!newIsMobile) {
                setVisible(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setVisible(prev => !prev);

    return { visible, isMobile, toggleSidebar };
}