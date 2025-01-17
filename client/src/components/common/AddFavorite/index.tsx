import productApi from "@/apis/modules/product.api";
import { EToastOption } from "@/models/enum";
import { IApiResponse } from "@/models/interfaces";
import { RootState } from "@/redux/store";
import { socket } from "@/sockets/connect";
import { UToast } from "@/utils/swal";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useSelector } from "react-redux";

interface AddFavoriteProps{
    productId:number,
    wistList:Array<number>,
    handleAddWistList:any
}

const AddFavorite :React.FC<AddFavoriteProps> = ({productId,wistList,handleAddWistList})=>{
    useEffect(() => {
        // Kết nối và lắng nghe sự kiện 'messageServer'
        socket.on("AddFavoriteReturn", (data) => {
            if(data.productId === productId)
                handleAddWistList(data.wistList);
        });
      
        // Hủy lắng nghe sự kiện khi component bị unmount
        return () => {
          socket.off("AddFavoriteReturn");
        };
      }, []);

    const customer= useSelector((state: RootState) => state.auth.customer);
    const handleClick = async ()=>{
        if(!customer)
            UToast(EToastOption.ERROR,"Chưa đăng nhập.")
        const action:string = wistList.includes(customer!.id)?"Remove":"Add";
        try{
            console.log(productId,action)
        const res: IApiResponse<{}> = await productApi.updateWishList({ id: productId,actionWishList:action });
        if(res.status === 200){
            
            if(action==="Add"){
                const result = [customer!.id,...wistList];
                handleAddWistList(result)
                socket.emit("AddFavorite",{wistList:result,productId:productId});

            }else{
                const result = wistList.filter(item=>item!==customer?.id);
                handleAddWistList(result);
                socket.emit("AddFavorite",{wistList:result,productId:productId});

            
            }
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