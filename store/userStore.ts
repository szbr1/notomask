import { authClient } from "@/lib/auth-client";
import { SessionProps } from "@/types/types";
import {create} from "zustand"

interface UserProps {
    isLoggedIn: boolean;
    isFetching: boolean
    fetchUser: ()=> void;
    user: SessionProps | null | undefined;
}

export const useUserStore = create<UserProps>((set)=>({
    isLoggedIn: false,
    isFetching: false,
    user: null,
    fetchUser: async ()=>{
       set({isFetching: true})
       const details = await authClient.getSession()
       if(details.data && details.data.user){
        set({isLoggedIn: true, user: details.data.user, isFetching: false})
        
       }else{
        set({isLoggedIn: false, user: undefined, isFetching: false})
        console.log("user details are corrupted or not fetching completely.")
       }
    }
}))