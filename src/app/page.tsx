"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, User } from "lucide-react";

export default function Login() {

  const router = useRouter()

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  async function handleLogin() {

    const res = await fetch("/api/login", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, password })
    })

    const data = await res.json()

    if (data.token) {
      localStorage.setItem("token", data.token)
      localStorage.setItem("role", data.role)
      router.push("/dashboard")
    } else {
      toast.error("Usuario ou senha inválido!")
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {

    if (e.key === "Enter") {
      handleLogin()
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-[#0B1140] to-primaryDark">

      <main className="w-96 p-10 rounded-xl bg-card shadow-2xl backdrop-blur border border-cardBorder">

        <div className="flex flex-col items-center mb-6">

          <Image src="/auto-peca.png" alt="Auto Peças" width={120} height={120} />

          <h1 className="text-textLight text-2xl font-bold mt-3">Auto Peças Almeidas</h1>

        </div>

        <div className="flex flex-col gap-4">

          <div className="relative">

            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-textLight" size={20} />

            <input
              className="p-3 rounded bg-background text-textLight border border-borderColor w-full pl-12 outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:shadow-[0_0_10px_rgba(225,29,46,0.7)]"
              type="text"
              placeholder="Usuário"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
            />

          </div>



          <div className="relative">

            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-textLight" />

            <input
              className="p-3 rounded bg-background text-textLight border border-borderColor w-full pl-12 outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:shadow-[0_0_10px_rgba(225,29,46,0.7)]"
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >

              {showPassword ? (
                <EyeOff size={20} className="text-textLight" />
              ) : (
                <Eye size={20} className="text-textLight" />
              )}

            </button>

          </div>

          <button
            className="bg-primary hover:bg-primaryDark text-textLight p-3 rounded font-semibold cursor-pointer transition duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(225,29,46,0.8)]"
            onClick={handleLogin}
          >
            Entrar
          </button>

        </div>

      </main>

    </div>

  );
}
