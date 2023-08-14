'use server'

import { supabase } from "@/api/supabase-client";

 
export const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    const { user: currentUser } = data;
    return currentUser;
};