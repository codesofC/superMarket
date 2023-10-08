import Link from "next/link"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { useRouter } from "next/router"


const Checkout = () => {

    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        zip: "",
        country: "",
        state: "",
        adress: "",
        phone: "",
        moreInfos: ""
    })
    const [countryData, setCountryData] = useState([])
    const [codeCountry, setCodeCountry] = useState("")
    const [statesCountry, setStatesCountry] = useState([])
    const [couponDisplay, setCouponDisplay] = useState(false)

    const cart = useSelector(state => state.cart)

    const router = useRouter()

    useEffect(() => {
        findCountries()
    }, [])

    useEffect(() => {
        if (codeCountry !== "") {
            findStates()
        }
    }, [codeCountry])

    const updateForm = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const updateCountry = (e) => {
        const val = e.target.value
        const id = val.slice(0, 2)
        const name = val.slice(2, val.length)
        setCodeCountry(id)
        setForm({
            ...form,
            country: name
        })
    }

    async function findCountries() {
        const options = {
            method: 'GET',
            url: 'https://city-and-state-search-api.p.rapidapi.com/countries',
            headers: {
                'X-RapidAPI-Key': '5257834396msheeafefe006a2c5bp12a68ejsnd4b10c39547e',
                'X-RapidAPI-Host': 'city-and-state-search-api.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setCountryData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function findStates() {
        const options = {
            method: 'GET',
            url: 'https://city-and-state-search-api.p.rapidapi.com/states',
            params: { country_code: codeCountry },
            headers: {
                'X-RapidAPI-Key': '5257834396msheeafefe006a2c5bp12a68ejsnd4b10c39547e',
                'X-RapidAPI-Host': 'city-and-state-search-api.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setStatesCountry(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    let totalOrder = 0

    for(const item of cart){
        totalOrder += item.price * item.quantity
    }

    return (
        <div className="px-5 flex flex-col items-center gap-5 px-5 md:px-10 lg:px-18 xl:px-32 py-5">
            <h1 className='text-center text-xl font-bold text-lg lg:text-xl xl:text-2xl'>Checkout</h1>
            <p className='my-5'> <Link href="/" className="text-gray-500">Home</Link> / Checkout </p>
            <div className="flex flex-col gap-4 items-center w-full md:w-1/2 lg:w-2/5">
                <div className="flex flex-col items-center justify-center md:flex-row gap-4 py-3 px-4 bg-gray-200 w-full">
                    <p>Have a coupon?</p>
                    <p className="underline cursor-pointer" onClick={() => setCouponDisplay(!couponDisplay)}>Click here to enter your code</p>
                </div>
                <div className={`${ !couponDisplay ? 'hidden' : 'flex' } flex-col items-center gap-3 py-3 px-2 border w-full`}>
                    <p> If you have a coupon code, please apply it below.</p>
                    <div className="flex gap-2 items-center justify-center w-full">
                        <input type="text" placeholder="Coupon code" className="py-3 px-2 border" />
                        <button className="bg-green-600 text-white font-bold py-3 px-2 rounded"> Apply coupon </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 lg:gap-8 w-full lg:w-4/5 xl:w-3/5">
                <div className="flex flex-col gap-5 md:w-3/5">
                    <h2 className="font-semibold">Billing details</h2>
                    <form action="" className="flex flex-col gap-8 justify-center">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="firstName">First name <span className="text-red-400 font-bold">*</span></label>
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
                                <label htmlFor="lastName">Last name <span className="text-red-400 font-bold">*</span></label>
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
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="country">Country <span className="text-red-400 font-bold">*</span></label>
                            <select
                                name="country"
                                id="country"
                                required
                                className="border py-3 px-2 focus:outline-none"
                                onChange={updateCountry}
                            >
                                {
                                    countryData && countryData.map(item => (
                                        <option
                                            key={`${item.iso2}`}
                                            value={item.iso2 + item.name}
                                        >
                                            {item.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        {statesCountry.length > 0 && <div className="flex flex-col gap-2">
                            <label htmlFor="state">State / Country <span className="text-red-400 font-bold">*</span></label>
                            <select
                                name="state"
                                id="state"
                                onChange={(e) => setForm({ ...form, state: e.target.value })}
                                required
                                className="border py-3 px-2 focus:outline-none"
                            >
                                {
                                    statesCountry.map(item => (
                                        <option
                                            key={`${item.id}`}
                                            value={item.name}
                                        >
                                            {item.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="adress">Street adress <span className="text-red-400 font-bold">*</span></label>
                            <input
                                type="text"
                                id='adress'
                                name="adress"
                                value={form.adress}
                                onChange={e => updateForm(e)}
                                required
                                placeholder="Street name and house number"
                                className="w-full border py-3 px-2 rounded focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="zip">Postcode / ZIP <span className="text-red-400 font-bold">*</span></label>
                            <input
                                type="text"
                                id='zip'
                                name="zip"
                                value={form.zip}
                                onChange={e => updateForm(e)}
                                required
                                className="w-full border py-3 px-2 rounded focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="phone">Phone <span className="text-red-400 font-bold">*</span></label>
                            <input
                                type="tel"
                                id='phone'
                                name="phone"
                                value={form.phone}
                                onChange={e => updateForm(e)}
                                required
                                className="w-full border py-3 px-2 rounded focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="adress">Email <span className="text-red-400 font-bold">*</span></label>
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
                        <div className="flex flex-col gap-4">
                            <label htmlFor="moreInfos">Addicional infos (Optional)</label>
                            <textarea 
                                name="moreInfos" 
                                id="moreInfos" 
                                cols="30" 
                                rows="10"
                                value={form.moreInfos}
                                onChange={(e) => updateForm(e)}
                                className="border focus:outline-none py-3 px-2 rounded w-full"
                            ></textarea>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col gap-5 md:w-2/5">
                    <h2 className="font-semibold">Your order</h2>
                    <div className="flex flex-col gap-16 border pt-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between border-b font-bold px-3 md:px-4 lg:px-6 py-3">
                                <span>Products</span>
                                <span>Subtotal</span>
                            </div>
                            <div>
                                {
                                    cart && cart.map(item => (
                                        <div key={item.id} className="flex items-center justify-between border-b px-3 py-3 md:px-4 lg:px-6">
                                            <span> R$ {item.name} X {item.quantity} </span>
                                            <span> R$ { (item.price * item.quantity).toFixed(2)} </span>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="flex flex-col gap-5 mx-3 md:mx-4 lg:mx-6 py-4 border-b-4 border-black">
                                <div className="flex items-center justify-between font-semibold">
                                    <span>SubTotal</span>
                                    <span> R$ {totalOrder.toFixed(2)} </span>
                                </div>
                                <div className="flex items-center justify-between font-semibold">
                                    <span>Total</span>
                                    <span> R$ {totalOrder.toFixed(2)} </span>
                                </div>
                            </div>
                        </div>
                        <p className="px-3 md:px-4 lg:px-6">
                            Sorry, it seems that there are no available payment methods. Please contact us 
                            if you require assistance or wish to make alternate arrangements.Sorry, 
                            it seems that there are no available payment methods. Please contact us if 
                            you require assistance or wish to make alternate arrangements.
                        </p>
                        <div className="flex items-center justify-center px-3 md:px-4 lg:px-6 py-5 border-t">
                            <button className="bg-green-600 text-white py-3 px-4 rounded text-center font-semibold w-full" onClick={() => router.push("/checkout_payment")}> Place Order </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout