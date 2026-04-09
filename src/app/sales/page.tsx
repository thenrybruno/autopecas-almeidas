"use client"

import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { toast } from "sonner"
import ConfirmModal from "../components/ConfirmModal"
import { Trash2 } from "lucide-react"

export default function Sales() {

    const today = new Date()

    const [month, setMonth] = useState(today.getMonth() + 1)
    const [year, setYear] = useState(today.getFullYear())

    const [sales, setSales] = useState<any[]>([])
    const [total, setTotal] = useState<number>(0)

    const [confirmOpen, setConfirmOpen] = useState(false)
    const [selectedSale, setSelectedSale] = useState<string | null>(null)

    async function deleteSale() {

        if (!selectedSale) return

        const res = await fetch(`/api/sale/${selectedSale}`, {
            method: "DELETE"
        })

        if (res.ok) {

            toast.success("Venda removida")

            load()

        } else {

            toast.error("Erro ao excluir venda")

        }

        setConfirmOpen(false)
    }

    async function load() {

        const res = await fetch(`/api/movements?month=${month}&year=${year}`)

        const data = await res.json()

        setSales(data.movements)
        setTotal(data.totalValue)
    }

    useEffect(() => {
        load()
    }, [])

    return (

        <div className="bg-linear-to-br from-background via-gradientColor to-primaryDark min-h-screen">

            <Navbar />

            <div className="p-10 text-textLight">

                <h1 className="text-2xl mb-4">
                    Relatório de Vendas
                </h1>

                <div className="flex gap-4 mb-4">

                    <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="border p-2">

                        <option value={1} className="text-black">Janeiro</option>
                        <option value={2} className="text-black">Fevereiro</option>
                        <option value={3} className="text-black">Março</option>
                        <option value={4} className="text-black">Abril</option>
                        <option value={5} className="text-black">Maio</option>
                        <option value={6} className="text-black">Junho</option>
                        <option value={7} className="text-black">Julho</option>
                        <option value={8} className="text-black">Agosto</option>
                        <option value={9} className="text-black">Setembro</option>
                        <option value={10} className="text-black">Outubro</option>
                        <option value={11} className="text-black">Novembro</option>
                        <option value={12} className="text-black">Dezembro</option>

                    </select>

                    <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="border p-2 w-24" />

                    <button
                        onClick={load}
                        className="bg-blue-600 hover:bg-blue-800 transition duration-300 text-white px-4 rounded-2xl cursor-pointer w-24"
                    >
                        Filtrar
                    </button>

                </div>

                <h2 className="text-xl mb-4">
                    Total Vendido no mês:
                    <span className="font-bold text-green-600">
                        R$ {total.toFixed(2)}
                    </span>
                </h2>

                <table className="mt-6 w-full bg-background text-textLight">

                    <thead>

                        <tr className="border">
                            <th className="border p-2 w-[50%]">Peça</th>
                            <th className="border p-2 w-[10%]">Quantidade</th>
                            <th className="border p-2 w-[10%]">Preço</th>
                            <th className="border p-2 w-[10%]">Vendedor</th>
                            <th className="boredr p-2 w-[10%]">Data</th>
                            <th className="border p-2 w-[10%]">Ação</th>
                        </tr>

                    </thead>

                    <tbody className="bg-card">

                        {sales.map(s => (
                            <tr className="border text-center" key={s.id}>
                                <td className="p-2 border">{s.part.name}</td>
                                <td className="p-2 border">
                                    {s.quantity}
                                </td>

                                <td className="p-2 border">
                                    R$ {s.unitPrice}
                                </td>

                                <td className="p-2 border">
                                    {s.seller.name}
                                </td>

                                <td className="p-2 border">
                                    {new Date(s.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-2 border">
                                    <div className="relative">
                                        <button
                                            className="w-24 bg-primary hover:bg-primaryDark transition duration-300 p-2 rounded cursor-pointer text-sm pl-5"
                                            onClick={() => {
                                                setSelectedSale(s.id)
                                                setConfirmOpen(true)
                                            }}>
                                            <Trash2 size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-textLight ml-5"/>
                                            Excluir
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

            <ConfirmModal open={confirmOpen} title="Confirmar exclusão" message="Deseja realmente excluir essa venda?" onConfirm={deleteSale} onCancel={() => setConfirmOpen(false)} />

        </div>
    )
}