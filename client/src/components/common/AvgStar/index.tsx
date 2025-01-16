
import { faStar} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface AvgStarProps {
    rate: number; 
}
  
const AvgStar: React.FC<AvgStarProps> = ({ rate }) => {
    const array = [...Array(5)];

    return (
        <>
            <div className='flex items-center'>
                {
                    array.map((_,index) => <>
                        <span><FontAwesomeIcon icon={index<rate?faStar:faStarRegular} fontSize={20}/></span>
                    </>)
                }
                <span className='mx-1 text-2xl'>({rate.toFixed(1)})</span>
            </div>
        </>
    )
}
export default AvgStar;