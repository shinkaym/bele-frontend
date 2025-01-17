import productApi from "@/apis/modules/product.api";
import { IApiResponse, IProduct } from "@/models/interfaces";
import { useEffect, useState } from "react";
import ProductGrid from "../ProductGrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SlideShow from "../SlideShow";
import ProductGridSkeleton from "../ProductGridSkeleton";

interface ListRalatedProductProps{
    categoryId: number
}

const ListRalatedProduct :React.FC<ListRalatedProductProps> = ({categoryId})=>{
    const [limit, setLimit] = useState<number>(5)
  const [products, setProducts] = useState<IProduct[]>([])
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res: IApiResponse<{ products: IProduct[] }> = await productApi.list({ CategoryId:categoryId },{})
        if (res.data && res.status === 200) {
          setProducts(res.data.products)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchApi()
  }, [categoryId])

   const productArrowProperty = {
      prevArrow: (
        <button className='flex items-center justify-center rounded-full lg:w-10 lg:h-10 md:w-9 md:h-9 sm:w-8 sm:h-8 w-7 h-7 bg-black lg:-ml-10  md:-ml-8 sm:-ml-6 -ml-2 '>
          <FontAwesomeIcon icon={faArrowLeft} className='text-white lg:text-xl md:text-lg sm:text-base text-sm' />
        </button>
      ),
      nextArrow: (
        <button className='flex items-center justify-center rounded-full lg:w-10 lg:h-10 md:w-9 md:h-9 sm:w-8 sm:h-8 w-7 h-7 bg-black lg:-mr-10 md:-mr-8 sm:-mr-6 -mr-2 '>
          <FontAwesomeIcon icon={faArrowRight} className='text-white lg:text-xl md:text-lg sm:text-base text-sm' />
        </button>
      )
    }
    return (
        <>
           <div className='lg:px-14 md:px-12 sm:px-10 px-6 mb-10'>
        {products.length > 0 ? (
          products.length > limit + 2 ? (
            <SlideShow
              slidesToScroll={1}
              slidesToShow={products.length < limit ? products.length : limit}
              properties={productArrowProperty}
              duration={1000000}
            >
              {products.map((p) => (
                <ProductGrid className='mx-2' key={p.id} product={p} tag={0} />
              ))}
            </SlideShow>
          ) : (
            <div className={`grid grid-cols-${limit} gap-2`}>
              {products.map((p) => (
                <ProductGrid key={p.id} product={p} tag={0} />
              ))}
            </div>
          )
        ) : (
          <div className={`grid grid-cols-${limit} gap-2`}>
            {Array.from({ length: limit }).map((_, i) => (
              <ProductGridSkeleton key={i} />
            ))}
          </div>
        )}
      </div>
        </>
    );
}
export default ListRalatedProduct;