import { useRouter } from "next/router"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import { LiaShoppingBagSolid } from "react-icons/lia"
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai"
import { useFirebase } from "@/Firebase/useFirebase"

const Cart = ({ setOpenCart }) => {

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const router = useRouter()

    const { userConnect } = useFirebase()

    const deleteItem = id => {
        dispatch({
            type: "DELETEITEM",
            payload: {
                id
            }
        })
    }

    const updateQuantityProduct = (e, id) => {
        dispatch({
            type: "UPDATEITEM",
            payload: {
                id,
                quantity: Number(e)
            }
        })
    }

    const goToCart = () => {
        router.push("/cart")
        setOpenCart(false)
    }

    const goToCheckout = () => {
        router.push("/checkout")
        setOpenCart(false)
    }

    const backToShop = () => {
        setOpenCart(false)
    }

    let totalOrder = 0

    for (const item of cart) {
        totalOrder += item.price * item.quantity
    }

    const checkoutButton = userConnect && cart.length > 0 ? (
        <button
            className="py-2 px-5 bg-black text-white text-sm rounded"
            onClick={goToCheckout}
        > Checkout </button>
    ) : (
        <button
            className="py-2 px-5 bg-gray-200 text-black text-sm rounded"
            disabled
        > Checkout </button>
    )

    return (
        <div className="relative h-screen w-full flex flex-col gap-4 bg-gray-200 shadow">
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
                    <button className="py-2 px-4 bg-black text-white" onClick={backToShop}> Back To Shop </button>
                </div>
                    :
                    <div className="w-full flex flex-col gap-4 p-3">
                        {
                            cart.map(item => (
                                <div key={item.id} className="flex flex-col p-1 gap-4 bg-white">
                                    <div className="flex items-start justify-between border-b border-gray-200 py-1">
                                        <div className="w-[15%]">
                                            <Image
                                                src={item.image.url}
                                                width={200}
                                                height={200}
                                                alt="Product Picture"
                                                className="w-full object-fill"
                                            />
                                        </div>
                                        <p className="text-sm text-sky-950 hover:text-green-400">{item.name}</p>
                                        <span className="text-sm text-red-500 cursor-pointer" onClick={() => deleteItem(item.id)}> <AiOutlineDelete /> </span>
                                    </div>
                                    <div className="flex items-center justify-between py-1">
                                        <div className="flex items-center gap-2 text-sky-950">
                                            <label htmlFor="quantity">Quantity</label>
                                            <input type="number" name='quantity' value={item.quantity > 0 && item.quantity} onChange={e => updateQuantityProduct(e.target.value, item.id)} className="border boder-black bg-transparent p-1 w-1/5" />
                                        </div>
                                        <span className="text-sky-950 font-bold text-md"> ${(item.price).toFixed(2)}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }

            <div className="absolute bottom-0 right-0 w-full flex flex-col gap-4 pb-5 bg-white z-20">
                <p className="py-3 text-center text-sky-950 text-sm border-t border-gray-300 bg-gray-200"> Payment Details </p>
                <p className="flex items-center justify-between text-sky-950 font-semibold px-2">
                    <span className="text-sm">Sub Total</span>
                    <span className="text-md"> ${totalOrder.toFixed(2)} </span>
                </p>
                <div className="flex items-center justify-between gap-4 px-2 mt-5">
                    <button
                        className="py-2 px-5 text-sky-950 border border-black text-sm rounded"
                        onClick={goToCart}
                    > View Cart </button>
                    {checkoutButton}
                </div>
            </div>
        </div>
    )
}

export default Cart