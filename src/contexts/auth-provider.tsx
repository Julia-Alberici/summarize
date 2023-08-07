import { supabase } from "@/api/supabase-client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export interface IAuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider = (props: IAuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            const { user: currentUser } = data;
            setUser(currentUser ?? null);
            setLoading(false);
        };
        getUser();
    }, []);

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('event', event)
            console.log('session', session)
            if (event === "SIGNED_IN" && session) {
                setUser(session.user);
                setAuth(true);
            }
        });
        return () => {
            data.subscription.unsubscribe();
        };
    }, []);
    return (
        <AuthContext.Provider value={{ user }}>{!loading && props.children}</AuthContext.Provider>
    );
};

export default AuthProvider;