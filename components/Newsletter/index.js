import Image from "next/image"
import newsImage from "@/public/assets/newsImage.webp"

const Newsletter = () => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-center bg-green-600 mx-5 lg:mx-20 xl:mx-48 px-8 py-5 rounded-md mt-28">
            <div className="w-full flex flex-col gap-3">
                <h2 className="text-3xl font-bold text-sky-950">Subscribe for latest updates</h2>
                <p className="text-sky-900">
                    Aliquet lectus proin nibh nisl condimentum id venenatis a
                    condimentum. Posuere urna nec tincidunt praesent semper.
                </p>
            </div>
            <form className="w-full flex flex-col gap-4">
                <input 
                    type="email" 
                    placeholder='Email' 
                    className="w-full px-3 py-2 rounded-sm border border-black"
                />  
                <button className="w-full py-3 text-white bg-orange-600 rounded-md font-bold"> SUBSCRIBE </button>
            </form>
            <div className="w-full xl:w-4/5">
                <Image
                    src={newsImage}
                    width={200}
                    height={200}
                    alt="Newsletter picture"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}

export default Newsletter