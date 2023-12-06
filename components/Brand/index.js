import Image from "next/image"
import brandImg from "../../public/assets/brandImg.png"
import { FaPlane, FaCoffee, FaDollarSign, FaUmbrella } from "react-icons/fa"

const Brand = () => {
  return (
    <div className='relative w-full h-auto md:h-96 flex flex-col md:flex-row bg-gray-50 px-5 md:px-10 lg:px-18 xl:px-32 py-6'>
      <div className="w-full md:text-left md:w-1/2 h-full flex flex-col items-center justify-center md:items-start gap-5 md:gap-8 xl:gap-10">
        <h1 className="text-4xl md:text-5xl xl:text-6xl text-sky-950 font-bold"> Daily <span className="text-orange-400"> SuperECO </span> </h1>
        <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-6xl xxl:text-7xl text-sky-950 font-bold"> Fresh and Healthy </h1>
        <h3 className="text-lg text-sky-950 font-bold"> Direct to your home </h3>
        <button className="bg-orange-400 text-white px-5 py-3 text-md lg:text-lg font-bold rounded"> Shop now </button>
      </div>
      <div className="w-full md:w-1/2 h-full flex items-center justify-center">
        <Image
          src={brandImg}
          alt="Picture brand"
          width={1000}
          height={500}
          priority={true}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-11/12 md:w-11/12 lg:w-4/5 absolute left-1/2 translate-x-[-50%] grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:gap-6 bg-white rounded px-4 py-3 shadow" style={{ top: "95%" }}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <div className="text-6xl text-slate-900">
            <FaPlane />
          </div>
          <div className="flex flex-col gap-2 items-center justify-center text-slate-900">
            <p className="font-bold text-md lg:text-lg text-center">Free Shipping</p>
            <p className="text-sm lg:text-md text-center">On all order over</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <div className="text-6xl text-slate-900">
            <FaDollarSign />
          </div>
          <div className="flex flex-col gap-2 items-center justify-center text-slate-900">
            <p className="font-bold text-md lg:text-lg  text-center">Join Risk free</p>
            <p className="text-sm lg:text-md text-center">30 days refund</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <div className="text-6xl text-slate-900">
            <FaCoffee />
          </div>
          <div className="flex flex-col gap-2 items-center justify-center text-slate-900">
            <p className="font-bold text-md lg:text-lg  text-center">Support 24/7</p>
            <p className="text-sm lg:text-md text-center">Online 24 hours</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <div className="text-6xl text-slate-900">
            <FaUmbrella />
          </div>
          <div className="flex flex-col gap-2 items-center justify-center text-slate-900">
            <p className="font-bold text-md lg:text-lg text-center">100% Safe</p>
            <p className="text-sm lg:text-md text-center">Secure shopping</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Brand