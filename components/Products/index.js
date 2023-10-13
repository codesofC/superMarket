import Image from "next/image"
import { memo, useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"

const Products = memo(({ product, isDescription }) => {

    const [more, setMore] = useState(false)

    const router = useRouter()

    const dispatch = useDispatch()
    let timeOut

    useEffect(() => {

        return () => clearTimeout(timeOut)
    }, [timeOut])

    const addToCart = (e, item) => {
        dispatch({
            type: "ADDITEM",
            payload: {
                ...item,
                quantity: 1
            }
        })

        e.target.innerHTML = "Added successfully"
        timeOut = setTimeout(() => {
            e.target.innerHTML = "Add to cart"
        }, 500)

    }

    const goToItem = arg => {
        router.push(`/product/${arg.toLowerCase().replaceAll(" ", "").replaceAll("/", "-")}`)
    }

    return (
        <div className="relative w-full lg:w-11/12 xl:w-4/5 mx-auto">
            <div className={`relative w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center items-center px-4 md:px-10 py-3 gap-x-4 gap-y-8 sm:gap-x-6 lg:gap-x-8 xl:gap-x-10 ${more || isDescription ? 'h-auto' : 'h-[50rem] lg:h-[30rem]'} overflow-y-hidden transition-all`}>
                {
                    product && product.map(item => (
                        <div key={item.id} className="w-full h-80 relative flex flex-col justify-end items-center cursor-pointer group border border-gray-100 shadow-lg md:shadow-sm hover:shadow-xl transition-shadow py-2">
                            <div
                                className="w-full h-40 sm:h-48 absolute left-50 top-4 flex items-center justify-center px-4 pb-5"
                                onClick={() => goToItem(item.name)}
                            >
                                <Image
                                    src={item.image.url}
                                    width={item.image.width}
                                    height={item.image.height}
                                    alt="Product picture"
                                    priority
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div
                                className="w-full flex flex-col items-center gap-2 px-2 pb-3 pt-12 rounded-tl-xl rounded-tr-xl"
                            >
                                <p className="text-sky-950 text-md md:text-xl font-semibold">{item.name}</p>
                                <p className="text-xl font-bold text-green-700">${item.price}</p>
                            </div>
                            <div className="flex lg:hidden group-hover:flex overflow-hidden z-10 flex flex-col justify-center py-2 px-5 transition-all ease-in duration-300" >
                                <button
                                    className="text-sm md:text-md px-4 py-1 rounded hover:bg-green-700 bg-white text-green-700 border border-green-700 hover:text-white font-semibold"
                                    onClick={(e) => addToCart(e, item)}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                !more && !isDescription && <div className="w-full flex items-center justify-center absolute top-[103%] before:block before:w-full before:h-px before:absolute before:bg-gray-200 before:z-[-1]">
                    <span
                        className="text-md px-12 py-1 bg-gray-200 font-bold rounded-lg cursor-pointer"
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