import { fetchAllUsersAction } from "@/actions"
import AddNewUser from "@/components/add-new-user"
import UserCard from "@/components/single-user-card";

async function UserManagement () {
  const getListOfUsers=await fetchAllUsersAction();
  return (
    <div className="p-20 max-w-6xl">
        <div className="flex flex-col items-center gap-5">
            <h1 className="sm:text-4xl text-lg font-bold">User Management</h1>
            <AddNewUser/>
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {
          getListOfUsers && getListOfUsers.data && getListOfUsers.data.length>0 ? 
              getListOfUsers.data.map((user,index)=>(
                <UserCard key={index} user={user}/>
              ))
              :'No User Found'  
          }
        </div>
    </div>
  )
}
export default UserManagement