"use client"

type props = {
    open: boolean
    title: string
    message: string
    onConfirm: () => void
    onCancel: () => void
}

export default function ConfirmModal({

    open,
    title,
    message,
    onConfirm,
    onCancel
}: props) {

    if (!open) return null

    return (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-[#11183F] text-textLight p-6 rounded-xl w-96 shadow-xl border border-cardBorder">

                <h2 className="text-lg font-bold mb-3">
                    {title}
                </h2>

                <p className="text-textSecondary mb-6">
                    {message}
                </p>

                <div className="flex justify-end gap-3">

                    <button onClick={onCancel} className="px-4 py-2 bg-primary hover:bg-primaryDark transition duration-300 cursor-pointer rounded">
                        Cancelar
                    </button>

                    <button onClick={onConfirm} className="px-4 py-2 bg-green-600 hover:bg-green-800 transition duration-300 cursor-pointer rounded">
                        Confirmar
                    </button>

                </div>

            </div>

        </div>

    )

}