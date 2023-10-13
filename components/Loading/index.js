import Image from "next/image"

const Loading = () => {

    return (
        <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center bg-white z-40">
            <div className="flex flex-col gap-3 items-center justify-center">
                <div className="min-w-20 w-32 flex items-center justify-center animate-bounce">
                    <Image
                        src={'https://assets.stickpng.com/images/62fe5219f31142d937b30c5e.png'}
                        width={500}
                        height={500}
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