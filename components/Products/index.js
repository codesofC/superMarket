import Image from "next/image"
import { memo, useState } from "react"
import { useDispatch } from "react-redux"
import { FaEye } from "react-icons/fa"

const Products = memo(({ product }) => {

    const [more, setMore] = useState(false)

    const dispatch = useDispatch()

    const addToCart = item => {
        dispatch({
            type: "ADDITEM",
            payload: {
                ...item,
                quantity: 1
            }
        })
    }

    return (
        <div className="relative w-full lg:w-11/12 xl:w-4/5 mx-auto">
            <div className={`relative w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center items-center px-4 md:px-10 py-3 gap-x-4 gap-y-8 sm:gap-x-6 lg:gap-x-8 xl:gap-x-10 ${more ? 'h-auto' : 'h-[50rem] lg:h-[30rem]'} overflow-y-hidden transition-all`}>
                {
                    product && product.map(item => (
                        <div key={item.id} className="w-full h-80 relative flex flex-col justify-end items-center cursor-pointer group shadow-md hover:shadow-xl transition-shadow">
                            <div className="w-full h-48 absolute left-50 top-4 flex items-center justify-center">
                                <Image
                                    src={item.image.url}
                                    width={item.image.width}
                                    height={item.image.height}
                                    alt="Product picture"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2 px-2 pb-3 pt-12 bg-gray-100 rounded-tl-xl rounded-tr-xl">
                                <p className="text-sky-950 text-md md:text-xl font-semibold">{item.name}</p>
                                <p className="text-2xl font-bold text-green-700">${item.price}</p>
                                <p className="text-sky-950 text-sm text-right">{item.category}</p>
                            </div>
                            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0 group-hover:h-full overflow-hidden bg-black/50 z-10 opacity-0 group-hover:opacity-100 flex flex-col justify-between py-8 px-5 transition-all ease-in duration-300">
                                <p
                                    className="text-right text-xl"
                                    title="More infos"
                                >
                                    <FaEye className="text-gray-900 hover:text-orange-700" />
                                </p>
                                <button
                                    className="text-md px-2 py-2 rounded bg-green-700 hover:bg-white hover:text-green-700 text-white font-semibold"
                                    onClick={() => addToCart(item)}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
            {
               !more && <div className="w-full flex items-center justify-center absolute top-[103%] before:block before:w-full before:h-px before:absolute before:bg-gray-200 before:z-[-1]">
                    <span 
                        className="text-xl px-12 py-1 bg-gray-200 font-bold rounded-lg cursor-pointer"
                        onClick={() => setMore(true)}
                    >
                        More
                    </span>
                </div>
            }
        </div>
    )
})

export default Products