import Link from "next/link"
import Products from "../../../components/Products"



const ProductsCategory = ({ data}) => {


  return data && data.length > 0 ? (
    <div className='mt-28'>
      <div className='flex gap-3 px-5 mb-5 text-3xl font-bold text-sky-950 items-center lg:px-32'>
        <h1>{ data[0].category }</h1>
        <p className='w-20 h-1 bg-green-700'></p>
      </div>
      <Products product={data} isDescription={true} />
    </div>
  ) : (
    <div className="flex flex-col gap-6 items-center justify-center mt-28">
      No products availables in this category for the moment
      <Link href="/" className="px-4 py-2 bg-black text-white"> Back to Home </Link>
    </div>
  )
}

export default ProductsCategory

export async function getStaticProps(context) {
  const category = context.params.products
  const data = await import("../../api/dataApi.json")

  const products = data.products.filter(item => item.category.toLowerCase().replaceAll(" ", "") === category)

  if (!products) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      data: products,
      category
    }
  }
}

export async function getStaticPaths() {

  const dataApi = await import("../../api/dataApi.json")

  const paths = dataApi.products.map(item => ({
    params: { products: item.category.toLowerCase().replaceAll(" ", "") }
  }))

  return {
    paths,
    fallback: true
  }

}