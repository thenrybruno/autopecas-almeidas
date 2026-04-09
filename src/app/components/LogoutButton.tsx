"use client"

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter()

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("role")

        router.push("/")
    }

    return (

        <div className="relative">

            

            <button onClick={logout} className=" bg-primary hover:bg-primaryDark transition duration-300 py-2 px-4 rounded cursor-pointer pl-8">
                <LogOut size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-textLight"/>
                Logout
            </button>

        </div>

    )
}