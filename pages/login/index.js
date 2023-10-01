import Link from "next/link"
import { useState } from "react"

const Login = () => {

  const [form, setForm] = useState({
    user: "",
    password: ""
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
      <p className='my-5'> <Link href="/" className="text-gray-500">Home</Link> / Login </p>
      <form action="" className="flex flex-col gap-8 justify-center md:w-4/5 lg:w-2/5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Username or email adress <span className="text-red-400 font-bold">*</span></label>
          <input
            type="text"
            id='email'
            name="user"
            value={form.user}
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
        <div className="flex gap-4 items-center">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Log in</button>
          <div className="flex gap-2 items-center">
            <input type="checkbox" name="remember" id="remember" />
            <label htmlFor="remember"> Remember me </label>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-sky-950">
          <p>You don't have account? <Link href="/signup" className="underline hover:text-green-500">Sign Up</Link> </p>
          <p>
            <Link href="/lost-password" className="underline text-sm hover:text-green-500">Lost your password?</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login