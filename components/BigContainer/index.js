import Navbar from "../Navbar"
import Cart from "../Cart"
import FlottingCart from "../flottingCart"
import { useState, useEffect, createContext } from "react"
import Footer from "../Footer"
import Loading from "../Loading"

export const dataApiContext = createContext()

const BigContainer = ({ children }) => {

  const [dataApi, setDataApi] = useState([])
  const [openCart, setOpenCart] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    fetch("/api/localApi")
      .then(response => response.json())
      .then(res => setDataApi(res.products))
  }
  
  return (
    <main className="relative overflow-hidden" id="top">
      
      {dataApi.length > 0 && <dataApiContext.Provider value={{dataApi, isLoading, setIsLoading}}>

        { isLoading && <Loading />}

        <Navbar setOpenCart={setOpenCart} />
        {
          children
        }
        { openCart && <div className={`fixed top-0 ${openCart ? 'right-0' : 'right-[-100%]'} w-3/5 md:w-2/5 xl:w-1/5 transition-all z-20`}>
          <Cart setOpenCart={setOpenCart} />
        </div>}
        <FlottingCart setOpenCart={setOpenCart} />
        <Footer />
      </dataApiContext.Provider>}
    </main>
  )
}

export default BigContainer