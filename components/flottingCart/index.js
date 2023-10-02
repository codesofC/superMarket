import { useSelector } from "react-redux"
import { LiaShoppingBagSolid } from "react-icons/lia"
import { BiSolidChevronUp } from "react-icons/bi"
import { useState } from "react"

const FlottingCart = ({ setOpenCart }) => {

    const cart = useSelector(state => state.cart)
    const [scrollTop, setScrollTop] = useState(false)


    const scrollFunction = () => {
        if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
            setScrollTop(true)
        } else {
            setScrollTop(false)
        }
    }

    const backOnTop = () => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }

    window.addEventListener("scroll", scrollFunction)

    let totalItem = 0

    for (const item of cart) {
        totalItem += item.quantity
    }

  return (
    <div className="fixed bottom-[3rem] right-[3%] flex flex-col items-end gap-12 z-10">
        <span 
            className={`${ !scrollTop ?'hidden' : 'flex'} items-center justify-center bg-green-600 p-2 text-white font-bold rounded-full cursor-pointer text-xl`}
            onClick={backOnTop}
        >
            <BiSolidChevronUp />
        </span>
        <div 
            className="flex items-center justify-center p-3 relative bg-white rounded shadow-xl border cursor-pointer"
            onClick={() => setOpenCart(true)}
        >
            <LiaShoppingBagSolid className="text-4xl text-black" />
            <span 
                className="absolute left-[-1rem] top-[-1rem] bg-black py-2 px-4 rounded-full text-white text-md"
            > { totalItem } </span>
        </div>
    </div>
  )
}

export default FlottingCart