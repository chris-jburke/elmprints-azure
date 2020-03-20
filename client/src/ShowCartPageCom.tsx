import React from 'react'
import PaymentPageCom from './PaymentPageCom'
import {ProductInformation} from './dec'
import {Decoded} from './App'

type ShowCartPageProps = {
    currentProduct: ProductInformation,
    user: Decoded | null
}
const ShowCartPageCom: React.FC<ShowCartPageProps> = (props) => {
        return(
            <div>
                ShowCartPageCom
                <PaymentPageCom currentProduct={props.currentProduct} user={props.user} />
            </div>
        )
    }
export default ShowCartPageCom