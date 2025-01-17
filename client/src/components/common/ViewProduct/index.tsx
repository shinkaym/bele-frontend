import productApi from "@/apis/modules/product.api";
import { IApiResponse, IModifyProduct } from "@/models/interfaces";
import { socket } from "@/sockets/connect";
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react";
import { useParams } from "react-router-dom";

interface ViewProductProps {
    view:number,
    handleView:any,
    productId:number
}
type RouteParams = {
    slug: string;
  };
const ViewProduct:React.FC<ViewProductProps> = ({productId,view,handleView})=>{
    useEffect(() => {
            // Kết nối và lắng nghe sự kiện 'messageServer'
            socket.on("AddViewReturn", (data) => {
                if(slug === data.slug)
                    handleView(data.view);
            });
          
            // Hủy lắng nghe sự kiện khi component bị unmount
            return () => {
              socket.off("AddViewReturn");
            };
          }, []);
    const { slug } = useParams<RouteParams>();
    useEffect(() => {
         try{
            const fetchApi = async () => {
                const data:IModifyProduct = {
                    modifyField:"View",
                    modifyValue:"1",
                    modifyAction:"Reduce"
                } 
                const res: IApiResponse<{}> = await productApi.modifyProduct({id:productId},{...data});
                if(res.status===200){
                    handleView(++view);
                    socket.emit("AddView",{view:view,slug:slug});
                }
            }
            fetchApi()
         }catch(error){

         }           
      }, [slug]);


    return (<>
        <span><FontAwesomeIcon icon={faEye} /> {view}</span>
    </>)
}
export default ViewProduct;