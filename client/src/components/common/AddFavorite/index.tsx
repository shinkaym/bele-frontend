import productApi from "@/apis/modules/product.api";
import { EToastOption } from "@/models/enum";
import { IApiResponse } from "@/models/interfaces";
import { RootState } from "@/redux/store";
import { UToast } from "@/utils/swal";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

interface AddFavoriteProps{
    productId:number,
    wistList:Array<number>,
    handleAddWistList:any
}

const AddFavorite :React.FC<AddFavoriteProps> = ({productId,wistList,handleAddWistList})=>{
    const customer= useSelector((state: RootState) => state.auth.customer);
    const handleClick = async ()=>{
        if(!customer)
            UToast(EToastOption.ERROR,"Chưa đăng nhập.")
    
        const action:string = wistList.includes(customer!.id)?"Remove":"Add";
        console.log(productId,action);
        try{
        const res: IApiResponse<{}> = await productApi.updateWishList({ id: productId,actionWishList:action });
        if(res.status === 200){
            
            action==="Add"?handleAddWistList([customer?.id,...wistList]):handleAddWistList(wistList.filter(item=>item!==customer?.id));
            UToast(EToastOption.SUCCESS,"Thành công")
        }

        }catch(error){
            console.log(error);
            UToast(EToastOption.ERROR,"Thất bại")

        }

    }
    return (
        <>
            <button 
            onClick={handleClick}
            className={`w-10 h-10 border rounded-full flex items-center justify-center 
                ${customer!==null&&wistList.includes(customer!.id)?"border-pink-300 bg-pink-300":"border-black bg-black"}`
                }>
                <FontAwesomeIcon icon={faHeart} className='text-white' />
            </button>
        </>
    );
}

export default AddFavorite;