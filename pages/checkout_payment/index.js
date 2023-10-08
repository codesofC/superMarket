import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { imgCard } from "@/pages/api/imgCard";

const CheckoutPayment = () => {

    const [card, setCard] = useState({
        nameCard: "",
        numberCard: "",
        dateCard: "",
        cvcCard: ""
    })

    const router = useRouter()

    const handlePage = e => {
        e.preventDefault()
        router.push("/")
    }

    const handleChange = e => {
        setCard({
            ...card,
            [e.target.name]: e.target.value
        })
    }


    return (
        <main
            className="flex justify-center w-full my-12"
        >
            <section
                className="w-full sm:w-4/5 xl:w-1/4 flex flex-col gap-3 items-center justify-center"
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

                    <form action="" className="flex flex-col gap-6">

                        <div>
                            <input
                                type="text"
                                name="nameCard"
                                id=""
                                placeholder="Name on card"
                                value={card.nameCard}
                                onChange={handleChange}
                                className="px-4 py-2 w-full focus:outline-none border rounded"
                            />
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <input
                                type="text"
                                name="numberCard"
                                placeholder="Card Number"
                                value={card.numberCard}
                                onChange={handleChange}
                                pattern="[0-9]{16}"
                                className="w-full focus:outline-none px-4 py-2 border rounded"
                            />
                        </div>
                        <div className="flex items-center justify-between
                        ">
                            <input
                                type="text"
                                name="dateCard"
                                placeholder="MM/YY"
                                pattern="[0-9]{2}/[0-9]{2}"
                                value={card.dateCard}
                                onChange={handleChange}
                                className="px-4 py-2 focus:outline-none flex border rounded"
                            />
                            <input
                                type="text"
                                name="cvcCard"
                                placeholder="CVC"
                                pattern="[0-9]{3}"
                                value={card.cvcCard}
                                onChange={handleChange}
                                className="px-4 py-2 focus:outline-none flex border rounded"
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
                                Pay
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default CheckoutPayment;

