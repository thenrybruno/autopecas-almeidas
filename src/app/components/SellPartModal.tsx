"use client"

import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

export default function SellPartModal({ part, onClose }: any) {

    const [quantity, setQuantity] = useState(1)

    const userId = localStorage.getItem("id")

    async function sellPart() {

        const res = await fetch("/api/sale", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                partId: part.id,
                quantity,
                userId
            })
        })

        if (part.quantity < quantity) {
            toast.error("Estoque insuficiente")
            return
        }

        if (res.ok) {
            toast.success("Venda realizada com sucesso")
            onClose()
        } else {
            toast.error("Erro ao realizar venda")
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

            <div className="bg-card p-6 rounded w-96 text-textLight border-3 border-cardBorder">

                <div className="flex flex-col gap-2 items-center justify-center">

                    <Image src="/auto-peca.png" alt="Auto Peças" width={70} height={50} />

                    <h2 className="text-xl text-center mb-4">
                        Vender Peça
                    </h2>

                </div>

                <p><b>Nome:</b> {part.name}</p>
                <p><b>Marca:</b> {part.brand}</p>
                <p><b>Preço:</b> R$ {part.price}</p>
                <p><b>Estoque:</b> {part.quantity}</p>

                <div className="mt-4">

                    <label>Quantidade</label>

                    <div className="relative">

                        <ShoppingCart size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-textLight" />

                        <input
                            type="number"
                            min="1"
                            max={part.quantity}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="border border-borderColor rounded px-3 py-1 w-full pl-12 outline-none"
                        />

                    </div>

                </div>

                <div className="flex justify-center items-center gap-4 mt-6">

                    <button
                        onClick={onClose}
                        className="bg-primary hover:bg-primaryDark transition duration-300 px-4 py-2 cursor-pointer rounded-2xl w-[50%]"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={sellPart}
                        className="bg-blue-600 hover:bg-blue-800 transition duration-300 text-white px-4 py-2 cursor-pointer rounded-2xl w-[50%]"
                    >
                        Confirmar
                    </button>

                </div>

            </div>

        </div>
    )
}