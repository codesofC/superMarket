import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { useFirebase } from "@/Firebase/useFirebase"
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa"
import { BiMenuAltLeft, BiSearch } from "react-icons/bi"
import { FiUser } from "react-icons/fi"
import { RiMenuUnfoldLine } from "react-icons/ri"
import { LiaShoppingBagSolid } from "react-icons/lia"
import { AiOutlineClose } from "react-icons/ai"

const Navbar = ( { setOpenCart }) => {

    const [search, setSearch] = useState("")
    const [showMenu, setShowMenu] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const { userConnect } = useFirebase()

    const cart = useSelector(state => state.cart)

    const router = useRouter()

    let totalItem = 0
    for(const item of cart){
        totalItem += item.quantity
    }

    return (
        <nav className="flex flex-col relative">
            <div className="flex justify-between px-5 py-2 border-b border-gray">
                <ul className="flex gap-2 items-center text-sm">
                    <li> <Link href="" className="hover:text-orange-400 hover:underline"> Daily Deal </Link> </li>
                    <li> <Link href="" className="hover:text-orange-400 hover:underline"> About Us </Link> </li>
                    <li> <Link href="" className="hover:text-orange-400 hover:underline"> Help </Link> </li>
                </ul>
                <ul className="flex gap-2 items-center text-lg">
                    <li><Link href={''} className="hover:text-orange-400"> <FaFacebook /> </Link></li>
                    <li><Link href={''} className="hover:text-orange-400"> <FaInstagram /> </Link></li>
                    <li><Link href={''} className="hover:text-orange-400"> <FaTwitter /> </Link></li>
                </ul>
            </div>
            <div className="relative flex flex-wrap justify-between items-center px-5 md:px-10 lg:px-18 xl:px-32 py-5 w-full border-b border-gray">
                <button className="text-2xl md:hidden" onClick={() => setShowMenu(true)}> <BiMenuAltLeft /> </button>
                <div className="w-32 min-w-20 flex items-center justify-center">
                    <Image
                        src={'https://assets.stickpng.com/images/62fe5219f31142d937b30c5e.png'}
                        width={500}
                        height={500}
                        alt="Picture"
                        priority={true}
                        className="w-full"
                    />
                </div>
                <div className={`absolute top-[110%] ${ showSearch ? 'right-[5%]' : 'right-[-100%]'} w-6/12 md:relative md:flex md:items-center md:justify-center z-20`}>
                    <div className="w-full">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className=" border-gray border rounded px-4 py-2 w-full focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center text-2xl gap-2 md:text-3xl md:gap-4">
                    <button className="text-2xl md:hidden" onClick={() => setShowSearch(!showSearch)}> <BiSearch /> </button>
                    {
                        userConnect ? <button className="p-2 bg-gray-200"> <FiUser /> </button>
                            : <button className="" onClick={() => router.push("/login")}> <FiUser /> </button>
                    }
                    <div className="flex relative cursor-pointer" onClick={() => setOpenCart(true)}>
                        <button> <LiaShoppingBagSolid /> </button>
                        <p className="absolute right-[-50%] top-[-25%] text-sm py-0.5 px-2 bg-green-400 text-white rounded-full flex items-center justify-center">
                            { totalItem === 0 ? '0' : totalItem }
                        </p>
                    </div>
                </div>
            </div>
            <div className={`md:block fixed top-0 ${ showMenu ? 'left-0' : 'left-[-100%] md:left-0'} w-full h-screen bg-black/50 md:bg-transparent z-30 md:relative md:h-auto transition-all`}>
                <ul className="relative w-9/12 h-full md:w-full bg-orange-400 md:bg-transparent flex flex-col md:flex-row gap-6 items-start md:items-center px-0 md:px-10 lg:px-18 xl:px-32 py-20 md:py-1 border-b border-gray">
                    <div className="w-full md:w-auto"  onClick={() => setShowMenu(false)}>
                        <button className="flex items-center gap-1 w-full md:auto text-lg text-white py-2 px-3 bg-green-700 rounded"> <span> <RiMenuUnfoldLine /> </span> All Categories </button>
                    </div>
                    <li className="hover:bg-green-500 md:hover:bg-transparent md:hover:text-orange-500 w-full md:w-auto text-white md:text-black text-lg md:text-md px-3 md:px-0 py-2 md:py-0"  onClick={() => setShowMenu(false)}>
                        <Link href="/" className="w-full md:w-auto block md:inline"> Home </Link>
                    </li>
                    <li className="hover:bg-green-500 md:hover:bg-transparent md:hover:text-orange-500 w-full md:w-auto text-white md:text-black text-lg md:text-md px-3 md:px-0 py-2 md:py-0"  onClick={() => setShowMenu(false)}>
                        <Link href="/prod" className="w-full md:w-auto block md:inline"> Fresh Food </Link>
                    </li>
                    <li className="hover:bg-green-500 md:hover:bg-transparent md:hover:text-orange-500 w-full md:w-auto text-white md:text-black text-lg md:text-md px-3 md:px-0 py-2 md:py-0"  onClick={() => setShowMenu(false)}>
                        <Link href="/" className="w-full md:w-auto block md:inline"> Fruits & Vegetables </Link>
                    </li>
                    <li className="hover:bg-green-500 md:hover:bg-transparent md:hover:text-orange-500 w-full md:w-auto text-white md:text-black text-lg md:text-md px-3 md:px-0 py-2 md:py-0"  onClick={() => setShowMenu(false)}>
                        <Link href="/" className="w-full md:w-auto block md:inline"> Packaged products</Link>
                    </li>
                    <li className="hover:bg-green-500 md:hover:bg-transparent md:hover:text-orange-500 w-full md:w-auto text-white md:text-black text-lg md:text-md px-3 md:px-0 py-2 md:py-0"  onClick={() => setShowMenu(false)}>
                        <Link href="" className="w-full md:w-auto block md:inline"> Drunks </Link>
                    </li>
                    <button 
                        className="absolute top-4 right-2 z-20 text-white text-3xl md:hidden"
                        onClick={() => setShowMenu(false)}
                    >
                        <AiOutlineClose />
                    </button>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar