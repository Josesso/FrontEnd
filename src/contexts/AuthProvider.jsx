// AuthContext.js

import { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, logout as out, profile } from '../api/auth';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAutententicated, setIsAutenticated] = useState(false);
    const [loading, setLoading] = useState(true)

  

    const signin = async (user) => {
        const response = await loginRequest(user);
        setUser(response.data.user);
        setIsAutenticated(true);
        return response;
    }

    const logout = async () => {
        //const response = await out();
        Cookies.remove('jwt')
        setUser(null);
        setIsAutenticated(false);
        return;
    }


    useEffect(() => {
        async function checkLogin() {
            //console.log(Cookies.get('jwt'))

            if (!Cookies.get('jwt')) {
                setUser(null);
                setIsAutenticated(false);
                setLoading(false);
                return;
            }
            try {
                const response = await profile({jwt:Cookies.get('jwt')});
                console.log(Cookies.get('jwt'))

                setUser(response.data);
                setIsAutenticated(true);
                setLoading(false);

            } catch (error) {
                console.log(error)
                setUser(null);
                setIsAutenticated(false);
                setLoading(false);
            }

        }
        checkLogin();

    }, []);

    return (
        <AuthContext.Provider value={{ user,  signin, isAutententicated, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error('useAuth error')

    return context;
};