import Navbar from "../Navbar"
import Cart from "../Cart"
import { useState, useEffect, createContext } from "react"

export const dataApiContext = createContext()

const BigContainer = ({ children }) => {

  const [dataApi, setDataApi] = useState([])
  const [openCart, setOpenCart] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    fetch("/api/localApi")
      .then(response => response.json())
      .then(res => setDataApi(res.products))
  }
  
  return (
    <main className="relative overflow-hidden">
      {dataApi.length > 0 && <dataApiContext.Provider value={dataApi}>
        <Navbar setOpenCart={setOpenCart} />
        {
          children
        }
        { openCart && <div className={`fixed top-0 ${openCart ? 'right-0' : 'right-[-100%]'} w-3/5 md:w-2/5 xl:w-1/5 transition-all z-10`}>
          <Cart setOpenCart={setOpenCart} />
        </div>}
      </dataApiContext.Provider>}
    </main>
  )
}

export default BigContainer