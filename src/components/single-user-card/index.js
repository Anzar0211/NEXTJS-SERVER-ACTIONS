"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { deleteUserById } from "@/actions";
import { useContext } from "react";
import { UserContext } from "@/context";


const UserCard = ({key,user}) => {

    const{setOpenPopUp,setNewUserFormData,setCurrentEditedId}=useContext(UserContext)


    async function handleEdit(currentUser){
        setOpenPopUp(true)
        setNewUserFormData({
            firstName:currentUser?.firstName,
            lastName:currentUser?.lastName,
            email:currentUser?.email,
            address:currentUser?.address
        });
        setCurrentEditedId(currentUser?._id)
    }

    async function handleUserDelete(userId){
        
        const result=await deleteUserById(userId,'/user-management');
        console.log(result);

    }

  return (
    <Card key={key}>
      <CardHeader>
        <CardTitle>{user?.firstName} {user?.lastName}</CardTitle>
        <CardDescription>{user?.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{user?.address}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={()=>handleEdit(user)}>Edit</Button>
        <Button onClick={()=>handleUserDelete(user?._id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}
export default UserCard