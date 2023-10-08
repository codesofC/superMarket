import { useRouter } from "next/router"
import { useFirebase } from "@/Firebase/useFirebase"
import { FiUser, FiUserCheck, FiMapPin } from "react-icons/fi"
import { PiUserListFill } from "react-icons/pi"
import { LiaUserLockSolid } from "react-icons/lia"
import { MdSecurity, MdLogout } from "react-icons/md"
import { BiChevronRight } from "react-icons/bi"

const MyAccount = () => {

    const { userConnect, setUserConnect, signout } = useFirebase()

    const handleLogout = () => {
        signout()
        .then(() => setUserConnect(false))
        router.push("/")
    }

    const router = useRouter()

    return (
        !userConnect ? (
            setTimeout(() => {
                router.push("/signin")
            }, 100)
        ) : (
            <div className="flex flex-col gap-4 items-center justify-center w-full md:w-4/6 lg:w-1/2 mx-auto my-12">
            <div className="flex items-center justify-center gap-6 px-4 py-4 shadow-md w-4/6 md:mw-1/2 ">
                <div className="flex items-center justify-center text-4xl px-4 py-4 border rounded-full"> <FiUser /> </div>
                <div className="flex flex-col gap-2">
                    <span className="text-lg font-bold"> Judelin Inélus </span>
                    <span className="text-sm text-gray-700"> email000012@gmail.com </span>
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
    )
}

export default MyAccount