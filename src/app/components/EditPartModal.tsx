"use client"

import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

export default function EditPartModal({ part, onClose, onSaved }: any) {
    const [name, setName] = useState(part.name)
    const [code, setCode] = useState(part.code || "")
    const [brand, setBrand] = useState(part.brand)
    const [quantity, setQuantity] = useState(part.quantity)
    const [price, setPrice] = useState(part.price)

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
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome"
                        className="border border-borderColor rounded p-2"
                    />

                    <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Código"
                        className="border border-borderColor rounded p-2"
                    />

                    <input
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="Marca"
                        className="border border-borderColor rounded p-2"
                    />

                    <div className="flex items-center justify-between">

                        <label>Quantidade</label>

                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            placeholder="Quantidade"
                            className="border border-borderColor rounded p-2 w-32 text-center"
                        />

                    </div>

                    <div className="flex items-center justify-between">

                        <label>Preço</label>

                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            placeholder="Preço"
                            className="border border-borderColor rounded p-2 w-32 text-center"
                        />

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