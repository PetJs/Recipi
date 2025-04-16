import { useUserStore } from "@/store/userStore";
import { NavLink, Outlet } from "react-router-dom";


export default function KitchenLayout(){
    const { user } = useUserStore()

    return(
        <div className="p-2">
            <h2 className="text-xl font-bold">Welcome to your Kitchen {user?.username}</h2>
            <nav className="flex gap-4 mt-4 md:text-lg text-[14px] font-semibold">
                <NavLink to='/kitchen/favourite' className={({ isActive }) => 
                    isActive 
                    ? 'border-b-2 border-green-500' 
                    : ''
                }> My Favourite</NavLink>
                <NavLink to='/kitchen/meal-planning' className={({ isActive }) => 
                    isActive 
                    ? 'border-b-2 border-green-300' 
                    : ''
                }>Meal Planning</NavLink>
                <NavLink to='/kitchen/shopping-list' className={({ isActive }) => 
                    isActive 
                    ? 'border-b-2 border-green-300' 
                    : ''
                }>Create a Shopping-List</NavLink>
            </nav>
            <Outlet/>
        </div>
    )
}