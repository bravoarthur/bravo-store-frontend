import {  ItemArea } from "./styled";
import {Link} from 'react-router-dom'

export type PropsType = {
    
    id: string,
    image: string,
    price: number,
    priceNegotiable: boolean,
    title: string

}


function AdItem(props: PropsType) {

    const {id, image, price, priceNegotiable, title} = props

    return (  

        <ItemArea className="aditem">

            <Link to={`/ad/${id}`}>
                <div className="itemImage">
                    <img src={image} alt=''></img>
                </div>
                <div className="itemName" >
                    {title}
                </div>
                <div className="itemPrice">
                    {priceNegotiable ? 'Negotiable' : `AU $${price}`}
                </div>
            </Link>
            
        </ItemArea>
    );
}

export default AdItem;