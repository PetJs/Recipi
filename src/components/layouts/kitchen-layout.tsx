import { Outlet } from "react-router-dom";


export default function KitchenLayout(){

    return(
        <div className="p-2">
            <h2 className="text-xl font-bold">Welcome to your Kitchen</h2>
            <Outlet/>
        </div>
    )
}