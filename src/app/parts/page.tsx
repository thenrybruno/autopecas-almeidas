"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import { toast } from "sonner"
import Image from "next/image"

export default function Parts() {

    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [brand, setBrand] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)

    function cleanForm() {
        setName("")
        setCode("")
        setBrand("")
        setQuantity(0)
        setPrice(0)
    }

    function handleKeyDown(e: React.KeyboardEvent) {

        if (e.key === "Enter") {
            e.preventDefault()
            createPart()
        }

    }

    async function createPart() {

        const res = await fetch("/api/parts", {

            method: "POST",

            body: JSON.stringify({
                name,
                code,
                brand,
                quantity,
                price
            })
        })

        if (res.ok) {

            toast.success("Peça cadastrada com sucesso")
            cleanForm()

        } else {

            toast.error("Erro ao cadastrar peça")
        }
    }

    return (

        <div className="bg-linear-to-br from-background via-gradientColor to-primaryDark h-screen">

            <Navbar />

            <div className="w-full mt-10 flex items-center justify-center">

                <div className="p-8 flex flex-col gap-3 w-96 bg-card text-textLight rounded border border-cardBorder">

                    <div className="flex flex-col items-center">

                        <Image src="/auto-peca.png" alt="Auto Peças" width={70} height={50} />

                        <h1 className="text-2xl text-center">
                            Cadastro de Peças
                        </h1>

                    </div>

                    <input className="border border-borderColor rounded px-3 py-1" type="text" onKeyDown={handleKeyDown} value={name} placeholder="Nome da peça" onChange={(e) => setName(e.target.value)} />

                    <input className="border border-borderColor rounded px-3 py-1" type="text" onKeyDown={handleKeyDown} value={code} placeholder="Código" onChange={(e) => setCode(e.target.value)} />

                    <input className="border border-borderColor rounded px-3 py-1" type="text" onKeyDown={handleKeyDown} value={brand} placeholder="Marca" onChange={(e) => setBrand(e.target.value)} />

                    <div className="flex items-center justify-between">

                        <label>Quantidade</label>

                        <input className="border border-borderColor rounded px-3 py-1 w-32" type="number" onKeyDown={handleKeyDown} value={quantity} placeholder="Quantidade" onChange={(e) => setQuantity(Number(e.target.value))} />

                    </div>

                    <div className="flex items-center justify-between">

                        <label>Preço</label>

                        <input className="border border-borderColor rounded px-3 py-1 w-32" type="number" onKeyDown={handleKeyDown} value={price} placeholder="Preço" onChange={(e) => setPrice(Number(e.target.value))} />

                    </div>

                    <button onClick={createPart} className="bg-green-600 hover:bg-green-800 transition duration-300 text-white px-4 py-2 rounded-2xl cursor-pointer">
                        Cadastrar
                    </button>

                    <button
                        onClick={cleanForm}
                        className="bg-yellow-400 hover:bg-yellow-600 text-black transition duration-300 px-4 py-2 rounded-2xl cursor-pointer"
                    >
                        Limpar
                    </button>

                </div>

            </div>

        </div>
    )

}