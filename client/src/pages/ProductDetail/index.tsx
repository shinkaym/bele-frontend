import AvgStar from '@/components/common/AvgStar'
import { useParams } from 'react-router-dom';
import Counter from '@/components/common/Counter'
import { faCartPlus, faEye, faHouse} from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState,useEffect } from 'react'
import Description from '@/components/common/Description'
import RatingCard from '@/components/common/RatingCard'
import AddReview from '@/components/common/AddReview'
import ReviewList from '@/components/common/ReviewList'
import RatingDropdown from '@/components/common/RatingDropdown'
import { IApiResponse, IProductDetail, IRateDetail, IVariantDetail } from '@/models/interfaces'
import productApi from '@/apis/modules/product.api'
import Loader from '@/components/common/Loader';
interface IColorSize{
    image:string,
    color:string,
    size:string
}
type RouteParams = {
    slug: string;
  };
interface IRateCard{
    totalRating:number,
    ratings:number
}
const ProductDetail: React.FC = () =>{

const { slug } = useParams<RouteParams>();
const [loading, setLoading] = useState<boolean>(false)
const [colors,setColors] = useState<any>();
const [sizes,setSizes] = useState<any>();
const [imgState,setImgState] = useState<IColorSize>({
    image: colors?.[0]?.thumbnail , // Giá trị mặc định là chuỗi rỗng
    color: colors?.[0]?.Color, // Giá trị mặc định là chuỗi rỗng
    size: sizes?.[0]?.Size // Giá trị mặc định là chuỗi rỗng
});
const [counterValue, setCounterValue] = useState(1);
const [activeIndexColor, setActiveIndexColor] = useState(0); // Theo dõi nút đang active
const [activeIndexSize, setActiveIndexSize] = useState(0); // Theo dõi nút đang active
const [rates,setRates] = useState<IRateDetail[]>();
const [product,setProduct] = useState<IProductDetail>();
const [ratingCard,setRatingCard] = useState<IRateCard>();

    useEffect(() => {
        const fetchApi = async () => {
          setLoading(true);
          try {
            const res: IApiResponse<{ product: IProductDetail }> = await productApi.detail({ Slug: slug! });
            if (res.data && res.status === 200) {
              const productData = res.data.product;
              setProduct(productData);
              setRates(res.data.product.rates);
              const avgRate:number =  res.data.product.rates?.reduce((pre,cur)=>pre+=cur.star,0);
              const toTalRangting: number =  res.data.product.rates?.length ;

              setRatingCard({
                totalRating : res.data.product.rates?.length || 0,
                ratings : avgRate/toTalRangting||0,
              })
              // Xử lý colors và sizes từ productData

              const colorsData = productData.variants
                .map((item) => {
                  item.attributes[0].thumbnail = item.thumbnail;
                  return item.attributes[0];
                })
                .filter(
                  (item: any, index: any, self: any) =>
                    index === self.findIndex((t: any) => t.Color === item.Color && t.Value === item.Value)
                );
      
              const sizesData = productData.variants
                .map((item) => item.attributes[1])
                .filter(
                  (item: any, index: any, self: any) =>
                    index === self.findIndex((t: any) => t.Size === item.Size && t.Value === item.Value)
                );
      
              setColors(colorsData);
              setSizes(sizesData);
            }
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        };
        fetchApi();
      }, [slug]);
      
      // Cập nhật imgState sau khi colors và sizes thay đổi
      useEffect(() => {
        if (colors && sizes) {
          setImgState({
            image: colors?.[0]?.thumbnail || "", // Giá trị mặc định
            color: colors?.[0]?.Color || "", // Giá trị mặc định
            size: sizes?.[0]?.Size || "" // Giá trị mặc định
          });
        }
      }, [colors, sizes]);
    const handleAddReview = (reviews:IRateDetail[])=>{
      setRates(reviews)
    }
    const handleAddToCart = (variantId:number,quantity:number)=>{
        console.log(variantId,quantity);

    }
    const variant = product?.variants.find(item=>item.attributes[0].Color== imgState.color && item.attributes[1].Size == imgState.size);

    const handleCounterChange = (value: number) => {
        setCounterValue(value); // Cập nhật giá trị khi Counter thay đổi
      };
      const handleRatingSelect = (rating: number) => {
        setRates(product?.rates.filter(item => item.star === rating));
      };

return (<>
    {
    loading ? (
        <Loader />
      ) : (
        product &&
        <>
    <div className="py-4"></div>
    <div className="lg:px-40 mt-4">
        <div className="grid grid-cols-2 gap-8">
            <div className="flex justify-center items-center">
                <img src={imgState.image} alt="Product" className="w-full h-auto object-cover" />
            </div>
        <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="flex items-center space-x-4 text-gray-500">
            <span><FontAwesomeIcon icon={faHouse} /> {product.like}</span>
            <span><FontAwesomeIcon icon={faEye} /> {product.view}</span>
            <span><FontAwesomeIcon icon={faHeart} /> 20</span>
        </div>
        <AvgStar rate={ratingCard?.ratings!} />
        <div>Color: <b>{imgState.color}</b></div>
        <div className='flex items-center space-x-3'>
            {
                colors.map((item:any,index:number) =><>
                    <span key={item.Name+item.Value} 
                    onClick={()=>{
                        setImgState({
                            image: item.thumbnail,
                            color:item.Color,
                            size: imgState.size
                        })
                        setActiveIndexColor(index);
                    }}
                    
                    style={{backgroundColor:item.Value,
                        padding:"12px 20px",
                        border:activeIndexColor === index? "2px solid blue":"",
                    }}
                    className='rounded-xl cursor-pointer'>

                    </span>
                </>)
            }
        </div>
        <div>Size: <b>{imgState.size}</b></div>
        <div className='flex items-center space-x-3'>
        {
                sizes.map((item:any,index:any) =><>
                    <span key={item.Name+item.Value} 
                    onClick={()=>{
                        setImgState({
                        image: imgState.image,
                        color:imgState.color,
                        size: item.Size
                    })
                    setActiveIndexSize(index)
                }}
                    style={{
                        padding:"10px 24px",
                        borderColor:activeIndexSize === index?"blue":"black",
                    }}
                    className={activeIndexSize === index?'bg-blue-800 border text-white rounded-xl cursor-pointer':'bg-gray-300 border rounded-xl cursor-pointer'}
                    
                    >{item.Value}</span>
                </>)
            }
        </div>
        <div className="flex items-center space-x-2">
            {
               product?.discount ??0>0?
               <span className="text-gray-400 line-through">{variant?.price}</span>:""
            }
            <span className="text-xl font-bold text-black">{(1-(product?.discount??0 )/100)* (variant?.price??0)}$</span>
            <span className="text-blue-500 bg-blue-100 px-2 py-1 rounded">-{product?.discount}%</span>
        </div>

        <div className="flex items-center space-x-4">
            <Counter  onValueChange={handleCounterChange} />
            <button onClick={()=>handleAddToCart(variant?.id??0,counterValue)} className="flex-1 bg-black text-white py-2 px-4 rounded-full font-medium">
                <FontAwesomeIcon icon={faCartPlus} className='mx-2'/>
                Add To Cart
            </button>
            <button className="w-10 h-10 border border-black bg-black rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faHeart} className='text-white' />
            </button>
        </div>
        </div>
        </div>
        <div className='py-10'>
            <h1 className='mb-4 text-4xl font-bold leading-none tracking-tight text-black md:text-5xl lg:text-2xl dark:text-white'>Description</h1>
            <Description htmlContent={product?.description??"Không có"}/>
        </div>
     
    </div>
    <div className='py-10 lg:px-14'>
        <div className='flex'>
            <div>
                <RatingCard totalRatings={ratingCard?.totalRating!} rating={ratingCard?.ratings!}/>
            </div>
            <div className='ml-8 flex-1'>
                <RatingDropdown onSelect={handleRatingSelect} />
                <AddReview handleAddReview={handleAddReview} reviews={rates!} productId={product.id}/>
                <ReviewList reviews={rates!} />
            </div>
        </div>
    </div>
        </>
      )}
   
    </>)
}

export default ProductDetail