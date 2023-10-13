import { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { useFirebase } from "@/Firebase/useFirebase"
import { FiUser, FiUserCheck, FiMapPin } from "react-icons/fi"
import { PiUserListFill } from "react-icons/pi"
import { LiaUserLockSolid } from "react-icons/lia"
import { MdSecurity, MdLogout } from "react-icons/md"
import { BiChevronRight } from "react-icons/bi"
import { useDataContext } from "@/components/BigContainer/useDataContext"
import { runTransaction } from "firebase/firestore"

const MyAccount = () => {

    const imgRef = useRef(null)
    const inputFileRef = useRef(null)

    const { setUserConnect, userConnect, signout, db, user, uid } = useFirebase()

    const router = useRouter()

    const { setIsLoading, dataUserConnected, setDataUserConnected } = useDataContext()
    let timeOut


    const handleLogout = () => {
        setIsLoading(true)
        signout()
            .then(() => {
                setUserConnect(false)
                setIsLoading(false)
            })

        router.push("/")
    }


    useEffect(() => {
        setIsLoading(true)

        timeOut = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timeOut)
    }, [timeOut])

    const handleProfil = () => {
        if(inputFileRef.current.files && inputFileRef.current.files[0]){
            const reader = new FileReader()

            reader.onload = e => {
                setDataUserConnected(prevState => ({
                    ...prevState,
                    profilImg: e.target.result
                }))
                try {
                    runTransaction(db, async (transaction) => {
                      const currentData = await transaction.get(user(uid))
          
                      if (!currentData.exists()) {
                        throw "Data not found"
                      }
          
                      transaction.update(user(uid), {
                        ...currentData.data(),
                        profilImg: e.target.result
                      })
                    })
                  } catch (e) {
                    console.error("Update Database failed!")
                  }
            }
            reader.readAsDataURL(inputFileRef.current.files[0])
        }
    }

    if (!userConnect) {
        timeOut = setTimeout(() => {
            router.push("/")
        }, 500)
    }

    

    return (
        <div className="flex flex-col gap-4 items-center justify-center w-full md:w-4/6 lg:w-1/2 mx-auto my-12">
            <div className="flex items-center justify-center gap-6 px-4 py-4 w-4/6 md:mw-1/2 ">
                <div className="flex flex-col gap-3 items-center justify-center">
                    <div className="flex items-center justify-center border rounded-full overflow-hidden w-[90px] h-[90px]">
                        {
                            !dataUserConnected.profilImg ? (
                                <FiUser title="Add profil picture" className="text-center text-5xl" />
                            ) : (
                                <Image
                                    src={dataUserConnected.profilImg}
                                    width={60}
                                    height={60}
                                    alt="profil picture"
                                    property={"true"}
                                    className="w-full h-full object-contain"
                                    ref={imgRef}
                                />
                            )
                        }
                    </div>
                    <div className="relative flex items-center justify-center">
                        <input 
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            className="absolute top-0 left-0 block w-full h-full opacity-0 z-10"
                            ref={inputFileRef}
                            onChange={handleProfil}
                            onDrag={handleProfil}
                        />
                        <button className="px-3 py-1 bg-gray-200 text-gray-500 text-sm rounded"> Change profil </button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-lg font-bold"> {`${dataUserConnected.firstName} ${dataUserConnected.lastName}`}  </span>
                    <span className="text-sm text-gray-700"> {dataUserConnected.email} </span>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between cursor-pointer py-3 px-4 hover:bg-gray-100">
                    <div className="flex items-start gap-3">
                        <span className="flex items-center justify-center text-xl sm:text-3xl border border-black p-1
                             sm:p-2 rounded-full"> <PiUserListFill /> </span>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold text-md">My informations</h3>
                            <p className="text-sm text-gray-500">
                                is the informations you filled in to use your account
                            </p>
                        </div>
                    </div>
                    <span className="flex items-center justify-center text-2xl"> <BiChevronRight /> </span>
                </div>
                <div className="flex items-center justify-between cursor-pointer py-3 px-4 hover:bg-gray-100">
                    <div className="flex items-start gap-3">
                        <span className="flex items-center justify-center text-xl sm:text-3xl border border-black p-1
                             sm:p-2 rounded-full"> <FiUserCheck /> </span>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold text-md">Account data</h3>
                            <p className="text-sm text-gray-500">
                                Yor name, email and phones
                            </p>
                        </div>
                    </div>
                    <span className="flex items-center justify-center text-2xl"> <BiChevronRight /> </span>
                </div>
                <div className="flex items-center justify-between cursor-pointer py-3 px-4 hover:bg-gray-100">
                    <div className="flex items-start gap-3">
                        <span className="flex items-center justify-center text-xl sm:text-3xl border border-black p-1
                             sm:p-2 rounded-full"> <LiaUserLockSolid /> </span>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold text-md">Security</h3>
                            <p className="text-sm text-gray-500">
                                Security settings
                            </p>
                        </div>
                    </div>
                    <span className="flex items-center justify-center text-2xl"> <BiChevronRight /> </span>
                </div>
                <div className="flex items-center justify-between cursor-pointer py-3 px-4 hover:bg-gray-100">
                    <div className="flex items-start gap-3">
                        <span className="flex items-center justify-center text-xl sm:text-3xl border border-black p-1
                             sm:p-2 rounded-full"> <FiMapPin /> </span>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold text-md">Addresses</h3>
                            <p className="text-sm text-gray-500">
                                Addresses saved in your account
                            </p>
                        </div>
                    </div>
                    <span className="flex items-center justify-center text-2xl"> <BiChevronRight /> </span>
                </div>
                <div className="flex items-center justify-between cursor-pointer py-3 px-4 hover:bg-gray-100">
                    <div className="flex items-start gap-3">
                        <span className="flex items-center justify-center text-xl sm:text-3xl border border-black p-1
                             sm:p-2 rounded-full"> <MdSecurity /> </span>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold text-md">Privacy</h3>
                            <p className="text-sm text-gray-500">
                                Preferences and controls over the use of your data
                            </p>
                        </div>
                    </div>
                    <span className="flex items-center justify-center text-2xl"> <BiChevronRight /> </span>
                </div>
                <div className="flex items-center justify-between cursor-pointer py-3 px-4 hover:bg-gray-100" onClick={handleLogout}>
                    <div className="flex items-start gap-3">
                        <span className="flex items-center justify-center text-xl sm:text-3xl border border-black p-1
                             sm:p-2 rounded-full"> <MdLogout /> </span>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold text-md">Logout</h3>
                        </div>
                    </div>
                    <span className="flex items-center justify-center text-2xl"> <BiChevronRight /> </span>
                </div>
            </div>
        </div>
    )
}

export default MyAccount