"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import SellPartModal from "../components/SellPartModal"

export default function Dashboard() {

    const [parts, setParts] = useState<any[]>([])
    const [search, setSearch] = useState("")

    const [selectedPart, setSelectedPart] = useState<any>(null)
    const [openModal, setOpenModal] = useState(false)

    async function searchParts() {
        const res = await fetch(`/api/parts?search=${search}`)
        const data = await res.json()

        setParts(data)
    }

    function clearSearch() {

        setSearch("")
        setParts([])

    }

    return (
        <div className="bg-linear-to-br from-background via-gradientColor to-primaryDark min-h-screen">
            <Navbar />

            <div className="p-10 text-textLight">

                <h1 className="text-2xl mb-4">Buscar Peças</h1>

                <div className="flex gap-2">

                    <input
                        className="border w-80 p-2 placeholder-textLight"
                        value={search || ""}
                        placeholder="Nome, código ou marca"
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                searchParts()
                            }
                        }}
                    />

                    <button
                        onClick={searchParts}
                        className="bg-blue-600 hover:bg-blue-800 transition duration-300 text-white px-4 rounded-2xl cursor-pointer w-32"
                    >
                        Buscar
                    </button>

                    <button
                        onClick={clearSearch}
                        className="bg-yellow-400 hover:bg-yellow-600 transition duration-300 px-4 rounded-2xl cursor-pointer w-32"
                    >
                        Limpar
                    </button>
                </div>

                <table className="mt-6 w-full bg-background text-textLight">

                    <thead>

                        <tr className="border">
                            <th className="border py-2 w-[50%]">Nome</th>
                            <th className="border py-2 w-[10%]">Código</th>
                            <th className="border py-2 w-[15%]">Marca</th>
                            <th className="border py-2 w-[5%]">Qtd</th>
                            <th className="border py-2 w-[10%]">Preço</th>
                            <th className="border py-2 w-[10%]">Ação</th>
                        </tr>

                    </thead>

                    <tbody className="bg-card">

                        {parts.map(p => (
                            <tr className="border text-center" key={p.id}>

                                <td className="border">{p.name}</td>
                                <td className="border">{p.code}</td>
                                <td className="border">{p.brand}</td>
                                <td className="border">{p.quantity}</td>
                                <td className="border">R$ {p.price}</td>

                                <td className="py-2">
                                    <button onClick={() => {
                                        setSelectedPart(p)
                                        setOpenModal(true)
                                        clearSearch()
                                    }} className="bg-green-600 hover:bg-green-800 transition duration-300 text-white px-3 py-1 rounded-2xl cursor-pointer">
                                        Vender
                                    </button>
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

            {openModal && (
                <SellPartModal part={selectedPart} onClose={() => setOpenModal(false)} />
            )}
        </div>
    )
}