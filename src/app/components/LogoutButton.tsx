"use client"

import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter()

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("role")

        router.push("/")
    }

    return(
        <button onClick={logout} className="bg-primary hover:bg-primaryDark transition duration-300 py-2 px-4 rounded cursor-pointer">
            Logout
        </button>
    )
}