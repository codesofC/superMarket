import Navbar from "../Navbar"
import Cart from "../Cart"
import { useState, useEffect, createContext } from "react"

export const dataApiContext = createContext()

const BigContainer = ({ children }) => {

  const [dataApi, setDataApi] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    fetch("/api/localApi")
      .then(response => response.json())
      .then(res => setDataApi(res.products))
  }
  
  return (
    <main className="relative">
      <dataApiContext.Provider value={dataApi}>
        <Navbar />
        {
          children
        }
        <div className="fixed top-0 right-0 w-1/2">
          <Cart />
        </div>
      </dataApiContext.Provider>
    </main>
  )
}

export default BigContainer