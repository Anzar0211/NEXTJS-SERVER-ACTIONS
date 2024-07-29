'use client'

import { useContext, useState } from "react";
import { Button } from "../ui/button"
import { Input } from "../ui/input"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { AddNewUserFormControls, addNewUserFormInitialState } from "@/utils";
import { Label } from "../ui/label";
import { addNewUserAction, updateUserByIdAction } from "@/actions";
import { UserContext } from "@/context";



const AddNewUser = () => {
    const{openPopUp,setOpenPopUp,newUserFormData,setNewUserFormData,currentEditedId,setCurrentEditedId}=useContext(UserContext)

    console.log(newUserFormData);

    const handleSaveButtonValid=()=>{
        return Object.keys(addNewUserFormInitialState).every((key)=>newUserFormData[key].trim() !=="")
    }

    async function handleAddNewUserAction(){
        const result=currentEditedId
        ? await updateUserByIdAction(currentEditedId,newUserFormData,'/user-management') 
        :await addNewUserAction(newUserFormData,"/user-management");
        console.log(result);
        setOpenPopUp(false);
        setNewUserFormData(addNewUserFormInitialState)
        setCurrentEditedId(null)
    }
  return (
    <div>
      <Button onClick={() => setOpenPopUp(true)}>Add New User</Button>
      <Dialog
        open={openPopUp}
        onOpenChange={() => {
          setOpenPopUp(false);
          setNewUserFormData(addNewUserFormInitialState);
          setCurrentEditedId(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{
                currentEditedId ? 'Edit User' : 'Add New'    
            }</DialogTitle>
          </DialogHeader>
          <form action={handleAddNewUserAction} className="grid gap-4 py-4">
            {AddNewUserFormControls.map((controlItem) => (
              <div className="mb-5" key={controlItem.name}>
                <Label htmlFor={controlItem.name} className="text-right">
                  {controlItem.label}
                </Label>
                <Input
                  id={controlItem.name}
                  placeholder={controlItem.placeholder}
                  type={controlItem.type}
                  value={newUserFormData[controlItem.name]}
                  onChange={(e) =>
                    setNewUserFormData({
                      ...newUserFormData,
                      [controlItem.name]: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            ))}
            <DialogFooter>
              <Button
                className="disabled:opacity-55"
                disabled={!handleSaveButtonValid()}
                type="submit"
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default AddNewUser