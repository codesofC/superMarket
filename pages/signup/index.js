import Link from "next/link"
import { useState,  useEffect } from "react"
import { useFirebase } from "../../Firebase/useFirebase"
import { useDataContext } from "@/components/BigContainer/useDataContext"
import { setDoc, getDoc } from "firebase/firestore"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

const SignUp = () => {

    const initialData = {
        email: "",
        firstName: "",
        lastName: "",
        telephone: "",
        password: "",
        confirmPassword: "",
        errorMessage: ""
    }

    const [form, setForm] = useState(initialData)
    const [error, setError] = useState("")

    const { setIsLoading } = useDataContext()
    const { signup, user, setUid, setUserConnect } = useFirebase()


    const cart = useSelector(state => state.cart)
    const router = useRouter()

    let timeOut

    useEffect(() => {
        
        return () => clearTimeout(timeOut)
    }, [timeOut])

    const updateForm = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(form.password !== form.confirmPassword){
            setForm({...form, errorMessage: "Passwords incompatibles!"})
            return
        }

        setIsLoading(true)
        signup(form.email, form.password)
            .then(authUser => {
                setUid(authUser.user.uid)
                
                setDoc(user(authUser.user.uid), {
                    email: form.email,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    telephone: form.telephone,
                    cart
                })
            })
            .then(() => {
                setUserConnect(true)
                timeOut  = setTimeout(() => {
                    setIsLoading(false)
                    setForm(initialData)
                    router.push("/")
                }, 1500)
                
            })
            .catch( err => {
                setError(err.message)
                setIsLoading(false)
            })

    }

    const buttonSubmit = form.email && 
                        form.firstName && 
                        form.lastName &&
                        form.telephone &&
                        form.password.length > 5 && 
                        form.confirmPassword.length > 5 ? (
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
                        ) : (
                            <button disabled className="bg-gray-200 text-gray-400 px-4 py-2 rounded">Submit</button>
                        )
    const errorMessage =  error !== ""  && (
        <span className="text-sm text-red-500"> { error } </span>
    )

    return (
        <div className="px-5 flex flex-col gap-5 px-5 md:px-10 lg:px-18 xl:px-32 py-5">
            <h1 className='text-center text-xl font-bold text-lg lg:text-xl xl:text-2xl'>My Account</h1>
            <p className='my-5'> <Link href="/" className="text-gray-500">Home</Link> / SignUp </p>
            <form  method="POST" onSubmit={handleSubmit} className="flex flex-col gap-8 justify-center md:w-4/5 lg:w-2/5">
                
                {  errorMessage }

                <div className="flex flex-col gap-2">
                    <label htmlFor="firstName"> First Name <span className="text-red-400 font-bold">*</span></label>
                    <input
                        type="text"
                        id='firstName'
                        name="firstName"
                        value={form.firstName}
                        onChange={e => updateForm(e)}
                        required
                        className="w-full border py-3 px-2 rounded focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="lastName"> Last Name <span className="text-red-400 font-bold">*</span></label>
                    <input
                        type="text"
                        id='lastName'
                        name="lastName"
                        value={form.lastName}
                        onChange={e => updateForm(e)}
                        required
                        className="w-full border py-3 px-2 rounded focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email adress <span className="text-red-400 font-bold">*</span></label>
                    <input
                        type="email"
                        id='email'
                        name="email"
                        value={form.email}
                        onChange={e => updateForm(e)}
                        required
                        className="w-full border py-3 px-2 rounded focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="phone">Telephone <span className="text-red-400 font-bold">*</span></label>
                    <input
                        type="tel"
                        id='phone'
                        name="telephone"
                        value={form.telephone}
                        onChange={e => updateForm(e)}
                        required
                        className="w-full border py-3 px-2 rounded focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password <span className="text-red-400 font-bold">*</span></label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={form.password}
                        onChange={e => updateForm(e)}
                        onFocus={() => setForm({ ...form, errorMessage: ""})}
                        required
                        className="w-full border py-3 px-2 rounded focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword"> Confirm Password <span className="text-red-400 font-bold">*</span></label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={form.confirmPassword}
                        onChange={e => updateForm(e)}
                        onFocus={() => setForm({ ...form, errorMessage: ""})}
                        required
                        className="w-full border py-3 px-2 rounded focus:outline-none"
                    />
                </div>
                <span className="text-sm text-red-600"> { form.errorMessage } </span>
                <div className="flex gap-4 items-center">
                    { buttonSubmit }
                </div>
                <div className="flex flex-col gap-3 text-sky-950">
                    <p>You have account? <Link href="/login" className="underline hover:text-green-500">Login</Link> </p>
                </div>
            </form>
        </div>
    )
}

export default SignUp