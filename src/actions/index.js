"use server"

import connectDB from "@/database"
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export async function addNewUserAction(formData,pathToRevalidate){
    await connectDB();
    try {
        const newlyCreatedUser=await User.create(formData);
        if(newlyCreatedUser){
            revalidatePath(pathToRevalidate)
            return{
                success:true,
                message:'User created successfully'
            }
        }else{
            return{
                success:false,
                message:'Some error occurred! Please try again'
            }
        }
    } catch (error) {
        console.log(error);
        return{
            success:false,
            message:'Some error occurred! Please try again'
        }
    }
}

export async function fetchAllUsersAction(){
    try {
        await connectDB();
        const allUsers=await User.find({});
        if(allUsers){
            return {
                success:true,
                data:JSON.parse(JSON.stringify(allUsers))
            }
        }else{
            return{
                success:false,
                message:'Some error occurred! Please try again'
            }
        }
    } catch (error) {
        console.log(error);
        return{
            success:false,
            message:'Some error occurred! Please try'
        }
    }
}


export async function deleteUserById(userId,pathToRevalidate){
    try {
        await connectDB();
        const deletedUser=await User.findByIdAndDelete(userId);
        if(deletedUser){
            revalidatePath(pathToRevalidate)
            return {
                success:true,
                message:'User deleted successfully'
            }
        }else{
            return{
                success:false,
                message:'Some error occurred! Please try again'
            }
        }
    } catch (error) {
        console.log(error);
        return{
            success:false,
            message:'Some error occurred! Please try again'
        }
    }
}

export async function updateUserByIdAction(userId,formData,pathToRevalidate){
    const{firstName,lastName,email,address}=formData;
    try {
        await connectDB()
        const updatedUser=await User.findOneAndUpdate(
            {_id:userId},
            {firstName,lastName,email,address},
            {new:true}
        )
        if(updatedUser){
            revalidatePath(pathToRevalidate)
            return{
                success:true,
                message:'User updated successfully'
            }
        }else{
            return{
                success:false,
                message:'Some error occurred! Please try again'
            }
        }
    } catch (error) {
        console.log(error);
        return{
            success:false,
            message:'Some error occurred! Please try again'
        }
    }
}