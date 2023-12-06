import Image from "next/image"
import logoImg from "../../public/assets/mylogo.png"

const Loading = () => {

    return (
        <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center bg-white z-40">
            <div className="flex flex-col gap-3 items-center justify-center">
                <div className="flex items-center justify-center animate-bounce">
                    <Image
                        src={logoImg}
                        width={80}
                        height={80}
                        alt="Picture"
                        priority={true}
                        className="w-full"
                    />
                </div>
                <p className="text-sky-950 text-sm animate-pulse"> Loading... </p>
            </div>
        </div>
    )
}

export default Loading