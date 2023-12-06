import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {useDataContext} from "@/components/BigContainer/useDataContext";
import { useDispatch } from "react-redux";
import Products from "@/components/Products";
import { AiOutlineStar, AiFillStar } from "react-icons/ai"


const ProductName = ({ data}) => {
  const [description, setDescription] = useState(false)
  const [recommended, setRecommended] = useState([])
  const [quantity, setQuantity] = useState(1)
  const rating = [false, false, false, false, false]

  //Use my custom hook for dataApiContext
  const { dataApi, setIsLoading } = useDataContext()
  let timeOut

  const dispatch = useDispatch()

  if (!data) {
    return (
      <div className="text-center py-5"> Loading... </div>
    )
  }
  useEffect(() => {
    setIsLoading(true)
    let arr = []
      dataApi.forEach(item => {
        if((item.category === data.category) && (item.id !== data.id) && arr.length < 8 ){
          arr.push(item)
        }
      });
    setRecommended(arr)
    timeOut = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      clearTimeout(timeOut)
    }
    
  }, [])

  const handleRating = arg => {
    let rating = [false, false, false, false, false]
    for (let i = 0; i <= arg; i++) {
      rating[i] = true
    }
  }

  let starsRating = () => {
    return (
      <div className="flex text-xl gap-1">
        {
          rating.map((item, index) => (
            <span
              key={index}
              className="cursor-pointer"
              onClick={() => handleRating(index)}
            > {item ? <AiFillStar /> : <AiOutlineStar />} </span>
            )
            )
          }
        </div>)
  }

  const addItem = () => {
    dispatch({
      type: 'ADDITEM',
      payload: {
        ...data,
        quantity
      }
    })
  }

return (
  <div className="flex flex-col gap-5 px-3 py-4">
    <p> <Link href="/" className="text-gray-500">Home</Link> / <Link href="" className="text-gray-500">Products</Link> / {data.name} </p>
    <div className="w-full flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-[50vh] flex items-center justify-center py-16">
        <Image
          src={data.image.url}
          height={data.image.height}
          width={data.image.width}
          priority
          alt="Product Picture"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <h1 className="text-3xl font-semibold text-sky-950">{data.name}</h1>
        <h3 className="text-2xl font-semibold text-sky-950">$ {data.price}</h3>
        <p className="text-sky-950 text-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi nisi labore iusto
          suscipit quibusdam sit, aliquid corporis doloribus eos aspernatur corrupti, ipsam
          deleniti laborum sapiente, quia dignissimos facilis dolor. Soluta consequatur
          repudiandae ab ex magnam! A suscipit quia iure consequuntur eligendi! Iure quis
          pariatur, quas exercitationem a amet quaerat ullam reiciendis, autem sit id
          voluptatibus asperiores corrupti? Eius, eum numquam!
        </p>
        <div className="flex gap-3">
          <div className="flex items-center justify-center gap-4 rounded px-3 py-1 border">
            <button 
              className="py-1 px-3 rounded-full hover:bg-gray-200"
              onClick={() => (quantity > 1 ) && setQuantity(quantity - 1)}
            >-</button>
            <input
              type="text"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-[3rem] focus:outline-none text-center"
            />
            <button 
              className="py-1 px-3 rounded-full hover:bg-gray-200"
              onClick={() => setQuantity(quantity + 1)}
            >+</button>
          </div>
          <button 
            className="flex items-center justify-center bg-green-500 text-white px-3 py-1 rounded"
            onClick={addItem}
          > Add to cart </button>
        </div>
        <p className="text-md">
          Category: <span className="text-sky-950">{data.category}</span>
        </p>
      </div>
    </div>
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-center gap-12 font-semibold border-b py-3">
        <button className={`${description === false && "text-green-500"}`} onClick={() => setDescription(false)}> Description </button>
        <button className={`${description && "text-green-500"}`} onClick={() => setDescription(true)}> Reviews (0) </button>
      </div>
      <div className="px-3 lg:px-48 xl:px-96 2xl:px-[28rem] flex items-center">
        {!description ?
          <div className="text-sky-950 flex flex-col gap-3 leading-relaxed">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus repellat eos
              commodi eveniet obcaecati nulla cupiditate aliquam? Placeat consequuntur pariatur
              vel ducimus minima ut accusantium unde maxime nostrum harum incidunt quis officiis
              necessitatibus optio nulla mollitia recusandae sint ipsam laborum fugit maiores,
              voluptatibus beatae suscipit? Facilis nesciunt impedit rerum perspiciatis numquam
              sequi architecto velit quod sit exercitationem nulla, quos animi eius! Harum exercitationem
              repellat saepe eveniet commodi quo.
            </p>
            <p>
              Cum facilis omnis ducimus deleniti accusantium est harum
              fugiat totam temporibus. Praesentium beatae similique doloribus earum. Quod praesentium
              adipisci aut sequi illo qui architecto accusamus iusto dolores!
            </p>
          </div>
          :
          <form action="" className="flex flex-col gap-3 text-lg md:w-5/6 lg:w-4/6 2xl:w-3/6">
            <p>There are no review yet.</p>
            <p>Your email address will not be published. Required fields are marked *</p>
            <div className="flex items-center gap-3">
              <p> Your rating *</p>
              {
                starsRating()
              }
            </div>
            <div className="flex flex-col gap-5">
              <label htmlFor="review"> Your review *</label>
              <textarea
                name=""
                id=""
                cols="20"
                rows="5"
                className="border border-black focus:outline-none"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name *</label>
              <input type="text" name="" id="name" className="w-full bg-gray-100 px-2 py-1 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email *</label>
              <input type="email" name="" id="email" className="w-full bg-gray-100 px-2 py-1 focus:outline-none" />
            </div>
            <div>
              <input type="checkbox" name="" id="save" />
              <label htmlFor="save"> Save my name, email.</label>
            </div>
            <button type="submit" className="flex items-center justify-center font-semibold w-1/5 p-2 bg-green-500 text-white rounded">Submit</button>
          </form>}
      </div>
    </div>
    <div className="flex flex-col gap-4 items-center mt-5">
      <h1 className="font-bold text-2xl"> You may also like... </h1>
      <div className="w-full">
              <Products product={recommended} isDescription={true} />
      </div>
    </div>
  </div>
)
}

export default ProductName


export async function getStaticProps(context) {
  const productname = context.params.productname
  const data = await import("../../api/dataApi.json")

  const product = data.products.find(item => item.name.toLowerCase().replaceAll(" ", "").replaceAll("/", "-") === productname)

  if (!product) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      data: product
    }
  }
}

export async function getStaticPaths() {

  const dataApi = await import("../../api/dataApi.json")

  const paths = dataApi.products.map(item => ({
    params: { productname: item.name.toLowerCase().replaceAll(" ", "").replaceAll("/", "-") }
  }))

  return {
    paths,
    fallback: true
  }

}