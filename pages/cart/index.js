import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineDelete } from "react-icons/ai"

const Cart = () => {

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const router = useRouter()

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

    let totalOrder = 0

    for(const item of cart){
        totalOrder += item.price * item.quantity
    }

    return (
        <div className='flex flex-col gap-3 px-3 lg:px-12 xl:px-32 mt-5'>
            <h1 className='text-center text-xl font-bold text-lg lg:text-xl xl:text-2xl'>Cart</h1>
            <p className='my-5'> <Link href="/" className="text-gray-500">Home</Link> / Cart </p>
            {
                cart.length === 0 ?
                    <div>
                        Your cart is empty
                    </div>
                    :
                    <div className='flex flex-col md:flex-row gap-8 px-5 lg:justify-between'>
                        <div className='flex flex-col gap-2 md:w-3/5 lg:w-2/5 xl:w-3/5'>
                            {
                                cart.map(item => (
                                    <div className='flex gap-5 w-full border-b py-9'>
                                        <Link href={`/${item.name.toLowerCase().replaceAll(" ", "")}`} className="flex items-center w-3/12 xl:w-2/12">
                                            <div className='flex items-center justify-center w-full h-[10vh]'>
                                                <Image
                                                    src={item.image.url}
                                                    width={item.image.width}
                                                    height={item.image.height}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </Link>
                                        <div className='flex flex-col gap-5 w-5/6 xl:text-xl lg:text-lg'>
                                            <div className='flex justify-between items-center'>
                                                <Link 
                                                    href={`/${item.name.toLowerCase().replaceAll(" ", "")}`}
                                                    className="font-semibold"
                                                >{item.name}</Link>
                                                <span className='font-semibold'> $ {item.price}</span>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <input type="number" value={(item.quantity > 0) ? item.quantity : 1 } onChange={e => updateQuantityProduct(e.target.value, item.id)} className='bg-gray-100 px-1 py-2 w-16 text-center focus:outline-none' />
                                                <span 
                                                    className='flex items-center gap-1 cursor-pointer text-gray-400'
                                                    onClick={() => deleteItem(item.id)}
                                                > <AiOutlineDelete /> Remove </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className='flex items-center justify-center mt-4'>
                                <div className='flex items-center gap-4'>
                                    <span className='font-semibold'>Coupon: </span>
                                    <input type="text" placeholder='Coupon code' className='p-2 border focus:outline-none' />
                                    <button className='px-4 py-2 bg-green-500 text-white rounded'>Apply coupon</button>
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-200 px-3 py-5 flex flex-col justify-between gap-5 md:w-2/5 xl:w-1/5 md:h-[40vh]'>
                            <h2 className='text-center text-sm font-semibold'> Cart Totals</h2>
                            <div className='flex flex-col gap-12 text-xl font-semibold px-3'>
                                <p className='flex justify-between items-center'>
                                    <span>Subtotal</span>
                                    <span>$ {totalOrder}</span>
                                </p>
                                <p className='flex justify-between items-center'>
                                    <span>Total</span>
                                    <span> $ {totalOrder} </span>
                                </p>
                            </div>
                            <button 
                                className='px-4 py-2 bg-green-500 text-white rounded'
                                onClick={() => router.push("/checkout")}
                            > Proceed to checkout </button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Cart