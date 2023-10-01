import Link from "next/link"
import { useState } from "react"

const SignUp = () => {

    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    })

    const updateForm = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="px-5 flex flex-col gap-5 px-5 md:px-10 lg:px-18 xl:px-32 py-5">
            <h1 className='text-center text-xl font-bold text-lg lg:text-xl xl:text-2xl'>My Account</h1>
            <p className='my-5'> <Link href="/" className="text-gray-500">Home</Link> / SignUp </p>
            <form action="" className="flex flex-col gap-8 justify-center md:w-4/5 lg:w-2/5">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email adress <span className="text-red-400 font-bold">*</span></label>
                    <input
                        type="email"
                        id='email'
                        name="user"
                        value={form.email}
                        onChange={e => updateForm(e)}
                        required
                        className="w-full border py-3 px-2 rounded focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="username"> Username <span className="text-red-400 font-bold">*</span></label>
                    <input
                        type="text"
                        id='username'
                        name="user"
                        value={form.username}
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
                        required
                        className="w-full border py-3 px-2 rounded focus:outline-none"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword"> Confirm Password <span className="text-red-400 font-bold">*</span></label>
                    <input
                        type="password"
                        name="password"
                        id="confirmPassword"
                        value={form.confirmPassword}
                        onChange={e => updateForm(e)}
                        required
                        className="w-full border py-3 px-2 rounded focus:outline-none"
                    />
                </div>
                <div className="flex gap-4 items-center">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
                </div>
                <div className="flex flex-col gap-3 text-sky-950">
                    <p>You have account? <Link href="/login" className="underline hover:text-green-500">Login</Link> </p>
                </div>
            </form>
        </div>
    )
}

export default SignUp