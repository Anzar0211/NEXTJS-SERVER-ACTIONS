'use client'

import { addNewUserFormInitialState } from "@/utils";
import { createContext, useState } from "react";

export const UserContext=createContext(null);


export default function UserState({children}){
    const [openPopUp, setOpenPopUp] = useState(false);
    const [newUserFormData,setNewUserFormData] = useState(addNewUserFormInitialState);
    const[currentEditedId,setCurrentEditedId]=useState(null);

    return(
        <UserContext.Provider value={{currentEditedId,setCurrentEditedId,openPopUp,setOpenPopUp,newUserFormData,setNewUserFormData}}>
            {children}
        </UserContext.Provider>
    )
}