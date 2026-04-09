"use client"

import { Boxes, DollarSign, Factory, Hash, Package } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

export default function EditPartModal({ part, onClose, onSaved }: any) {
    const [name, setName] = useState(part.name)
    const [code, setCode] = useState(part.code || "")
    const [brand, setBrand] = useState(part.brand)
    const [quantity, setQuantity] = useState(part.quantity)
    const [price, setPrice] = useState(part.price)

    function handleKeyDown(e: React.KeyboardEvent) {

        if (e.key === "Enter") {
            e.preventDefault()
            updatePart()
        }

    }

    async function updatePart() {

        const res = await fetch(`/api/parts/${part.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                code,
                brand,
                quantity,
                price
            })
        })

        if (res.ok) {

            toast.success("Peça atualizada com sucesso")

            onSaved()
            onClose()
        } else {
            toast.error("Erro ao atualizar peça")
        }
    }

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

            <div className="bg-card p-6 rounded w-96 text-textLight border-3 border-cardBorder">

                <div className="flex flex-col gap-2 items-center justify-center">

                    <Image src="/auto-peca.png" alt="Auto Peças" width={70} height={50} />

                    <h2 className="text-xl text-center mb-4">
                        Editar Peça
                    </h2>

                </div>

                <div className="flex flex-col gap-2">

                    <div className="relative">

                        <Package size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-textLight" />

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Nome"
                            className="border border-borderColor rounded px-3 py-1 pl-12 outline-none w-full"
                        />

                    </div>

                    <div className="relative">

                        <Hash size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-textLight" />

                        <input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Código"
                            className="border border-borderColor rounded px-3 py-1 pl-12 outline-none w-full"
                        />

                    </div>

                    <div className="relative">

                        <Factory size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-textLight" />

                        <input
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Marca"
                            className="border border-borderColor rounded px-3 py-1 pl-12 outline-none w-full"
                        />

                    </div>

                    <div className="flex items-center justify-between">

                        <label>Quantidade</label>

                        <div className="relative">

                            <Boxes size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-textLight" />

                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                onKeyDown={handleKeyDown}
                                placeholder="Quantidade"
                                className="border border-borderColor rounded px-3 py-1 pl-12 outline-none w-32"
                            />

                        </div>

                    </div>

                    <div className="flex items-center justify-between">

                        <label>Preço</label>

                        <div className="relative">

                            <DollarSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-textLight" />

                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                onKeyDown={handleKeyDown}
                                placeholder="Preço"
                                className="border border-borderColor rounded px-3 py-1 w-32  pl-12 outline-none"
                            />

                        </div>

                    </div>

                </div>

                <div className="flex justify-center items-center gap-4 mt-6">

                    <button onClick={onClose} className="bg-primary hover:bg-primaryDark transition duration-300 px-4 py-2 cursor-pointer rounded-2xl w-[50%]">
                        Cancelar
                    </button>

                    <button onClick={updatePart} className="bg-blue-600 hover:bg-blue-800 transition duration-300 text-white px-4 py-2 cursor-pointer rounded-2xl w-[50%]">
                        Salvar
                    </button>

                </div>

            </div>

        </div>
    )
}