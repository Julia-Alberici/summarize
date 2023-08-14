"use client";
import { supabase } from "@/api/supabase-client";
import { getUser } from "@/app/actions";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{ user: User | null }>({ user: null });

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
        getUser().then((user) => {
            setUser(user ?? null)
        }).finally(() => {
            setLoading(false);
        });

        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session) {
                setUser(session.user);
                setAuth(true);
            } else if (event === "SIGNED_OUT") {
                setUser(null);
                setAuth(false);
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