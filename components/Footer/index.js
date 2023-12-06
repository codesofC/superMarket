import Image from "next/image"
import Link from "next/link"
import logoImg from "@/public/assets/mylogo.png"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="w-full flex flex-col gap-6 px-12 lg:px-24 py-6 mt-28 bg-gray-50">
        <div className="">
            <Image
                src={logoImg}
                width={80}
                height={80}
                alt="Logo picture"
                priority={true}
                className="object-contain"
            />
        </div>
        <ul className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-center justify-between mx-auto">
            <li>
                <Link href='' className="hover:underline text-sky-950">Lorem, ipsum.</Link>
            </li>
            <li>
                <Link href='' className="hover:underline text-sky-950">Lorem, ipsum dolor.</Link>
            </li>
            <li>
                <Link href='' className="hover:underline text-sky-950">Lorem, ipsum.</Link>
            </li>
            <li>
                <Link href='' className="hover:underline text-sky-950">Lorem ipsum dolor sit.</Link>
            </li>
            <li>
                <Link href='' className="hover:underline text-sky-950">Lorem, ipsum dolor.</Link>
            </li>
            <li>
                <Link href='' className="hover:underline text-sky-950">Lorem, ipsum dolor.</Link>
            </li>
            <li>
                <Link href='' className="hover:underline text-sky-950">Lorem, ipsum.</Link>
            </li>
            <li>
                <Link href='' className="hover:underline text-sky-950">Lorem ipsum dolor sit.</Link>
            </li>
            <li>
                <Link href='' className="hover:underline text-sky-950">Lorem, ipsum.</Link>
            </li>
            <li>
                <Link href='' className="hover:underline text-sky-950">Lorem, ipsum dolor.</Link>
            </li>
            <li>
                <Link href='' className="hover:underline text-sky-950">Lorem, ipsum.</Link>
            </li>
            <li>
                <Link href='' className="hover:underline text-sky-950">Lorem, ipsum dolor.</Link>
            </li>
        </ul>
        <ul className="flex gap-4 text-xl items-center justify-center">
            <li> <Link href='' className="text-sky-950"> <FaFacebook /> </Link></li>
            <li> <Link href='' className="text-sky-950"> <FaInstagram /> </Link></li>
            <li> <Link href='' className="text-sky-950"> <FaTwitter /> </Link></li>
        </ul>
        <p className="flex items-center justify-center text-sky-950">
            Copyright &copy; Judelin Inélus - 2023
        </p>
    </footer>
  )
}

export default Footer