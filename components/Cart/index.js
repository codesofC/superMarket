import { useState } from "react"
import Image from "next/image"
import { useSelector } from "react-redux"
import { LiaShoppingBagSolid } from "react-icons/lia"
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai"

const Cart = ({ setOpenCart }) => {
    const [quantInput, setQuantInput] = useState(1)
    const cart = useSelector(state => state.cart)

    return (
        <div className="h-screen w-full flex flex-col gap-4 bg-gray-200 shadow">
            <div className="relative h-full w-full">
                <div className="relative w-full flex items-center justify-center text-lg py-3 bg-white">
                    <span className="absolute top-1/2 left-4 translate-y-[-50%] text-sm cursor-pointer" onClick={() => setOpenCart(false)}> <AiOutlineClose /></span>
                    <div className="flex gap-1 items-center justify-center text-sm font-semibold text-sky-950">
                        <span className="text-3xl"> <LiaShoppingBagSolid /> </span>
                        Cart
                    </div>
                </div>
                {
                    cart.length < 1 ? <div className="flex flex-col items-center justify-center gap-4 pt-5">
                        <p className="text-md font-semibold"> Your Cart is Empty </p>
                        <button className="py-2 px-4 bg-black text-white"> Back To Shop </button>
                    </div>
                        :
                        <div className="w-full flex flex-col gap-4 p-3">
                            {
                                cart.map(item => (
                                    <div key={item.id} className="flex flex-col p-1 bg-white">
                                        <div className="flex items-start justify-between border-b border-gray-200">
                                            <div className="w-[10%]">
                                                <Image
                                                    src={item.image.url}
                                                    width={200}
                                                    height={200}
                                                    alt="Product Picture"
                                                    className="w-full object-contain"
                                                />
                                            </div>
                                            <p className="text-sm text-sky-950 hover:text-green-400">{item.name}</p>
                                            <span className="text-sm text-red-500 cursor-pointer"> <AiOutlineDelete /> </span>
                                        </div>
                                        <div className="flex items-center justify-between py-1">
                                            <div className="flex items-center gap-2 text-sky-950">
                                                <label htmlFor="quantity">Quantity</label>
                                                <input type="number" name='quantity' value={quantInput} onChange={(e) => e.target.value > 0 ? setQuantInput(e.target.value) : setQuantInput(1)} className="border boder-black bg-transparent p-1 w-1/5" />
                                            </div>
                                            <span className="text-sky-950 font-bold text-md"> $20.00 </span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                }

                <div className="absolute bottom-0 left-0 w-full flex flex-col gap-4 pb-5 bg-white">
                    <p className="py-3 text-center text-sky-950 text-sm border-t border-gray-300 bg-gray-200"> Payment Details </p>
                    <p className="flex items-center justify-between text-sky-950 font-semibold px-2">
                        <span className="text-sm">Sub Total</span>
                        <span className="text-md"> $50.00 </span>
                    </p>
                    <div className="flex items-center justify-between gap-4 px-2 mt-5">
                        <button className="py-2 px-5 text-sky-950 border border-black text-sm rounded"> View Cart </button>
                        <button className="py-2 px-5 bg-black text-white text-sm rounded"> Checkout </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart