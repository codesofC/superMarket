import { useDataContext } from '@/components/BigContainer/useDataContext'
import { useFirebase } from '@/Firebase/useFirebase'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'


const ResultPayment = () => {

    const router = useRouter()

    const { setIsLoading } = useDataContext()
    const { userConnect } = useFirebase()
    let timeOut

    useEffect(() => {
        setIsLoading(true)
        timeOut = setTimeout(() => {
            setIsLoading(false)
        }, 1500)

        return () => clearTimeout(timeOut)
    }, [])

    if(!userConnect){
        router.push("/login")
        return
    }

  return (
    <div className='my-5 flex flex-col items-center justify-center gap-4'>
        <p className='text-2xl font-semibold text-green-600 flex items-center justify-center px-6 py-3'> 
            Payment Approved
        </p>
        <Link href={"/"} className="px-4 py-2 bg-black text-white text-center">
            Back to home
        </Link>
    </div>
  )
}

export default ResultPayment