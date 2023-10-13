import Navbar from "../Navbar"
import Cart from "../Cart"
import FlottingCart from "../flottingCart"
import { useState, useEffect, createContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import Footer from "../Footer"
import Loading from "../Loading"
import { useFirebase } from "@/Firebase/useFirebase"
import { runTransaction } from "firebase/firestore"

export const dataApiContext = createContext()

const BigContainer = ({ children }) => {

  const [dataApi, setDataApi] = useState([])
  const [openCart, setOpenCart] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [dataUserConnected, setDataUserConnected] = useState({})
  let timeOut

  const { userConnect, db, user, uid } = useFirebase()

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  useEffect(() => {
    setIsLoading(true)
    fetchData()

    timeOut = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeOut)
    }

  }, [])

  useEffect(() => {
    if (userConnect) {
      if (dataUserConnected.cart.length > 0) {
        dispatch({
          type: "INITIALIZEDATABASE",
          payload: [...dataUserConnected.cart]
        })
      }
    }
  }, [dataUserConnected])

  useEffect(() => {
    if (userConnect) {
      if (dataUserConnected.cart.length !== cart) {
        try {
          runTransaction(db, async (transaction) => {
            const currentData = await transaction.get(user(uid))

            if (!currentData.exists()) {
              throw "Data not found"
            }

            transaction.update(user(uid), {
              ...currentData.data(),
              cart
            })
          })
        } catch (e) {
          console.error("Update Database failed!")
        }
      }

    } 
  }, [cart])


  const fetchData = () => {
    fetch("/api/localApi")
      .then(response => response.json())
      .then(res => setDataApi(res.products))
  }

  return (
    <main className="relative overflow-hidden" id="top">

      {dataApi.length > 0 && <dataApiContext.Provider value={{ dataApi, isLoading, setIsLoading, dataUserConnected, setDataUserConnected }}>

        {isLoading && <Loading />}

        <Navbar setOpenCart={setOpenCart} />
        {
          children
        }
        {openCart && <div className={`fixed top-0 ${openCart ? 'right-0' : 'right-[-100%]'} w-3/5 md:w-2/5 xl:w-1/5 transition-all z-20`}>
          <Cart setOpenCart={setOpenCart} />
        </div>}
        <FlottingCart setOpenCart={setOpenCart} />
        <Footer />
      </dataApiContext.Provider>}
    </main>
  )
}

export default BigContainer