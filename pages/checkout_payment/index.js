import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { imgCard } from "@/pages/api/imgCard";
import { useDataContext } from "@/components/BigContainer/useDataContext";
import { useFirebase } from "@/Firebase/useFirebase";

const CheckoutPayment = () => {

    const [card, setCard] = useState({
        nameCard: "",
        numberCard: "",
        dateCard: "",
        cvcCard: ""
    })

    const [errorMessage, setErrorMessage] = useState("")

    const router = useRouter()

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const { setIsLoading } = useDataContext()
    const { userConnect } = useFirebase()
    let timeOut

    if (!userConnect) {
        router.push("/login")

        return
    }

    useEffect(() => {
        setIsLoading(true)

        timeOut = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        return () => {
            clearTimeout(timeOut)
        }

    }, [])

    useEffect(() => {
        setErrorMessage("")
    }, [card])

    const handleSubmit = e => {
        e.preventDefault()
        if (card.numberCard.length === 16 && card.dateCard.length === 4 && card.cvcCard > 2) {

            dispatch({
                type: "RESETCART"
            })

            timeOut = setTimeout(()=> {
            router.push("/result_payment")
            }, 1000)
        } else {
            setErrorMessage("An error among the inserted data card!")
        }

    }

    const handleChange = e => {

        let re = null
        if (e.target.name === "numberCard") {
            re = /^[0-9\b]+$/
        } else if (e.target.name === "dateCard") {
            re = /^(0[1-9]{0,1}|1[0-2]{0,1})\/?([2-9]{0,2})$/
        } else if (e.target.name === "cvcCard") {
            re = /^[0-9]{0,4}$/
        }

        if (e.target.name !== "nameCard") {
            if (e.target.value === '' || re.test(e.target.value)) {
                setCard(prevState => ({
                    ...prevState,
                    [e.target.name]: e.target.value
                }))
                e.target.style.border = "1px solid gray"
            } else {
                e.target.style.border = "1px solid red"
            }

            return
        }

        setCard(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    let totalOrder = 0

    for (const item of cart) {
        totalOrder += item.price * item.quantity
    }


    return (
        <main
            className="flex justify-center w-full my-12"
        >
            <section
                className="w-full sm:w-4/5 md:1/2 lg:w-3/5 xl:w-1/4 flex flex-col gap-3 items-center justify-center"
                style={{ height: "auto" }}
            >
                <div
                    className="flex flex-col w-full gap-6 px-5"
                >
                    <h1 className="font-bold text-lg">
                        Enter your credit or debit card details
                    </h1>
                    <div className="flex gap-2">
                        {imgCard.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center w-[40px] h-[25px] border border-black"
                            >
                                <Image
                                    src={item}
                                    width="40"
                                    height="25"
                                    alt="pic"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                    <span className="text-center my-3 text-red-500"> {errorMessage} </span>
                    <form action="" className="flex flex-col gap-6" onSubmit={handleSubmit}>

                        <div>
                            <input
                                type="text"
                                name="nameCard"
                                id=""
                                placeholder="Name on card"
                                value={card.nameCard}
                                onChange={handleChange}
                                className="px-4 py-2 w-full focus:outline-none border rounded"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <input
                                type="text"
                                name="numberCard"
                                placeholder="Card Number"
                                value={card.numberCard}
                                onChange={handleChange}
                                maxLength="16"
                                className="w-full focus:outline-none px-4 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between flex-wrap gap-3
                        ">
                            <input
                                type="text"
                                name="dateCard"
                                placeholder="MM/YY"
                                value={card.dateCard}
                                onChange={handleChange}
                                maxLength="5"
                                className="px-4 py-2 focus:outline-none flex border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="cvcCard"
                                placeholder="CVC"
                                value={card.cvcCard}
                                onChange={handleChange}
                                maxLength="4"
                                className="px-4 py-2 focus:outline-none flex border rounded"
                                required
                            />
                        </div>
                        <div>
                            <input type="checkbox" name="" id="save" />
                            <label htmlFor="save"> Save my card </label>
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="text-white bg-green-700 px-4 py-2 rounded w-full"
                            >
                                Pay amount ( ${totalOrder.toFixed(2)} )
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default CheckoutPayment;

